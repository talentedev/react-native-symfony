<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\Bill;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class BillController
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
     * @return Bill[]|ResultIterator
     */
    public function getBills(): ResultIterator
    {
        return $this->daoFactory->getBillDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_ADMIN")
     * @param string $id
     * @return Bill
     * @throws doctrineException
     */
    public function getBill(string $id): Bill
    {
        return $this->daoFactory->getBillDao()->getById($id);
    }

    /**
     * TODO: check if we should customize the result
     *
     * @Query()
     * @Logged()
     * @Right("IS_BUSINESS")
     * @return Bill[]
     */
    public function getLoggedBusinessBills(): array
    {
        /** @var Business $loggedBusiness */
        $loggedBusiness = $this->userService->getLoggedUser();
        return $loggedBusiness->getBills()->toArray();
    }
}
