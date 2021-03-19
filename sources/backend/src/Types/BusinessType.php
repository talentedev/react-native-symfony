<?php

namespace App\Types;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\OfflinePromoPricing;
use App\Model\OnlinePromoPricing;
use App\Model\Promotion;
use App\Services\BusinessService;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\ExtendType;
use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;

/**
 * @ExtendType(class=Business::class)
 */
class BusinessType
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
     * Return the passcode of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param Business $business
     * @return string|null
     */
    public function getPasscode(Business $business): ?string
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($business !== $loggedBusiness) {
            return null;
        }
        return $business->getPasscode();
    }

    /**
     * Return the passcode of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @param Business $business
     * @param string $text
     * @param int|null $categoryId
     * @return Promotion[]|null
     * @throws \Exception
     */
    public function getSearchPromotions(Business $business, string $text, ?int $categoryId): ?array
    {
        if ($categoryId !== null && $business->getCategory() !== null && $business->getCategory()->getId() !== $categoryId) {
            return null;
        }
        $promotions = $business->getActivePromotions(); // already sorted
        $businessName = $business->getBusinessName();
        if ($businessName !== null && stripos($businessName, $text) === false) {
            // business name doesn't contain $text
            $matchingPromotions = [];
            foreach ($promotions as $promotion) {
                $caption = $promotion->getCaption();
                if ($caption !== null && stripos($caption, $text) === false) {
                    continue;
                }
                $matchingPromotions[] = $promotion;
            }
            return count($matchingPromotions) === 0 ? null : $matchingPromotions;
        }

        return $promotions;
    }

    /**
     * Return the offline promo pricing of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param Business $business
     * @return OfflinePromoPricing|null
     */
    public function getOfflinePromoPricing(Business $business): ?OfflinePromoPricing
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($business !== $loggedBusiness) {
            return null;
        }
        return $this->daoFactory->getOfflinePromoPricingDao()->findBySubCategoryAndRegion($loggedBusiness->getSubCategory(), $loggedBusiness->getRegion())->first();
    }

    /**
     * Return the offline promo pricing of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param Business $business
     * @return bool|null
     */
    public function canCreateOfflinePromotion(Business $business): ?bool
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($business !== $loggedBusiness) {
            return null;
        }
        // Should be exactly 1 tho
        return $this->daoFactory->getOfflinePromoPricingDao()->findBySubCategoryAndRegion($loggedBusiness->getSubCategory(), $loggedBusiness->getRegion())->count() >= 1;
    }

    /**
     * Return the offline promo pricing of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param Business $business
     * @return bool|null
     */
    public function canCreateOnlinePromotion(Business $business): ?bool
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($business !== $loggedBusiness) {
            return null;
        }
        // Should be exactly 1 tho
        return $this->daoFactory->getOnlinePromoPricingDao()->findByCategoryAndRegion($loggedBusiness->getSubCategory()->getCategory(), $loggedBusiness->getRegion())->count() >= 1;
    }

    /**
     * Return the online promo pricing array of the logged Business, null otherwise
     *
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param Business $business
     * @return OnlinePromoPricing[]|ResultIterator|null
     */
    public function getOnlinePromoPricing(Business $business)
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        if ($business !== $loggedBusiness) {
            return null;
        }
        return $this->businessService->getOnlinePromoPricing($business);
    }

    /**
     * @Field()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return bool
     */
    public function isIsAutoApproveBecomeReferrer(): bool
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        return $loggedBusiness->getIsAutoApproveBecomeReferrer();
    }
}
