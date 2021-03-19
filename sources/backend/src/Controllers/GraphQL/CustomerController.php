<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\NotificationTypeEnum;
use App\Enums\StatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Model\Customer;
use App\Model\Notification;
use App\Model\Notifications;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Right;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

use function Safe\usort;

class CustomerController
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
     * @return Customer[]|ResultIterator
     */
    public function getCustomers(): ResultIterator
    {
        return $this->daoFactory->getCustomerDao()->findAll();
    }

    /**
     * @Query()
     * @Logged()
     * @param string $id
     * @return Customer
     * @throws doctrineException
     */
    public function getCustomer(string $id): Customer
    {
        return $this->daoFactory->getCustomerDao()->getById($id);
    }


    /**
     * Get logged Customer
     *
     * @Query()
     * @Logged()
     * @return Customer
     * @throws doctrineException
     */
    public function getCustomerUser(): Customer
    {
        $customerId = $this->userService->getUserId();
        return $this->daoFactory->getCustomerDao()->getById($customerId);
    }

    /**
     * The email and URL are updated only if they are valid, instagramId only converted to lowercase
     *
     * @Mutation()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param string $firstname
     * @param string $lastname
     * @param string $email
     * @param string|null $profileImageUrl
     * @param string|null $instagramId
     * @return Customer
     * @throws doctrineException
     */
    public function updateLoggedCustomer(?string $firstname, ?string $lastname, ?string $email, ?string $profileImageUrl, ?string $instagramId): Customer
    {
        $customerId = $this->userService->getUserId();
        /** @var Customer $customer */
        $customer = $this->daoFactory->getCustomerDao()->getById($customerId);
        if ($firstname !== null) {
            $customer->setFirstname($firstname);
        }
        if ($lastname !== null) {
            $customer->setLastname($lastname);
        }
        if ($email !== null && filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
            $customer->setEmail($email);
        }
        if ($profileImageUrl !== null && filter_var($profileImageUrl, FILTER_VALIDATE_URL) !== false) {
            $customer->setProfileImageUrl($profileImageUrl);
        }
        if ($instagramId !== null) {
            if ($instagramId === '') {
                $customer->setInstagramId(null);
            } else {
                $customer->setInstagramId(strtolower($instagramId));
            }
        }
        $this->daoFactory->getCustomerDao()->save($customer);
        return $customer;
    }

    /**
     * @Query()
     * @Logged()
     * @Right("IS_CUSTOMER")
     * @param int|null $limit
     * @param int $offset
     * @param bool $ascTimestamp
     * @return Notifications
     * @throws \Safe\Exceptions\ArrayException
     */
    public function getNotifications(?int $limit = null, int $offset = 0, bool $ascTimestamp = false): Notifications
    {
        /** @var Customer $loggedCustomer */
        $loggedCustomer = $this->userService->getLoggedUser();

        // $notifications = [new Notification(NotificationTypeEnum::NEW_REFERRAL, new \DateTimeImmutable(), 'toto', null)];
        $notifications = [];

        // new referral
        $myReferrals = $loggedCustomer->getRefersByReferrer();
        foreach ($myReferrals as $refer) {
            $notifications[] = new Notification(NotificationTypeEnum::NEW_REFERRAL, $refer->getCreatedDate(), $refer->getPromotion()->getBusiness()->getBusinessName(), null);
        }

        // withdraw
        $myTransactions = $loggedCustomer->getTransactions();
        foreach ($myTransactions as $transaction) {
            if ($transaction->getType() === TransactionTypeEnum::WITHDRAW && $transaction->getStatus() === StatusEnum::APPROVED) {
                $notifications[] = new Notification(NotificationTypeEnum::WITHDRAW, $transaction->getCreatedDate(), null, $transaction->getAmount());
            }
        }

        // referred & redeemed
        $refers = $loggedCustomer->getRefersByRedeemed();
        foreach ($refers as $refer) {
            $notifications[] = new Notification(NotificationTypeEnum::REDEEMED, $refer->getCreatedDate(), $refer->getPromotion()->getBusiness()->getBusinessName(), null);
            if ($refer->getIsShared()) {
                $notifications[] = new Notification(NotificationTypeEnum::REFERRED, $refer->getUpdatedDate(), $refer->getPromotion()->getBusiness()->getBusinessName(), null);
            }
        }

        // Ordering
        if ($ascTimestamp) {
            usort($notifications, static function (Notification $a, Notification $b) {
                return $a->getTimestamp()->getTimestamp() - $b->getTimestamp()->getTimestamp();
            });
        } else {
            usort($notifications, static function (Notification $a, Notification $b) {
                return $b->getTimestamp()->getTimestamp() - $a->getTimestamp()->getTimestamp();
            });
        }

        // limit & order
        $count = count($notifications);

        if ($limit !== null || $offset !== 0) {
            $notifications = array_slice($notifications, $offset, $limit);
        }

        return new Notifications($notifications, $count);
    }
}
