<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\ErrorEnum;
use App\Exception\AppException;
use App\Model\Business;
use App\Model\BusinessPayment;
use App\Model\StripeInvoice;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;

class BusinessPaymentController
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
        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return BusinessPayment|null
     */
    public function getLoggedBusinessPayment(): ?BusinessPayment
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        return $loggedBusiness->getBusinessPayments()->first(); // Only one BusinessPayments by Business
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $stripeTokenId
     * @return BusinessPayment|null
     * @throws AppException
     */
    public function updateLoggedBusinessPayment(string $stripeTokenId): ?BusinessPayment
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $loggedBusinessPayment = $loggedBusiness->getBusinessPayments()->first(); // Only one BusinessPayment per Business
        if ($loggedBusinessPayment === null) {
            $loggedBusinessPayment = new BusinessPayment($loggedBusiness);
        }

        $stripeCustomerId = $loggedBusinessPayment->getStripeCustomerId();
        try {
            if ($stripeCustomerId === null) {
                $stripeCustomer = \Stripe\Customer::create([
                    'email' => $loggedBusiness->getEmail(),
                    'description' => $loggedBusiness->getBusinessName(),
                    'source' => $stripeTokenId
                ]);
                $stripeCustomerId = $stripeCustomer['id'];
                $loggedBusinessPayment->setStripeCustomerId($stripeCustomerId);

                // Setting up the metered billing with threshold
                $stripeSubscription = \Stripe\Subscription::create([
                    'customer' => $stripeCustomerId,
                    'items' => [
                        [
                            'plan' => STRIPE_METERED_PLAN_ID,
                        ],
                    ],
                    'billing_thresholds' =>  [
                        'amount_gte' => 10000, // 100 HKD threshold
                        'reset_billing_cycle_anchor' => true,
                    ]
                ]);
                $stripeSubscriptionItemId = $stripeSubscription['items']['data'][0]['id'];
                $loggedBusinessPayment->setStripeSubscriptionItemId($stripeSubscriptionItemId);
            } else {
                $stripeCustomer = \Stripe\Customer::update($stripeCustomerId, [
                    'email' => $loggedBusiness->getEmail(),
                    'description' => $loggedBusiness->getBusinessName(),
                    'source' => $stripeTokenId,
                ]);
            }
        } catch (\Stripe\Error\InvalidRequest $exception) {
            throw new AppException(ErrorEnum::ERROR_INVALID_REQUEST, 400, $exception);
        }

        $last4 = count($stripeCustomer['sources']['data']) > 0 ? $stripeCustomer['sources']['data'][0]['last4'] : null;
        if (!$last4) {
            throw new AppException(ErrorEnum::ERROR_CANNOT_FETCH_CARD_DATA);
        }

        $loggedBusinessPayment->setStripeCardLast4($last4);

        $this->daoFactory->getBusinessPaymentDao()->save($loggedBusinessPayment);
        return $loggedBusinessPayment;
    }


    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return StripeInvoice[]
     * @throws AppException
     * @throws \Exception
     */
    public function getLoggedBusinessStripeInvoices(): array
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $loggedBusinessPayment = $loggedBusiness->getBusinessPayments()->first(); // Only one BusinessPayment per Business
        if ($loggedBusinessPayment === null) {
            return [];
        }

        $stripeCustomerId = $loggedBusinessPayment->getStripeCustomerId();
        if ($stripeCustomerId === null) {
            return [];
        }

        try {
            $invoices = \Stripe\Invoice::all([
                'limit' => 100, // 100 is the max limit.. TODO: add starting_after as pagination
                'customer' => $stripeCustomerId,
                ]);
            $stripeInvoices = [];
            foreach ($invoices as $invoice) {
                if ($invoice['amount_paid'] === 0) {
                    continue;
                }
                $stripeInvoices[] = new StripeInvoice(
                    $invoice['number'], // id
                    $invoice['amount_paid'], // amountInCents
                    $invoice['invoice_pdf'], // pdfLink
                    (new \DateTimeImmutable)->setTimestamp($invoice['created']) // timestamp
                );
            }
        } catch (\Stripe\Error\Api $exception) {
            throw new AppException(ErrorEnum::ERROR_API_EXCEPTION, 400, $exception);
        }
        return $stripeInvoices;
    }
}
