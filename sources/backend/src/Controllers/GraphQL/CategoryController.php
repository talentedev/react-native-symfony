<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\Category;
use App\Model\Customer;
use App\Model\Promotion;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\doctrine\NoBeanFoundException;
use doctrine\doctrine\ResultIterator;
use doctrine\doctrine\doctrineException;

class CategoryController
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
     * @return Category[]|ResultIterator
     */
    public function getCategories(): ResultIterator
    {
        return $this->daoFactory->getCategoryDao()->findAll();
    }

    /**
     * @Query()
     * @param int $id
     * @return Category
     * @throws doctrineException
     */
    public function getCategory(int $id): Category
    {
        return $this->daoFactory->getCategoryDao()->getById($id);
    }

    /**
     * @Mutation()
     * @param int[] $categoryIds
     * @return bool
     * @throws doctrineException
     */
    public function updateCustomerCategories(array $categoryIds): bool
    {
        /** @var Customer $currentCustomer */
        $currentCustomer = $this->userService->getLoggedUser();
        $categories = $currentCustomer->getCategories();
        foreach ($categories as $category) {
            $currentCustomer->removeCategory($category);
            $this->daoFactory->getCustomerDao()->save($currentCustomer);
        }

        foreach ($categoryIds as $categoryId) {
            $category = null;
            try {
                $category = $this->daoFactory->getCategoryDao()->getById($categoryId);
            } catch (NoBeanFoundException $noBeanFoundException) {
                continue;
            }
            if ($category !== null) {
                $currentCustomer->addCategory($category);
                $this->daoFactory->getCustomerDao()->save($currentCustomer);
            }
        }
        return true;
    }
}
