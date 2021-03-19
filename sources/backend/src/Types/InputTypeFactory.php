<?php

namespace App\Types;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\BusinessLocation;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Factory;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\doctrineException;

class InputTypeFactory
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
     * InputTypeFactory constructor.
     * @param DaoFactory $daoFactory
     * @param UserServiceInterface $userService
     */
    public function __construct(DaoFactory $daoFactory, UserServiceInterface $userService)
    {
        $this->daoFactory = $daoFactory;
        $this->userService = $userService;
    }

    /**
     * The Factory annotation will create automatically a BusinessLocationInput input type in GraphQL.
     *
     * @Factory()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @param string $uuid
     * @param int|null $districtId
     * @param string $address
     * @param string $caption
     * @return BusinessLocation
     * @throws doctrineException
     */
    public function createBusinessLocation(string $uuid, ?int $districtId, string $address, string $caption): BusinessLocation
    {
        /** @var Business $business */
        $business = $this->userService->getLoggedUser();


        try {
            $businessLocation = $this->daoFactory->getBusinessLocationDao()->getById($uuid);
        } catch (doctrineException $e) {
            $businessLocation = new BusinessLocation($business);
        }
        if ($districtId) {
            $district = $this->daoFactory->getDistrictDao()->getById($districtId);
            $businessLocation->setDistrict($district);
        }
        $businessLocation->setAddress($address);
        $businessLocation->setCaption($caption);
        return $businessLocation;
    }
}
