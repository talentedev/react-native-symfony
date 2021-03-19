<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\StatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Model\Bill;
use App\Model\Business;
use App\Model\Customer;
use App\Model\CustomerPayment;
use App\Model\Refer;
use App\Model\Transaction;
use doctrine\Security\UserService\UserServiceInterface;
use Safe\Exceptions\ArrayException;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\AlterableResultIterator;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

use function Safe\preg_match;
use function Safe\usort;

class TransactionController
{
    /**
     * @var DaoFactory
     */
    private $daoFactory;
    /**
     * @var UserServiceInterface
     */
    private $userService;

    /**
     * TestController constructor.
     * @param DaoFactory $daoFactory
     * @param UserServiceInterface $userService
     */
    public function __construct(DaoFactory $daoFactory, UserServiceInterface $userService)
    {
        $this->daoFactory = $daoFactory;
        $this->userService = $userService;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @return Transaction[]|ResultIterator
     */
    public function getTransactions(): ResultIterator
    {
        return $this->daoFactory->getTransactionDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $id
     * @return Transaction
     * @throws doctrineException
     */
    public function getTransaction(string $id): Transaction
    {
        return $this->daoFactory->getTransactionDao()->getById($id);
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param bool $ascTimestamp
     * @return Transaction[]
     * @throws ArrayException
     */
    public function getLoggedCustomerAllTransactions(bool $ascTimestamp = false): array
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        $allTransactions = $loggedCustomer->getTransactions()->toArray();
//        $transactionsByUserId = $loggedCustomer->getTransactions();
//        $notRewardTransaction = [];
//        foreach ($transactionsByUserId as $transaction) {
//            if ($transaction->getType() !== TransactionTypeEnum::REWARD) {
//                $notRewardTransaction[] = $transaction;
//            }
//        }
//        $transactionsByReferrer = $loggedCustomer->getTransactions()->toArray();
//        $allTransactions = array_merge($notRewardTransaction, $transactionsByReferrer);

        // Ordering
        if ($ascTimestamp) {
            usort($allTransactions, static function (Transaction $a, Transaction $b) {
                return $a->getUpdatedDate()->getTimestamp() - $b->getUpdatedDate()->getTimestamp();
            });
        } else {
            usort($allTransactions, static function (Transaction $a, Transaction $b) {
                return $b->getUpdatedDate()->getTimestamp() - $a->getUpdatedDate()->getTimestamp();
            });
        }
        return $allTransactions;
    }

    /**
     * Bill array is enough for Business Transaction History for the moment
     *
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param bool $ascTimestamp
     * @return Bill[]
     * @throws ArrayException
     */
    public function getLoggedBusinessAllBills(bool $ascTimestamp = false): array
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $promotions = $loggedBusiness->getPromotions();
        $refers = [[]];
        foreach ($promotions as $promotion) {
            $refers[] = $promotion->getRefers()->toArray();
        }
        $refers = array_merge(...$refers);

        $bills = [[]];
        /** @var Refer $refer */
        foreach ($refers as $refer) {
            $bills[] = $refer->getBills()->toArray();
        }
        $bills = array_merge(...$bills);

        if ($ascTimestamp) {
            usort($bills, static function (Bill $a, Bill $b) {
                return $a->getCreatedDate()->getTimestamp() - $b->getCreatedDate()->getTimestamp();
            });
        } else {
            usort($bills, static function (Bill $a, Bill $b) {
                return $b->getCreatedDate()->getTimestamp() - $a->getCreatedDate()->getTimestamp();
            });
        }
        return $bills;
    }



    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return Transaction[]|AlterableResultIterator
     */
    public function getLoggedCustomerReferredTransactions(): AlterableResultIterator
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        return $loggedCustomer->getTransactions();
    }

    // Unused
//    /**
//     * @Query()
//     * @Logged()
//     * @Right("IS_BUSINESS")
//     * @return Transaction[]|AlterableResultIterator
//     */
//    public function getLoggedBusinessTransactions(): AlterableResultIterator
//    {
//        /** @var Business $loggedBusiness */
//        $loggedBusiness = $this->userService->getLoggedUser();
//        return $loggedBusiness->getTransactions();
//    }

    /**
     * Return null if the wallet is null, not enough balance or incorrect email/amount
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $amount
     * @param string $paypalEmail
     * @return Transaction|null
     * @throws \Exception
     */
    public function withdraw(string $amount, string $paypalEmail): ?Transaction
    {
        if ((float) $amount <= 0 || filter_var($paypalEmail, FILTER_VALIDATE_EMAIL) === false || !preg_match('/^\d+(?:\.\d{1,2})?$/', $amount)) {
            // Incorrect email or amount
            return null;
        }

        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();

        $wallet = $loggedCustomer->getWallets()->first();
        if (!$wallet || ((float)$wallet->getBalance() < (float)$amount)) {
            return null;
        }

        // Updating the Paypal mail if needed
        $customerPayment = $loggedCustomer->getCustomerPayments()->first();
        if (!$customerPayment) {
            $customerPayment = new CustomerPayment($loggedCustomer);
        }
        if (!$customerPayment->getPaymentEmail() || $customerPayment->getPaymentEmail() !== $paypalEmail) {
            $customerPayment->setPaymentEmail($paypalEmail);
            $this->daoFactory->getCustomerPaymentDao()->save($customerPayment);
        }

        $transaction = new Transaction($loggedCustomer);
        $transaction->setType(TransactionTypeEnum::WITHDRAW);
        $transaction->setAmount($amount);
        $transactionId = $transaction->getUuid();

        $paypalApiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                PAYPAL_CLIENT_ID,     // ClientID
                PAYPAL_CLIENT_SECRET      // ClientSecret
            )
        );

        $paypalCurrency = new \PayPal\Api\Currency();
        $paypalCurrency->setCurrency('HKD');
        $paypalCurrency->setValue($amount);

        $paypalPayoutItem = new \PayPal\Api\PayoutItem();
        $paypalPayoutItem->setReceiver($paypalEmail);
        $paypalPayoutItem->setAmount($paypalCurrency);

        $paypalSenderBatchHeader = new \PayPal\Api\PayoutSenderBatchHeader();
        $paypalSenderBatchHeader->setSenderBatchId($transactionId);
        $paypalSenderBatchHeader->setRecipientType('EMAIL');

        $paypalPayout = new \PayPal\Api\Payout();
        $paypalPayout->setSenderBatchHeader($paypalSenderBatchHeader);
        $paypalPayout->setItems([$paypalPayoutItem]); // Only one item

        try {
            $paypalPayoutBatch = $paypalPayout->create([], $paypalApiContext);
            $transaction->setStatus(StatusEnum::APPROVED);
            $transaction->setPaypalPayoutBatchId($paypalPayoutBatch->getBatchHeader()->getPayoutBatchId());
            $this->daoFactory->getWalletDao()->atomicChanceBalanceAndSave($wallet, $amount, false);
        } catch (\PayPal\Exception\PayPalConnectionException $ex) {
            // This will print the detailed information on the exception.
            //REALLY HELPFUL FOR DEBUGGING
            $transaction->setStatus(StatusEnum::REFUSED);
            $transaction->setFailedReason(\Safe\json_decode($ex->getData(), true)['message']);
        }

        $this->daoFactory->getTransactionDao()->save($transaction);
        return $transaction;
    }
}
