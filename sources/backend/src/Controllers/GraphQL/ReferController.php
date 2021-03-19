<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\ErrorEnum;
use App\Enums\StatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Exception\AppException;
use App\Model\Bill;
use App\Model\Business;
use App\Model\BusinessPayment;
use App\Model\Customer;
use App\Model\PendingApplyHistoryRedemption;
use App\Model\PendingOnlineRedemption;
use App\Model\Promotion;
use App\Model\Refer;
use App\Model\Transaction;
use App\Model\Wallet;
use App\Services\BusinessService;
use App\Services\ReferService;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;
use function Safe\sleep;
use function Safe\usort;

class ReferController
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
     * @var BusinessService
     */
    private $businessService;
    /**
     * @var ReferService
     */
    private $referService;

    /**
     * TestController constructor.
     * @param DaoFactory $daoFactory
     * @param UserServiceInterface $userService
     * @param BusinessService $businessService
     * @param ReferService $referService
     */
    public function __construct(DaoFactory $daoFactory, UserServiceInterface $userService, BusinessService $businessService, ReferService $referService)
    {
        $this->daoFactory = $daoFactory;
        $this->userService = $userService;
        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
        $this->businessService = $businessService;
        $this->referService = $referService;
    }

    /**
     * @Query()
     * @Logged()
     * @return Refer[]|ResultIterator
     */
    public function getRefers(): ResultIterator
    {
        return $this->daoFactory->getReferDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @param string $id
     * @return Refer
     * @throws doctrineException
     */
    public function getRefer(string $id): Refer
    {
        return $this->daoFactory->getReferDao()->getById($id);
    }

    /**
     * Check if the logged Customer can redeem the promotion given its ID, the referrer ID and the passcode
     * Also check if there is no multiple redeem when returning is not allowed,  & no circle referring, + business has a payment method
     * Then we update the Transaction, Bill & Wallet tables
     * For returning customer, only 50% of the charge fee for the business
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $promotionId
     * @param string|null $referrerUsername
     * @param string $passcode
     * @return Refer
     * @throws AppException
     * @throws doctrineException
     * @throws \Exception
     */
    public function redeemOfflinePromotion(string $promotionId, ?string $referrerUsername, string $passcode): Refer
    {
        /* #################### Checks #################### */

        // An doctrineException is thrown if one of these variables is null
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        try {
            $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
            if (!$promotion->isActive()) {
                throw new AppException(ErrorEnum::ERROR_PROMOTION_NOT_VALID_AND_ACTIVE);
            }
        } catch (doctrineException $e) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_NOT_VALID_AND_ACTIVE, 400, $e);
        }

        $business = $promotion->getBusiness();
        if ($business->getPasscode() !== $passcode) {
            sleep(random_int(3, 4)); // To avoid user who spams to guess the passcode
            throw new AppException(ErrorEnum::ERROR_WRONG_PASSCODE);
        }

        $subCategory = $business->getSubCategory();
        $offlinePromoPricing = $this->daoFactory->getOfflinePromoPricingDao()->findBySubCategoryAndRegion($subCategory, $business->getRegion())->first();

        if (!$referrerUsername) {
            $referrer = $this->daoFactory->getCustomerDao()->getambassadorCustomer();
        } else {
            /** @var Customer|null $referrer */
            $referrer = $this->daoFactory->getUserDao()->findOneByUserName($referrerUsername);
        }
        if ($referrer === null) {
            throw new AppException(ErrorEnum::ERROR_REFERRER_NOT_EXISTING);
        }

        if ($business->getBusinessPayments()->first() === null) {
            throw new AppException(ErrorEnum::ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD);
        }

        $isReturningCustomer = $this->referService->checkRedemptionConditions($promotion, $loggedCustomer, $referrer);

        /* #################### Transactions #################### */

        $refer = new Refer($loggedCustomer, $promotion);
        $refer->setReferrer($referrer);

        /** 1. Referrer fee **/
        $referrerTransaction = new Transaction($referrer);
        $referrerTransaction->setBusiness($business);
        $referrerTransaction->setType(TransactionTypeEnum::REWARD);
        $referrerTransaction->setStatus(StatusEnum::APPROVED);
        $referrerTransaction->setRefer($refer);
        // $referrerTransaction->setPaypalTransactionId(....); // No need, only for withdraw type transactions
        $referrerShare = $isReturningCustomer ? number_format((float)$offlinePromoPricing->getReferrerShare() / 2.0, 2, '.', '') : $offlinePromoPricing->getReferrerShare();
        $referrerTransaction->setAmount($referrerShare);


        /** 2. ambassador (Platform) fee **/
        $ambassadorCustomer = $this->daoFactory->getCustomerDao()->getambassadorCustomer();
        $ambassadorShare = $isReturningCustomer ? number_format((float)$offlinePromoPricing->getambassadorShare() / 2.0, 2, '.', '') : $offlinePromoPricing->getambassadorShare();
        $ambassadorTransaction = new Transaction($ambassadorCustomer);
        $ambassadorTransaction->setBusiness($business);
        $ambassadorTransaction->setType(TransactionTypeEnum::REWARD);
        $ambassadorTransaction->setStatus(StatusEnum::APPROVED);
        $ambassadorTransaction->setAmount($ambassadorShare);
        $ambassadorTransaction->setRefer($refer);

        /* #################### Bill #################### */

        /** @var BusinessPayment $businessPayment */
        $businessPayment = $business->getBusinessPayments()->first();
        $bill = new Bill($business, $businessPayment);
        $bill->setRefer($refer);
        $amount = $isReturningCustomer ? number_format((float)$offlinePromoPricing->getCharge() / 2.0, 2, '.', '') : $offlinePromoPricing->getCharge();
        $bill->setAmount($amount); // charge

        $amountInCents = (int)((float)$amount * 100);
        \Stripe\SubscriptionItem::createUsageRecord(
            $businessPayment->getStripeSubscriptionItemId(),
            [
                'quantity' => $amountInCents,
                'timestamp' => time(),
            ]
        );

        /* #################### Save everything + Wallet handling #################### */

        /** Update and save wallets "atomically" **/
        /** 1. Referrer wallet **/
        $referrerWallet = $referrer->getWallets()->first(); // TODO: handle multiple regions in next evolution
        if ($referrerWallet === null) {
            $referrerWallet = new Wallet($referrer->getCurrentRegion(), $referrer);
        }
        $this->daoFactory->getWalletDao()->atomicChanceBalanceAndSave($referrerWallet, $referrerShare, true);

        /** 2. ambassador (Platform) wallet **/
        $ambassadorWallet = $ambassadorCustomer->getWallets()->first();
        if ($ambassadorWallet === null) {
            $ambassadorWallet = new Wallet($ambassadorCustomer->getCurrentRegion(), $ambassadorCustomer);
        }

        $this->daoFactory->getWalletDao()->atomicChanceBalanceAndSave($ambassadorWallet, $ambassadorShare, true);
        $this->daoFactory->getReferDao()->save($refer);
        $this->daoFactory->getTransactionDao()->save($referrerTransaction);
        $this->daoFactory->getTransactionDao()->save($ambassadorTransaction);
        $this->daoFactory->getBillDao()->save($bill);

        return $refer;
    }

    /**
     * Returns false if the user hasn't redeemed the Promotion yet
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $promotionId
     * @return bool
     * @throws doctrineException
     * @throws \Safe\Exceptions\ArrayException
     */
    public function referPromotion(string $promotionId): bool
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);

        $resultArray1 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, $loggedCustomer, $promotion);
        if ($resultArray1->count() !== 0) {
            return false; // Already referred
        }

        $resultArray2 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(false, $loggedCustomer, $promotion);
        if ($resultArray2->count() !== 1 && !$promotion->getIsReturningAllowed()) {
            return false; // Not redeemed yet or more than 1 Refer found
        }

        $resultArray2 = $resultArray2->toArray();
        // Desc sorting by time
        usort($resultArray2, static function (Refer $a, Refer $b) {
            return $b->getCreatedDate()->getTimestamp() - $a->getCreatedDate()->getTimestamp();
        });

        $refer = $resultArray2[0]; // get the newest one
        $refer->setIsShared(true);
        $this->daoFactory->getReferDao()->save($refer);
        return true;
    }

    /**
     * @Query()
     * @Logged()
     * @param string $businessId
     * @return int
     */
    public function getBusinessRedemptionCount(string $businessId): int
    {
        return $this->getRedemptionCountByBusinessId($businessId);
    }

    /**
     * @param string $id
     * @return int
     */
    private function getRedemptionCountByBusinessId(string $id): int
    {
        try {
            $business = $this->daoFactory->getBusinessDao()->getById($id);
        } catch (doctrineException $e) {
            return 0;
        }
        $promotions = $business->getPromotions();
        $count = 0;
        foreach ($promotions as $promotion) {
            $count += $promotion->getRefers()->count();
        }
        return $count;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return int
     */
    public function getLoggedBusinessRedemptionCount(): int
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        return $this->getRedemptionCountByBusinessId($loggedBusiness->getId());
    }

    /**
     * @Query()
     * @Logged()
     * @param string $customerId
     * @return int
     */
    public function getCustomerReferralsCount(string $customerId): int
    {
        return $this->getReferralsCountByCustomerId($customerId);
    }

    /** PRIVATE FUNCTIONS */

    /**
     * @Logged()
     * @param string $customerId
     * @return int
     */
    private function getReferralsCountByCustomerId(string $customerId): int
    {
        try {
            $customer = $this->daoFactory->getCustomerDao()->getById($customerId);
        } catch (doctrineException $e) {
            return 0;
        }
        // return $customer->getTransactionsByReferrer()->count();
        return $customer->getRefersByReferrer()->count();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return int
     */
    public function getLoggedCustomerReferralsCount(): int
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        return $this->getReferralsCountByCustomerId($loggedCustomer->getId());
    }


    /* ####### Pending Online Redemptions ####### */

    /**
     * TODO
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $promotionId
     * @param string|null $referrerUsername
     * @param string $onlineRedemptionInvoiceNumber
     * @param string $onlineRedemptionTransactionValue
     * @return PendingOnlineRedemption
     * @throws AppException
     * @throws \Exception
     */
    public function redeemOnlinePromotion(string $promotionId, ?string $referrerUsername, string $onlineRedemptionInvoiceNumber, string $onlineRedemptionTransactionValue): PendingOnlineRedemption
    {
        /* #################### Checks #################### */

        // An doctrineException is thrown if one of these variables is null
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        try {
            $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
            if (!$promotion->isActive()) {
                throw new AppException(ErrorEnum::ERROR_PROMOTION_NOT_VALID_AND_ACTIVE);
            }
        } catch (doctrineException $e) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_NOT_VALID_AND_ACTIVE, 400, $e);
        }

        if (!$referrerUsername) {
            $referrer = $this->daoFactory->getCustomerDao()->getambassadorCustomer();
        } else {
            /** @var Customer|null $referrer */
            $referrer = $this->daoFactory->getUserDao()->findOneByUserName($referrerUsername);
        }
        if ($referrer === null) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_INVALID_REFERRER);
        }

        $onlineRedemptionTransactionValueFloat = (float) $onlineRedemptionTransactionValue;

        if ($onlineRedemptionTransactionValueFloat <= 0.0) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_TRANSACTION_VALUE_NOT_POSITIVE);
        }

        $this->referService->checkRedemptionConditions($promotion, $loggedCustomer, $referrer);

        $business = $promotion->getBusiness();
        $onlinePricings = $this->businessService->getOnlinePromoPricing($business);
        $onlinePricing = null;
        if (count($onlinePricings) === 0) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_NO_ONLINE_PRICING);
        }
        if (count($onlinePricings) === 1) {
            $onlinePricing = $onlinePricings[0];
        } else {
            // Choosing the right pricing, we assume the db is correct
            foreach ($onlinePricings as $oP) {
                $minSpending = $oP->getCustomerMinSpending();
                $maxSpending = $oP->getCustomerMaxSpending();
                if ($minSpending === null) {
                    if ($onlineRedemptionTransactionValueFloat <= (float) $maxSpending) {
                        $onlinePricing = $oP;
                        break;
                    }
                    continue;
                }
                if ($maxSpending === null) {
                    // Now we always have a maxSpending, I don't remove this code just in case
                    if ((float) $minSpending <= $onlineRedemptionTransactionValueFloat) {
                        $onlinePricing = $oP;
                        break;
                    }
                    continue;
                }
                if ((float) $minSpending <= $onlineRedemptionTransactionValueFloat && $onlineRedemptionTransactionValueFloat <= (float) $maxSpending) {
                    $onlinePricing = $oP;
                    break;
                }
            }
        }
        if ($onlinePricing === null) {
            throw new AppException(ErrorEnum::ERROR_PROMOTION_NO_ONLINE_PRICING_MATCH);
        }

        $pendingOnlineRedemption = new PendingOnlineRedemption($onlinePricing, $loggedCustomer, $referrer, $promotion);
        $pendingOnlineRedemption->setOnlineRedemptionInvoiceNumber($onlineRedemptionInvoiceNumber);
        $pendingOnlineRedemption->setOnlineRedemptionTransactionValue($onlineRedemptionTransactionValue);

        $this->daoFactory->getPendingOnlineRedemptionDao()->save($pendingOnlineRedemption);
        return $pendingOnlineRedemption;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return PendingOnlineRedemption[]
     */
    public function getLoggedCustomerPendingOnlineRedemptions(): array
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        return $loggedCustomer->getPendingOnlineRedemptionByRedeemed()->toArray();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return Promotion[]
     */
    public function getLoggedBusinessPendingRedeemedOnlinePromotions(): array
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $promotions = $loggedBusiness->getPromotions();
        $res = [];
        foreach ($promotions as $promotion) {
            if ($promotion->getPendingOnlineRedemption()->count() > 0) {
                $res[] = $promotion;
            }
        }
        return $res;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $uuid
     * @param bool $approval
     * @return bool|null
     */
    public function approveOrRefusePendingOnlineRedemption(string $uuid, bool $approval): ?bool
    {
        try {
            $pendingOnlineRedemption = $this->daoFactory->getPendingOnlineRedemptionDao()->getById($uuid);
        } catch (doctrineException $e) {
            return null;
        }
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($pendingOnlineRedemption->getPromotion()->getBusiness() !== $loggedBusiness) {
            return null;
        }
        $pendingOnlineRedemption->setIsApproved($approval);
        $this->daoFactory->getPendingOnlineRedemptionDao()->save($pendingOnlineRedemption);

        // TODO: copy this redemption into refers table & deal with linked transactions, bills...
        return $approval;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param int $delayInHour
     * @return PendingOnlineRedemption[]
     * @throws \Exception
     */
    public function getAllPendingOnlineRedemptions(int $delayInHour = 72): array
    {
        $pendingOnlineRedemptions = $this->daoFactory->getPendingOnlineRedemptionDao()->findAll();
        $res = [];
        $now = (new \DateTimeImmutable())->getTimestamp();
        $delayTimestamp = $now - ($delayInHour * 60 * 60);
        $delayDate = new \DateTimeImmutable('@' . $delayTimestamp);

        foreach ($pendingOnlineRedemptions as $pendingOnlineRedemption) {
            if ($pendingOnlineRedemption->getCreatedDate() <= $delayDate) {
                $res[] = $pendingOnlineRedemption;
            }
        }
        return $res;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string[] $uuids
     * @return bool|null
     */
    public function approvePendingOnlineRedemptions(array $uuids): ?bool
    {
        $pendingOnlineRedemptions = [];
        foreach ($uuids as $uuid) {
            try {
                $pendingOnlineRedemptions[] = $this->daoFactory->getPendingOnlineRedemptionDao()->getById($uuid);
            } catch (doctrineException $e) {
                return null;
            }
        }
        foreach ($pendingOnlineRedemptions as $pendingOnlineRedemption) {
            /** @var PendingOnlineRedemption $pendingOnlineRedemption */
            $pendingOnlineRedemption->setIsApproved(true);
            $this->daoFactory->getPendingOnlineRedemptionDao()->save($pendingOnlineRedemption);
        }
        return true;
    }


    /* ####### Pending Online Apply History Redemptions ####### */

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $promotionId
     * @param string $proofImageUrl
     * @param string|null $description
     * @return bool
     * @throws \Exception
     */
    public function submitPendingApplyHistoryRedemption(string $promotionId, string $proofImageUrl, ?string $description): bool
    {
        // Check if promotion is "active"
        try {
            $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
            if (!$promotion->isActive()) {
                return false;
            }
        } catch (doctrineException $e) {
            return false;
        }

        // Check if proofImageUrl is valid
        if ($proofImageUrl !== null && filter_var($proofImageUrl, FILTER_VALIDATE_URL) === false) {
            return false;
        }

        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->daoFactory->getCustomerDao()->getById($this->userService->getUserId());
        $pendingApplyHistoryRedemption = new PendingApplyHistoryRedemption($loggedCustomer, $promotion);
        $pendingApplyHistoryRedemption->setCustomerProofImageUrl($proofImageUrl);
        $pendingApplyHistoryRedemption->setCustomerDescription($description);
        $this->daoFactory->getPendingApplyHistoryRedemptionDao()->save($pendingApplyHistoryRedemption);
        return true;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param bool $autoApprove
     * @return bool
     * @throws doctrineException
     */
    public function updateAutoApproveBecomeReferrer(bool $autoApprove): bool
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->daoFactory->getBusinessDao()->getById($this->userService->getUserId());
        $loggedBusiness->setIsAutoApproveBecomeReferrer($autoApprove);
        $this->daoFactory->getBusinessDao()->save($loggedBusiness);

        if ($autoApprove) {
            $res = [];
            foreach ($loggedBusiness->getPromotions() as $promotion) {
                foreach ($promotion->getPendingApplyHistoryRedemption() as $pendingApplyHistoryRedemption) {
                    /** @var PendingApplyHistoryRedemption $pendingApplyHistoryRedemption */
                    if ($pendingApplyHistoryRedemption->getIsApproved() === null) {
                        // Auto approve all pending requests
                        $pendingApplyHistoryRedemption->setIsApproved(true);
                        $this->daoFactory->getPendingApplyHistoryRedemptionDao()->save($pendingApplyHistoryRedemption);
                        $this->addToReferTable($pendingApplyHistoryRedemption, true);
                    }
                }
            }
        }
        return $autoApprove;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return PendingApplyHistoryRedemption[]
     */
    public function getLoggedBusinessPendingApplyHistoryRedemptions(): array
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $isAutoApprove = $loggedBusiness->getIsAutoApproveBecomeReferrer();
        $res = [];
        foreach ($loggedBusiness->getPromotions() as $promotion) {
            foreach ($promotion->getPendingApplyHistoryRedemption() as $pendingApplyHistoryRedemption) {
                /** @var PendingApplyHistoryRedemption $pendingApplyHistoryRedemption */
                if ($pendingApplyHistoryRedemption->getIsApproved() === null) {
                    if ($isAutoApprove === false) {
                        $res[] = $pendingApplyHistoryRedemption;
                    } else {
                        // Auto approve all pending requests
                        $pendingApplyHistoryRedemption->setIsApproved(true);
                        $this->daoFactory->getPendingApplyHistoryRedemptionDao()->save($pendingApplyHistoryRedemption);
                        $this->addToReferTable($pendingApplyHistoryRedemption, true);
                    }
                }
            }
        }
        return $res;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $uuid
     * @param bool $approval
     * @return bool|null
     */
    public function approveOrRefuseApplyHistoryRedemption(string $uuid, bool $approval): ?bool
    {
        try {
            $pendingApplyHistoryRedemption = $this->daoFactory->getPendingApplyHistoryRedemptionDao()->getById($uuid);
        } catch (doctrineException $e) {
            return null;
        }
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($pendingApplyHistoryRedemption->getPromotion()->getBusiness() !== $loggedBusiness) {
            return null;
        }
        $pendingApplyHistoryRedemption->setIsApproved($approval);
        $this->daoFactory->getPendingApplyHistoryRedemptionDao()->save($pendingApplyHistoryRedemption);

        return $this->addToReferTable($pendingApplyHistoryRedemption, $approval);
    }

    private function addToReferTable(PendingApplyHistoryRedemption $pendingApplyHistoryRedemption, bool $approval): ?bool
    {
        $refer = $this->daoFactory->getReferDao()->findByRedeemedAndPromotion($pendingApplyHistoryRedemption->getRedeemed()->getId(), $pendingApplyHistoryRedemption->getPromotion()->getUuid());
        if ($refer->count() === 0) {
            $refer = new Refer($pendingApplyHistoryRedemption->getRedeemed(), $pendingApplyHistoryRedemption->getPromotion());
            $refer->setReferrer(null);
            $refer->setIsShared(false);
            $this->daoFactory->getReferDao()->save($refer);
        } else {
            // Already referred, no need to claim history redemption for sharing
            return null;
        }
        return $approval;
    }
}
