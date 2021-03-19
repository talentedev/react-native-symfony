<?php

namespace App\Services;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\OnlinePromoPricing;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\doctrine\ResultIterator;

// use Aws\Sns\SnsClient;
// use function Safe\sprintf;

class BusinessService
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
     * @param Business $business
     * @return OnlinePromoPricing[]|ResultIterator
     */
    public function getOnlinePromoPricing(Business $business): ResultIterator
    {
        return $this->daoFactory->getOnlinePromoPricingDao()->findByCategoryAndRegion($business->getSubCategory()->getCategory(), $business->getRegion());
    }
}
