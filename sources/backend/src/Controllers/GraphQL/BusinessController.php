<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\StatusEnum;
use App\Model\Business;
use doctrine\Security\UserService\UserServiceInterface;
use Safe\Exceptions\PcreException;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class BusinessController
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
     * @param string $order
     * @return Business[]|ResultIterator
     */
    public function getAllBusiness(string $order = 'created_date DESC'): ResultIterator
    {
        /** @var Business[]|ResultIterator $result */
        $result = $this->daoFactory->getBusinessDao()->findAll()->withOrder($order);
        return $result;
    }

    /**
     * @Query()
     * @Logged()
     * @return Business[]|ResultIterator
     */
    public function getAllApprovedBusiness(): ResultIterator
    {
        return $this->daoFactory->getBusinessDao()->findAllApprovedBusiness();
    }

     /**
      * @Query()
      * @Logged()
      * @param string $id
      * @return Business
      * @throws doctrineException
      */
    public function getBusiness(string $id): Business
    {
        return $this->daoFactory->getBusinessDao()->getById($id);
    }

    /**
     * Get logged Business
     *
     * @Query()
     * @Logged()
     * @return Business
     * @throws doctrineException
     */
    public function getBusinessUser(): Business
    {
        $businessId = $this->userService->getUserId();
        return $this->daoFactory->getBusinessDao()->getById($businessId);
    }


    /**
     * The email and URL are updated only if they are valid, instagramId only converted to lowercase.
     * The Business can only update its category & subcategory if the status is 'refused' (changed to 'pending' after save)
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $profileImageUrl
     * @param string $businessName
     * @param int $subCategoryId
     * @param string|null $description
     * @param string $email
     * @param string|null $instagramId
     * @param string|null $facebookUrl
     * @param string|null $websiteUrl
     * @param string|null $appleStoreUrl
     * @param string|null $playStoreUrl
     * @return Business
     * @throws doctrineException
     */
    public function updateLoggedBusiness(?string $profileImageUrl, ?string $businessName, ?int $subCategoryId, ?string $description, ?string $email, ?string $instagramId, ?string $facebookUrl, ?string $websiteUrl, ?string $appleStoreUrl, ?string $playStoreUrl): Business
    {
        $businessId = $this->userService->getUserId();
        /** @var Business $business */
        $business = $this->daoFactory->getBusinessDao()->getById($businessId);
        $statusIsRefused = $business->getStatus() === StatusEnum::REFUSED;

        if ($profileImageUrl !== null && filter_var($profileImageUrl, FILTER_VALIDATE_URL) !== false) {
            $business->setProfileImageUrl($profileImageUrl);
        }
        if ($businessName !== null) {
            $business->setBusinessName($businessName);
        }
        if ($subCategoryId !== null && $statusIsRefused) {
            $business->setSubCategory($this->daoFactory->getSubCategoryDao()->getById($subCategoryId));
        }
        if ($description !== null) {
            $business->setDescription($description);
        }
        if ($email !== null && filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
            $business->setEmail($email);
        }
        if ($instagramId !== null) {
            if ($instagramId === '') {
                $business->setInstagramId(null);
                $business->setInstagramUrl(null);
            } else {
                $business->setInstagramId(strtolower($instagramId));
                $business->setInstagramUrl('https://www.instagram.com/' . $instagramId);
            }
        }
        if ($facebookUrl !== null) {
            try {
                $valid = \Safe\preg_match('/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i', $facebookUrl);
                if ($facebookUrl === '' || !$valid) {
                    $business->setFacebookUrl(null);
                } else {
                    $business->setFacebookUrl($facebookUrl);
                }
            } catch (PcreException $e) {
                // @ignoreException
            }
        }
        if ($websiteUrl !== null) {
            if ($websiteUrl === '') {
                $business->setWebsiteUrl(null);
            }
            $url = strpos($websiteUrl, 'http') !== 0 ? "http://$websiteUrl" : $websiteUrl; // Sometimes I hate PHP
            if (filter_var($url, FILTER_VALIDATE_URL) !== false) {
                $business->setWebsiteUrl($websiteUrl);
            }
        }
        if ($appleStoreUrl !== null) {
            if ($appleStoreUrl === '') {
                $business->setAppleStoreUrl(null);
            }
            $url = strpos($appleStoreUrl, 'http') !== 0 ? "http://$appleStoreUrl" : $appleStoreUrl; // Sometimes I hate PHP
            if (filter_var($url, FILTER_VALIDATE_URL) !== false) {
                $business->setAppleStoreUrl($appleStoreUrl);
            }
        }
        if ($playStoreUrl !== null) {
            if ($playStoreUrl === '') {
                $business->setPlayStoreUrl(null);
            }
            $url = strpos($playStoreUrl, 'http') !== 0 ? "http://$playStoreUrl" : $playStoreUrl; // Sometimes I hate PHP
            if (filter_var($url, FILTER_VALIDATE_URL) !== false) {
                $business->setPlayStoreUrl($playStoreUrl);
            }
        }
        if ($statusIsRefused) {
            $business->setStatus(StatusEnum::PENDING);
        }

        $this->daoFactory->getBusinessDao()->save($business);
        return $business;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $id
     * @param string $status
     * @param string|null $rejectReason
     * @return string
     * @throws doctrineException
     */
    public function updateBusinessStatus(string $id, string $status, ?string $rejectReason): string
    {
        $business = $this->daoFactory->getBusinessDao()->getById($id);
        if ($status === StatusEnum::APPROVED) {
            $business->setStatus(StatusEnum::APPROVED);
        } else {
            $business->setStatus(StatusEnum::REFUSED);
            $business->setRejectedReason($rejectReason);
        }
        $this->daoFactory->getBusinessDao()->save($business);

        return $business->getStatus();
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $passcode
     * @return bool
     */
    public function updateBusinessPasscode(string $passcode): bool
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $loggedBusiness->setPasscode($passcode);
        $this->daoFactory->getBusinessDao()->save($loggedBusiness);
        return true;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return Business
     */
    public function removeInstagramInfo(): Business
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $loggedBusiness->setInstagramId(null);
        $loggedBusiness->setInstagramUrl(null);
        $this->daoFactory->getBusinessDao()->save($loggedBusiness);
        return $loggedBusiness;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return Business
     */
    public function removeFacebookInfo(): Business
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        $loggedBusiness->setFacebookId(null);
        $loggedBusiness->setFacebookUrl(null);
        $this->daoFactory->getBusinessDao()->save($loggedBusiness);
        return $loggedBusiness;
    }
}
