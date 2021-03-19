<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\ErrorEnum;
use App\Enums\StatusEnum;
use App\Exception\AppException;
use App\Model\Business;
use App\Model\BusinessLocation;
use App\Model\Customer;
use App\Model\OfflinePromoPricing;
use App\Model\Promotion;
use App\Model\Refer;
use DateTimeImmutable;
use Exception;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\AbstractdoctrineObject;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class PromotionController
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
     * Get all approved, active and target not reached Promotion records, ordered by updated_date DESC
     *
     * @Query()
     * @Logged()
     * @return Promotion[]|ResultIterator
     */
    public function getPromotions(): ResultIterator
    {
        return $this->daoFactory->getPromotionDao()->findAllApprovedAndActivePromotions();
        // return $this->daoFactory->getPromotionDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $order
     * @return Promotion[]|ResultIterator
     */
    public function getAllPromotions(string $order = 'created_date DESC'): ResultIterator
    {
        // return $this->daoFactory->getPromotionDao()->findAllApprovedAndActivePromotions();
        /** @var Promotion[]|ResultIterator $result */
        $result = $this->daoFactory->getPromotionDao()->findAll()->withOrder($order);
        return $result;
    }

    /**
     * @Query()
     * @Logged()
     * @param string $id
     * @return Promotion
     * @throws doctrineException
     */
    public function getPromotion(string $id): Promotion
    {
        return $this->daoFactory->getPromotionDao()->getById($id);
    }

//    /**
//     * @Query()
//     * @Logged()
//     * @param string $promotionId
//     * @param string|null $userName
//     * @return Refer[]|ResultIterator
//     */
//    public function getReferrerListByPromotionId(string $promotionId, ?string $userName = null): ?ResultIterator
//    {
//        $customer = null;
//        if (!empty($userName)) {
//            /** @var Customer|null $customer */
//            $customer = $this->daoFactory->getUserDao()->findOneByUserName($userName);
//        }
//        try {
//            $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
//        } catch (doctrineException $ex) {
//            return null;
//        }
//        $refers = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, $customer, $promotion);
//        return $refers->count() === 0 ? null : $refers;
//    }

    /**
     * Get list of valid referrer according to the logged Customer and the given Promotion
     *
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $promotionId
     * @return Customer[]|null
     * @throws AppException
     * @throws Exception
     */
    public function getValidReferrerList(string $promotionId): ?array
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        try {
            $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
            if (!$promotion->isActive()) {
                throw new AppException(ErrorEnum::ERROR_PROMOTION_NOT_VALID_AND_ACTIVE);
            }
        } catch (doctrineException $ex) {
            return null;
        }

        $allRefers = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, null, $promotion)->toArray();
        if (count($allRefers) === 0) {
            return [];
        }

        $resultArray1 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(true, $loggedCustomer, $promotion)->toArray();
        $resultArray2 = $this->daoFactory->getReferDao()->findByIsSharedAndRedeemedAndPromotion(false, $loggedCustomer, $promotion)->toArray();
        $resultArray = array_merge($resultArray1, $resultArray2);

        if (count($resultArray) !== 0 && !$promotion->getIsReturningAllowed()) {
            // Already redeemed, returning not allowed
            throw new AppException(ErrorEnum::ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED);
        }

        $invalidReferrers = [$loggedCustomer]; // Cannot self-refer
        /** @var Refer $refer */
        foreach ($resultArray as $refer) {
            $invalidReferrers[] = $refer->getReferrer(); // Cannot double refer
        }

        $validReferrers = [];
        /** @var Refer $refer */
        foreach ($allRefers as $refer) {
            if ($refer->getReferrer() !== $loggedCustomer && !in_array($refer->getRedeemed(), $invalidReferrers, true)) {
                // Cannot circle refer
                $validReferrers[] = $refer->getRedeemed();
            }
        }

        return $validReferrers;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $uuid
     * @param string $status
     * @param string|null $rejectReason
     * @param bool $freeOfCharge
     * @return string
     * @throws doctrineException
     */
    public function updatePromotionStatus(string $uuid, string $status, ?string $rejectReason, bool $freeOfCharge = false): string
    {
        $promotion = $this->daoFactory->getPromotionDao()->getById($uuid);
        if ($status === StatusEnum::APPROVED) {
            $promotion->setStatus(StatusEnum::APPROVED);
        } else {
            $promotion->setStatus(StatusEnum::REFUSED);
            $promotion->setRejectedReason($rejectReason);
        }
        $promotion->setIsFreeOfCharge($freeOfCharge);
        $this->daoFactory->getPromotionDao()->save($promotion);

        return $promotion->getStatus();
    }

    /**
     * If no category selected, returns all approved Promotions
     *
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return Promotion[]
     * @throws Exception
     */
    public function getPromotionsByCustomerCategories(): array
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        $categories = $loggedCustomer->getCategories();
        if (empty($categories)) {
            /** @var Promotion[] $approvedPromotion */
            $approvedPromotion = $this->daoFactory->getPromotionDao()->findAllApprovedAndActivePromotions()->toArray();
            return $approvedPromotion;
        }
        $promotions = [[]];
        foreach ($categories as $category) {
            foreach ($category->getSubCategories() as $subCategory) {
                foreach ($subCategory->getBusiness() as $business) {
                    $promotions[] = $business->getActivePromotions();
                }
            }
        }
        $promotions = array_merge(...$promotions);
        return Promotion::sortByCreatedDate($promotions);
    }


    /**
     * Return all Promotions if given empty category id array
     *
     * @Query()
     * @Logged()
     * @param int[]|null $categoryIds
     * @return Promotion[]|AbstractdoctrineObject[]
     * @throws doctrineException
     * @throws \Safe\Exceptions\ArrayException
     */
    public function getPromotionsByCategories(?array $categoryIds): array
    {
        if (!$categoryIds || empty($categoryIds)) {
            return $this->daoFactory->getPromotionDao()->findAll()->toArray();
        }

        $categories = [];
        foreach ($categoryIds as $categoryId) {
            $categories[] = $this->daoFactory->getCategoryDao()->getById($categoryId);
        }
        $promotions = [[]];
        foreach ($categories as $category) {
            foreach ($category->getSubCategories() as $subCategory) {
                foreach ($subCategory->getBusiness() as $business) {
                    $promotions[] = $business->getActivePromotions();
                }
            }
        }
        $promotions = array_merge(...$promotions);
        return Promotion::sortByCreatedDate($promotions);
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return Promotion[]
     * @throws \Safe\Exceptions\ArrayException
     */
    public function getLoggedBusinessPromotions(): array
    {
        /** @var Business $currentBusiness */
        $currentBusiness = $this->userService->getLoggedUser();
        $promotions = $currentBusiness->getPromotions()->toArray();
        return Promotion::sortByCreatedDate($promotions);
    }

    /**
     * @Query()
     * @Logged()
     * @param string $businessId
     * @return Promotion[]
     * @throws doctrineException
     * @throws Exception
     */
    public function getBusinessPromotions(string $businessId): array
    {
        /** @var Business $currentBusiness */
        $currentBusiness = $this->daoFactory->getBusinessDao()->getById($businessId);
        return $currentBusiness->getActivePromotions();
    }

    /**
     * Delete the Promotion and return true only if the logged user is a Business user and owns the Promotion, return false otherwise
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $promotionId
     * @return bool
     * @throws doctrineException
     */
    public function deletePromotionById(string $promotionId): bool
    {
        $userLogin = $this->userService->getUserLogin();
        $promotion = $this->daoFactory->getPromotionDao()->getById($promotionId);
        if ($promotion !== null && $promotion->getBusiness()->getLogin() === $userLogin) {
            $this->daoFactory->getPromotionDao()->delete($promotion);
            return true;
        }
        return false;
    }

    /**
     * Raise an error if the logged Business account is not approved, doesn't have a sub-category or doesn't own the Promotion, budget = targetNumber * charge of Business' sub category
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string|null $uuid
     * @param int $targetNumber
     * @param string $caption
     * @param string $description
     * @param string $termsOfService
     * @param string $promoImageUrl
     * @param string $startDate
     * @param string|null $endDate
     * @param string|null $passcode
     * @param BusinessLocation[] $businessLocations
     * @param bool $isReturningAllowed
     * @return Promotion
     * @throws AppException
     */
    public function createOrUpdateOfflinePromotion(?string $uuid, int $targetNumber, string $caption, string $description, string $termsOfService, string $promoImageUrl, string $startDate, ?string $endDate, ?string $passcode, array $businessLocations, bool $isReturningAllowed): Promotion
    {
        /** @var Business $business */
        $business = $this->userService->getLoggedUser();
        $promotion = $this->checkBusinessAndPromotion($business, $uuid);

        $promotion->setIsOnlinePromo(false);
        $promotion->setTargetNumber($targetNumber);
        if ($business->getSubCategory() !== null) {
            /** @var OfflinePromoPricing $offlinePromoPricing */
            $offlinePromoPricing = $this->daoFactory->getOfflinePromoPricingDao()->findBySubCategoryAndRegion($business->getSubCategory(), $business->getRegion())->first();
            $charge = $offlinePromoPricing->getCharge();
            $promotion->setBudget((string)($targetNumber * (float)$charge));
        }
        $promotion->setCaption($caption);
        $promotion->setDescription($description);
        $promotion->setTermsOfService($termsOfService);
        $promotion->setPromoImageUrl($promoImageUrl);
        $promotion->setStartDate(new DateTimeImmutable($startDate));
        if ($endDate !== null) {
            $promotion->setEndDate(new DateTimeImmutable($endDate));
        }

        if ($passcode !== null) {
            $business->setPasscode($passcode);
        }

        // business locations
        foreach ($businessLocations as $businessLocation) {
            $this->daoFactory->getBusinessLocationDao()->save($businessLocation);
        }
        $promotion->setBusinessLocations($businessLocations);

        $promotion->setIsReturningAllowed($isReturningAllowed);

        // save
        $this->daoFactory->getPromotionDao()->save($promotion);

        if ($passcode !== null) {
            $this->daoFactory->getBusinessDao()->save($business);
        }

        return $promotion;
    }

    /**
     * Raise an error if the logged Business account is not approved, doesn't have a sub-category or doesn't own the Promotion
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string|null $uuid
     * @param bool $isWebUrl
     * @param int $targetNumber
     * @param string $caption
     * @param string $description
     * @param string $termsOfService
     * @param string $promoImageUrl
     * @param string $startDate
     * @param string $endDate
     * @param string|null $onlineTransactionType
     * @param bool $isReturningAllowed
     * @return Promotion
     * @throws AppException
     */
    public function createOrUpdateOnlinePromotion(
        ?string $uuid,
        bool $isWebUrl,
        int $targetNumber,
        string $caption,
        string $description,
        string $termsOfService,
        string $promoImageUrl,
        string $startDate,
        ?string $endDate,
        ?string $onlineTransactionType,
        bool $isReturningAllowed
    ): Promotion {
        /** @var Business $business */
        $business = $this->userService->getLoggedUser();
        $promotion = $this->checkBusinessAndPromotion($business, $uuid);

        $promotion->setIsOnlinePromo(true);
        $promotion->setIsWebUrl($isWebUrl);
        $promotion->setTargetNumber($targetNumber);

        $promotion->setCaption($caption);
        $promotion->setDescription($description);
        $promotion->setPromoImageUrl($promoImageUrl);
        $promotion->setTermsOfService($termsOfService);
        $promotion->setStartDate(new DateTimeImmutable($startDate));
        if ($endDate !== null) {
            $promotion->setEndDate(new DateTimeImmutable($endDate));
        }
        $promotion->setOnlineTransactionType($onlineTransactionType);
        $promotion->setIsReturningAllowed($isReturningAllowed);

        // save
        $this->daoFactory->getPromotionDao()->save($promotion);

        return $promotion;
    }

    /**
     * @Query()
     * @Logged()
     * @param string $customerId
     * @return Promotion[]
     * @throws \Safe\Exceptions\ArrayException
     */
    public function getCustomerReferredPromotions(string $customerId): array
    {
        return $this->getReferredPromotionsByCustomerId($customerId);
    }

    /**
     * @param string $customerId
     * @return Promotion[]
     * @throws \Safe\Exceptions\ArrayException
     */
    private function getReferredPromotionsByCustomerId(string $customerId): array
    {
        try {
            $customer = $this->daoFactory->getCustomerDao()->getById($customerId);
        } catch (doctrineException $e) {
            return [];
        }
        $refers = $customer->getRefersByRedeemed();
        $promotions = [];
        foreach ($refers as $refer) {
            if ($refer->getIsShared()) {
                $promotions[] = $refer->getPromotion();
            }
        }
        return Promotion::sortByCreatedDate($promotions);
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return Promotion[]
     * @throws \Safe\Exceptions\ArrayException
     */
    public function getLoggedCustomerReferredPromotions(): array
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        return $this->getReferredPromotionsByCustomerId($loggedCustomer->getId());
    }

    /**
     * @param Business $business
     * @param string|null $uuid
     * @return Promotion
     * @throws AppException
     */
    private function checkBusinessAndPromotion(Business $business, ?string $uuid): Promotion
    {
        if (!$business->isApproved()) {
            throw new AppException('Business account should be approved');
        }

        if ($uuid !== null) {
            try {
                $promotion = $this->daoFactory->getPromotionDao()->getById($uuid);
                if ($promotion->getBusiness() !== $business) {
                    throw new AppException('You are not the owner of this promotion');
                }
                $promotion->setStatus(StatusEnum::PENDING); // we don't reset the rejected reason so we can show it in back office
            } catch (doctrineException $e) {
                throw new AppException("This promotion doesn't exist", 400, $e);
            }
        } else {
            $promotion = new Promotion($business);
        }
        return $promotion;
    }
}
