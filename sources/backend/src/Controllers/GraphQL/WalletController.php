<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Model\Customer;
use App\Model\Wallet;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class WalletController
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
     * @return Wallet[]|ResultIterator
     */
    public function getWallets(): ResultIterator
    {
        return $this->daoFactory->getWalletDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $id
     * @return Wallet
     * @throws doctrineException
     */
    public function getWallet(string $id): Wallet
    {
        return $this->daoFactory->getWalletDao()->getById($id);
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @return Wallet
     */
    public function getLoggedCustomerWallet(): Wallet
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();

        $wallet = $loggedCustomer->getWallets()->first(); // Only one Wallet by Customer for the moment TODO: handle multi regions for next evolution
        // Initialize a wallet if not done
        if ($wallet === null) {
            $wallet = new Wallet($loggedCustomer->getCurrentRegion(), $loggedCustomer);
            $this->daoFactory->getWalletDao()->save($wallet);
        }
        return $wallet;
    }

//    /**
//     * @Mutation()
//     * @Logged()
//     * @Right("IS_ADMIN")
//     * @return bool
//     */
//    public function withdraw(): bool
//    {
//        /** @var Customer $loggedCustomer */
//        $loggedCustomer = $this->userService->getLoggedUser();
//        return $loggedCustomer->getWallets()->first(); // Only one Wallet by Customer
//
//
//    }
}
