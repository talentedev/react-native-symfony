<?php

namespace App\Types;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\BusinessPayment;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\ExtendType;
use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Right;

/**
 * @ExtendType(class=BusinessPayment::class)
 */
class BusinessPaymentType
{
    /**
     * @var UserServiceInterface
     */
    private $userService;
    /**
     * @var DaoFactory
     */
    private $daoFactory;

    /**
     * PromotionType constructor.
     * @param UserServiceInterface $userService
     * @param DaoFactory $daoFactory
     */
    public function __construct(UserServiceInterface $userService, DaoFactory $daoFactory)
    {
        $this->userService = $userService;
        $this->daoFactory = $daoFactory;
    }

    /**
     * Return the passcode of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param BusinessPayment $businessPayment
     * @return string|null
     */
    public function getStripeCardLast4(BusinessPayment $businessPayment): ?string
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($businessPayment->getBusiness() !== $loggedBusiness) {
            return null;
        }
        return $businessPayment->getStripeCardLast4();
    }
}
