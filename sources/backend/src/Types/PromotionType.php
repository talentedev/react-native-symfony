<?php

namespace App\Types;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\OfflinePromoPricing;
use App\Model\OnlinePromoPricing;
use App\Services\BusinessService;
use App\Model\Customer;
use App\Model\Promotion;
use App\Model\Refer;
use App\Model\User;
use doctrine\Security\UserService\UserServiceInterface;
use Safe\Exceptions\StringsException;
use App\Enums\RoleEnum;
use doctrine\GraphQLite\Annotations\ExtendType;
use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\doctrine\ResultIterator;

/**
 * @ExtendType(class=Promotion::class)
 */
class PromotionType
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
     * @var BusinessService
     */
    private $businessService;

    /**
     * PromotionType constructor.
     * @param UserServiceInterface $userService
     * @param DaoFactory $daoFactory
     * @param BusinessService $businessService
     */
    public function __construct(UserServiceInterface $userService, DaoFactory $daoFactory, BusinessService $businessService)
    {
        $this->userService = $userService;
        $this->daoFactory = $daoFactory;
        $this->businessService = $businessService;
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return bool
     */
    public function getIsRedeemed(Promotion $promotion): bool
    {
        /** @var User $loggedUser */
        $loggedUser = $this->userService->getLoggedUser();
        /**
         * @var Refer $refer
         */
        foreach ($promotion->getRefers() as $refer) {
            if ($refer->getRedeemed()->getUserName() === $loggedUser->getUserName()) {
                return true;
            }
        }
        return false;
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return bool
     */
    public function getIsReferrer(Promotion $promotion): bool
    {
        /** @var User $loggedUser */
        $loggedUser = $this->userService->getLoggedUser();
        /**
         * @var Refer $refer
         */
        foreach ($promotion->getRefers() as $refer) {
            if ($refer->getRedeemed()->getUserName() === $loggedUser->getUserName() && $refer->getIsShared() === true) {
                return true;
            }
        }
        return false;
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return string|null
     * @throws StringsException
     */
    public function getPeriod(Promotion $promotion): ?string
    {
        $startDate = $promotion->getStartDate() ?: null;
        $endDate = $promotion->getEndDate() ?: null;
        $interval = $startDate && $endDate ? $startDate->diff($endDate) : null;
        return $interval ? \Safe\substr($interval->format('%R%a days'), 1, strlen($interval->format('%R%a days'))) : '';
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return int
     */
    public function getRedemptionCount(Promotion $promotion): int
    {
        return $promotion->getRefers()->count();
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return int
     */
    public function getReferralCount(Promotion $promotion): int
    {
        $refers = $promotion->getRefers();
        $nameList = [];

        foreach ($refers as $refer) {
            if ($refer->getReferrer() !== null && !$refer->getReferrer()->isambassador()) {
                $nameList[$refer->getReferrer()->getUserName()] = true;
            }
        }
        return count($nameList);
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return int
     */
    public function getMyRedemptionCount(Promotion $promotion): int
    {
        $refers = $promotion->getRefers();
        $nameList = [];
        $loggedCustomer = $this->userService->getLoggedUser();
        foreach ($refers as $refer) {
            if ($refer->getReferrer() === $loggedCustomer) {
                $nameList[$refer->getRedeemed()->getUserName()] = true;
            }
        }
        return count($nameList);
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return string
     */
    public function getEarnedOrPaid(Promotion $promotion): string
    {
        /** @var Customer|Business $loggedUser */
        $loggedUser = $this->userService->getLoggedUser();
        $userRoleId = $loggedUser->getRoles()[0]->getId();
        $earnings = 0;
        if ($userRoleId === RoleEnum::CUSTOMER['id']) {
            /** @var Customer $loggedCustomer */
            $loggedCustomer = $loggedUser;
            $transactions = $loggedCustomer->getTransactions();
            foreach ($transactions as $transaction) {
                $refer=$transaction->getRefer();
                if ($refer!==null && $refer->getReferrer() === $loggedUser && $refer->getPromotion() === $promotion) {
                    $earnings += (float)$transaction->getAmount();
                }
            }
        } elseif ($userRoleId === RoleEnum::BUSINESS['id']) {
            /** @var Business $loggedBusiness */
            $loggedBusiness = $loggedUser;
            $bills = $loggedBusiness->getBills();
            foreach ($bills as $bill) {
                if ($bill->getRefer() !== null && $bill->getRefer()->getPromotion()===$promotion) {
                    $earnings += (float)$bill->getAmount();
                }
            }
        }
        return number_format($earnings, 2, '.', '');
    }

    /**
     * Offline promotion : only one referrerShare
     * Online promotion : the highest referrerShare amongst the promotion's category
     *
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return string
     * @throws \Exception
     */
    public function getReferrerShare(Promotion $promotion): string
    {
        $business = $promotion->getBusiness();
        if ($promotion->getIsOnlinePromo()) {
            $onlinePricing = $this->daoFactory->getOnlinePromoPricingDao()->findByCategoryAndRegion($business->getSubCategory()->getCategory(), $business->getRegion());
            $max = '0';
            foreach ($onlinePricing as $onlineP) {
                $referrerShare = $onlineP->getReferrerShare();
                if ($referrerShare !== null && (float)$referrerShare > (float)$max) {
                    $max = $referrerShare;
                }
            }
            return $max;
        }
        /** @var OfflinePromoPricing $offlinePromoPricing */
        $offlinePromoPricing = $this->daoFactory->getOfflinePromoPricingDao()->findBySubCategoryAndRegion($business->getSubCategory(), $business->getRegion())->first();
        return $offlinePromoPricing->getReferrerShare();
    }

    /**
     * Offline promotion : null
     * Online promotion : the highest onlinePromoPricing.redeemerShare * onlinePromoPricing.customerMaxSpending amongst the promotion's category
     *
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return string
     * @throws \Exception
     */
    public function getMaxRedeemerShare(Promotion $promotion): string
    {
        $business = $promotion->getBusiness();
        if ($promotion->getIsOnlinePromo()) {
            $onlinePricing = $this->daoFactory->getOnlinePromoPricingDao()->findByCategoryAndRegion($business->getSubCategory()->getCategory(), $business->getRegion());
            $max = 0;
            foreach ($onlinePricing as $onlineP) {
                $redeemerShare = $onlineP->getRedeemerShare();
                $customerMaxSpending = $onlineP->getCustomerMaxSpending(); // should be always set
                if ($redeemerShare !== null && $customerMaxSpending !== null) {
                    $tmp = (float)$redeemerShare * (float)$customerMaxSpending / 100.0;
                    if ($tmp > $max) {
                        $max = $tmp;
                    }
                }
            }
            return number_format($max, 2, '.', '');
        }
        return '0';
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return bool
     * @throws \Exception
     */
    public function isIsActive(Promotion $promotion): bool
    {
        return $promotion->isActive();
    }

    /**
     * @Field()
     * @Logged()
     * @param Promotion $promotion
     * @return OnlinePromoPricing[]|ResultIterator|null
     */
    public function getOnlinePromoPricing(Promotion $promotion)
    {
        return $this->businessService->getOnlinePromoPricing($promotion->getBusiness());
    }
}
