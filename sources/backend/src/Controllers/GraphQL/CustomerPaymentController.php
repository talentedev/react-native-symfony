<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Model\Customer;
use App\Model\CustomerPayment;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;

class CustomerPaymentController
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
     * @Right("IS_CUSTOMER")
     * @return CustomerPayment|null
     */
    public function getLoggedCustomerPayment(): ?CustomerPayment
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        return $loggedCustomer->getCustomerPayments()->first(); // Only one CustomerPayments by Customer
    }

    /**
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $paymentEmail
     * @return CustomerPayment|null
     */
    public function setLoggedCustomerPayment(string $paymentEmail): ?CustomerPayment
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();
        $loggedCustomerPayment = $loggedCustomer->getCustomerPayments()->first(); // Only one CustomerPayments by Customer
        if ($loggedCustomerPayment === null) {
            $loggedCustomerPayment = new CustomerPayment($loggedCustomer);
        }
        if (filter_var($paymentEmail, FILTER_VALIDATE_EMAIL) !== false) {
            $loggedCustomerPayment->setPaymentEmail($paymentEmail);
            $this->daoFactory->getCustomerPaymentDao()->save($loggedCustomerPayment);
        }
        return null;
    }
}
