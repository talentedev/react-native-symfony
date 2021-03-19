<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\BusinessLocation;
use App\Model\District;
use App\Model\Region;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class BusinessLocationController
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
     * @return District[]|ResultIterator
     */
    public function getDistricts(): ResultIterator
    {
        return $this->daoFactory->getDistrictDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @param int $id
     * @return District
     * @throws doctrineException
     */
    public function getDistrict(int $id): District
    {
        return $this->daoFactory->getDistrictDao()->getById($id);
    }

    /**
     * @Query()
     * @Logged()
     * @return Region[]|ResultIterator
     */
    public function getRegions(): ResultIterator
    {
        return $this->daoFactory->getRegionDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @param int $id
     * @return Region
     * @throws doctrineException
     */
    public function getRegion(int $id): Region
    {
        return $this->daoFactory->getRegionDao()->getById($id);
    }

    /**
     * @Query()
     * @Logged()
     * @return BusinessLocation[]|ResultIterator
     */
    public function getBusinessLocations(): ResultIterator
    {
        return $this->daoFactory->getBusinessLocationDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @param string $uuid
     * @return BusinessLocation
     * @throws doctrineException
     */
    public function getBusinessLocation(string $uuid): BusinessLocation
    {
        return $this->daoFactory->getBusinessLocationDao()->getById($uuid);
    }

    /**
     * Delete the BusinessLocation and return true only if the logged user is a Business user and owns the BusinessLocation, return false otherwise
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $uuid
     * @return bool
     * @throws doctrineException
     */
    public function deleteBusinessLocation(string $uuid): bool
    {
        $loggedBusinessLogin = $this->userService->getUserLogin();
        $businessLocation = $this->daoFactory->getBusinessLocationDao()->getById($uuid);
        if ($businessLocation !== null && $businessLocation->getBusiness()->getLogin() === $loggedBusinessLogin) {
            $this->daoFactory->getBusinessLocationDao()->delete($businessLocation);
            return true;
        }
        return false;
    }

    /**
     * Save into db only if the Business creates or owns the existing BusinessLocation
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param BusinessLocation $businessLocation
     * @return BusinessLocation
     */
    public function createOrUpdateBusinessLocation(BusinessLocation $businessLocation): BusinessLocation
    {
        $loggedBusinessLogin = $this->userService->getUserLogin();
        if ($businessLocation->getBusiness()->getLogin() === $loggedBusinessLogin) {
            $this->daoFactory->getBusinessLocationDao()->save($businessLocation);
        }
        return $businessLocation;
    }

    /**
     * Save into db only if the Business creates or owns the existing BusinessLocations
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param BusinessLocation[] $businessLocations
     * @return BusinessLocation[]
     */
    public function createOrUpdateBusinessLocations(array $businessLocations): array
    {
        $loggedBusinessLogin = $this->userService->getUserLogin();
        foreach ($businessLocations as $businessLocation) {
            if ($businessLocation->getBusiness()->getLogin() === $loggedBusinessLogin) {
                $this->daoFactory->getBusinessLocationDao()->save($businessLocation);
            }
        }
        return $businessLocations;
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param BusinessLocation[] $businessLocations
     * @return BusinessLocation[]
     * @throws doctrineException
     */
    public function replaceBusinessLocations(array $businessLocations): array
    {
        /** @var Business $business */
        $business = $this->userService->getLoggedUser();
        $oldBusinessLocations = $business->getBusinessLocations();
        foreach ($oldBusinessLocations as $oldBusinessLocation) {
            if (!in_array($oldBusinessLocation, $businessLocations, true)) {
                $this->deleteBusinessLocation($oldBusinessLocation->getUuid());
            }
        }
        $this->createOrUpdateBusinessLocations($businessLocations);
        return $business->getBusinessLocations()->toArray();
    }
}
