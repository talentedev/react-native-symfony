<?php
namespace App\Types;

use App\Dao\Generated\DaoFactory;
use App\Model\Business;
use App\Model\Category;
use App\Model\Customer;
use doctrine\Security\Right;
use doctrine\Security\UserService\UserServiceInterface;
use doctrine\GraphQLite\Annotations\ExtendType;
use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Logged;

/**
 * @ExtendType(class=Category::class)
 */
class CategoryType
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
     * PromotionType constructor.
     * @param UserServiceInterface $userService
     * @param DaoFactory $daoFactory
     */
    public function __construct(UserServiceInterface $userService, DaoFactory $daoFactory)
    {
        $this->userService = $userService;
        $this->daoFactory = $daoFactory;
    }

    /**
     * @Field()
     * @param Category $category
     * @return bool
     */
    public function isIsSelected(Category $category): bool
    {
        $loggedUser = $this->userService->getLoggedUser();
        if ($loggedUser instanceof Customer) {
            /** @var Customer $loggedUser */
            $customerCategories = $loggedUser->getCategories();
            return in_array($category, $customerCategories, true);
        }
        return false;
    }
}
