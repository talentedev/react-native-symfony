<?php

namespace App\Services;

use App\Dao\Generated\DaoFactory;
use App\Enums\ErrorEnum;
use App\Exception\AppException;
use App\Model\Business;
use App\Model\Customer;
use App\Model\OnlinePromoPricing;
use App\Model\Promotion;
use App\Model\Refer;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\doctrine\ResultIterator;

// use Aws\Sns\SnsClient;
// use function Safe\sprintf;

class ReferService
{

    /** @var DaoFactory */
    private $daoFactory;
    /** @var UserServiceInterface */
    private $userService;

    /**
     * SmsSignInService constructor.
     * @param DaoFactory $daoFactory
     * @param UserServiceInterface $userService
     */
    public function __construct(DaoFactory $daoFactory, UserServiceInterface $userService)
    {
        $this->daoFactory = $daoFactory;
        $this->userService = $userService;
    }

    /**
     * Raise an error if any redemption condition isn't satisfied
     * Return whether if the redeemer is a returning Customer
     *
     * @param Promotion $promotion
     * @param Customer $redeemer
     * @param Customer $referrer
     * @return bool
     * @throws AppException
     */
    public function checkRedemptionConditions(Promotion $promotion, Customer $redeemer, Customer $referrer): bool
    {
        $isReturningCustomer = false;

        $resultArray1 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, $redeemer, $promotion)->toArray();
        $resultArray2 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(false, $redeemer, $promotion)->toArray();
        $resultArray = array_merge($resultArray1, $resultArray2);

        if (count($resultArray) !== 0) {
            if (!$promotion->getIsReturningAllowed()) {
                // The logged Customer should not have already redeemed the Promotion
                throw new AppException(ErrorEnum::ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED);
            }
            /** @var Refer $refer */
            foreach ($resultArray as $refer) {
                if ($refer->getReferrer() === $referrer && !$referrer->isambassador()) {
                    // Only ambassador is allowed as multi-time referrer
                    throw new AppException(ErrorEnum::ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER);
                }
            }
            $isReturningCustomer = true;
        }

        if (!$referrer->isambassador()) {
            // There should be only one Refer entry given the parameters
            $referArray = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, $referrer, $promotion);
            if ($referArray->count() > 1) {
                throw new AppException(ErrorEnum::ERROR_SERVER_MULTIPLE_REFER_FOUND);
            }
            // If no Refer entry found, the only valid referrer should be ambassador
            if ($referArray->count() === 0) {
                throw new AppException(ErrorEnum::ERROR_PROMOTION_INVALID_REFERRER);
            }
            // Circle referring is not allowed
            if ($referArray[0]->getReferrer() === $redeemer) {
                throw new AppException(ErrorEnum::ERROR_PROMOTION_CIRCLE_REDEEM);
            }
        }

        return $isReturningCustomer;
    }
}
