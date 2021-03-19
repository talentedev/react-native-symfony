<?php

namespace App\Controllers\GraphQL;

use App\Dao\Generated\DaoFactory;
use App\Enums\RoleEnum;
use App\Exception\AppException;
use App\Model\Business;
use App\Model\Customer;
use App\Model\Wallet;
use DateTimeImmutable;
use doctrine\Security\UserService\UserServiceInterface;
use Safe\Exceptions\PcreException;
use doctrine\GraphQLite\Annotations\Logged;
use doctrine\GraphQLite\Annotations\Mutation;
use doctrine\GraphQLite\Annotations\Query;
use doctrine\doctrine\doctrineException;

class UserController
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
     * @Mutation()
     * @param string $token
     * @param int $regionId
     * @param string $userName
     * @param string $businessName
     * @param int $subCategoryId
     * @param string $email
     * @param string $profileImageUrl
     * @param string|null $instagramId
     * @param string|null $facebookUrl
     * @return bool
     * @throws AppException
     * @throws doctrineException
     */
    public function businessSignUp(string $token, int $regionId, string $userName, string $businessName, int $subCategoryId, string $email, ?string $profileImageUrl, ?string $instagramId, ?string $facebookUrl): bool
    {
        // token == smsSignInToken
        $smsSignIn = $this->daoFactory->getSmSignInDao()->findOneByVerificationToken($token);
        if ($smsSignIn === null || $smsSignIn->hasVerificationTokenExpired()) {
            throw new AppException('Invalid token');
        }
        if ($smsSignIn->getUser() !== null) {
            throw new AppException('An user already exists for this phone number');
        }

        $region = $this->daoFactory->getRegionDao()->getById($regionId);
        $phoneNumber = $smsSignIn->getPhoneNumber();
        $business = new Business('business_login_' . bin2hex(random_bytes(8)), 'business_password_' . bin2hex(random_bytes(8)), $email, $phoneNumber, $this->daoFactory->getSubCategoryDao()->getById($subCategoryId), $region);

        // Properties
        $business->setUserName($userName);
        $business->setBusinessName($businessName);
        if ($profileImageUrl !== null && filter_var($profileImageUrl, FILTER_VALIDATE_URL) !== false) {
            $business->setProfileImageUrl($profileImageUrl);
        }
        if ($instagramId) {
            $business->setInstagramId(strtolower($instagramId));
            $business->setInstagramUrl('https://www.instagram.com/' . strtolower($instagramId));
        }
        if ($facebookUrl !== null) {
            try {
                $valid = \Safe\preg_match('/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i', $facebookUrl);
                if ($valid) {
                    $business->setFacebookUrl($facebookUrl);
                }
            } catch (PcreException $e) {
                // @ignoreException
            }
        }

        // Role // TODO: implement ONLINE_BUSINESS
        $offlineBusinessRole = $this->daoFactory->getRoleDao()->getById(RoleEnum::BUSINESS['id']);
        $business->addRole($offlineBusinessRole);

        // Update SmsSignIn
        $smsSignIn->setUser($business);

        // Save everything
        $this->daoFactory->getBusinessDao()->save($business);
        $this->daoFactory->getSmSignInDao()->save($smsSignIn);

        $this->userService->loginWithoutPassword($business->getLogin());

        return true;
    }

    /**
     * @Mutation()
     * @param string $token
     * @param int $regionId
     * @param string $userName
     * @param string $firstname
     * @param string $lastname
     * @param string $email
     * @param string $birthDate
     * @param string $civility
     * @param int[] $categoryIds
     * @param string|null $profileImageUrl

     * @return bool
     * @throws AppException
     * @throws doctrineException
     */
    public function customerSignUp(string $token, int $regionId, string $userName, string $firstname, string $lastname, string $email, string $birthDate, string $civility, array $categoryIds, ?string $profileImageUrl): bool
    {
        // token == smsSignInToken
        $smsSignIn = $this->daoFactory->getSmSignInDao()->findOneByVerificationToken($token);
        if ($smsSignIn === null || $smsSignIn->hasVerificationTokenExpired()) {
            throw new AppException('Invalid token');
        }
        if ($smsSignIn->getUser() !== null) {
            throw new AppException('An user already exists for this phone number');
        }

        $region = $this->daoFactory->getRegionDao()->getById($regionId);
        $phoneNumber = $smsSignIn->getPhoneNumber();
        $customer = new Customer('customer_login_' . bin2hex(random_bytes(8)), 'customer_password_' . bin2hex(random_bytes(8)), $email, $phoneNumber, $region);

        // Properties
        $customer->setUserName($userName);
        $customer->setFirstname($firstname);
        $customer->setLastname($lastname);
        $customer->setBirthDate(new DateTimeImmutable($birthDate));
        $customer->setCivility($civility);
        if ($profileImageUrl !== null && filter_var($profileImageUrl, FILTER_VALIDATE_URL) !== false) {
            $customer->setProfileImageUrl($profileImageUrl);
        }

        // Categories
        $categories = [];
        foreach ($categoryIds as $categoryId) {
            $categories[] = $this->daoFactory->getCategoryDao()->getById($categoryId);
        }
        $customer->setCategories($categories);

        // Role
        $customerRole = $this->daoFactory->getRoleDao()->getById(RoleEnum::CUSTOMER['id']);
        $customer->addRole($customerRole);

        // Update SmsSignIn
        $smsSignIn->setUser($customer);

        // Wallet
        $wallet = new Wallet($region, $customer);

        // Save everything
        $this->daoFactory->getCustomerDao()->save($customer);
        $this->daoFactory->getSmSignInDao()->save($smsSignIn);
        $this->daoFactory->getWalletDao()->save($wallet);

        $this->userService->loginWithoutPassword($customer->getLogin());

        return true;
    }

    /**
     * @Query()
     * @Logged()
     * @return string|null
     * @throws doctrineException
     * @throws AppException
     */
    public function isCustomerOrBusiness(): ?string
    {
        /** @var string|null $userId */
        $userId = $this->userService->getUserId();
        if ($userId === null) {
            throw new AppException('User not logged');
        }
        $user = $this->daoFactory->getUserDao()->getById($userId);
        $userRoles = $user->getRoles();
        if (count($userRoles) === 0) {
            return null;
        }

        // TODO: very fragile, need to take care later when one user can have multiple roles
        $userRoleId = $userRoles[0]->getId();
        switch ($userRoleId) {
            case RoleEnum::CUSTOMER['id']:
                return RoleEnum::CUSTOMER['name'];
            case RoleEnum::BUSINESS['id']:
                return RoleEnum::BUSINESS['name'];
            default:
                return null;
        }
//        return null; // $this->daoFactory->getCustomerDao()->getById($userId); // no need for an else if
    }

    /**
     * TODO: remove it before production
     *
     * @Query()
     * @return string
     */
    public function testCustomerSignIn(): string
    {
        $this->userService->loginWithoutPassword('test_customer_login_3');
        return 'success';
    }

    /**
     * TODO: remove it before production
     *
     * @Query()
     * @return string
     */
    public function testBusinessSignIn(): string
    {
        $this->userService->loginWithoutPassword('test_business_login_1');
        return 'success';
    }

    /**
     * TODO: remove it before production
     *
     * @Query()
     * @return string
     */
    public function testAdminSignIn(): string
    {
        $this->userService->loginWithoutPassword('admin');
        return 'success';
    }

    /**
     * TODO: remove it before production
     *
     * @Query()
     * @param int $number
     * @return string
     */
    public function testNumberSignIn(int $number): string
    {
        $dict = [
            101 => 'ambassador',
            102 => 'test_customer_login_2',
            103 => 'test_customer_login_3',
            104 => 'test_customer_login_4',
            105 => 'test_customer_login_5',
            106 => 'test_customer_login_6',
            201 => 'test_business_login_1',
            202 => 'test_business_login_2',
            203 => 'test_business_login_3',
            204 => 'test_business_login_4'
        ];
        if (!array_key_exists($number, $dict)) {
            return 'invalid number';
        }
        $this->userService->loginWithoutPassword($dict[$number]);
        return 'success';
    }

    /**
     * @Query()
     * @return string
     */
    public function logout(): string
    {
        $this->userService->logoff();
        return 'success';
    }

    /**
     * @Query()
     * @param string $userName
     * @return bool
     */
    public function isUserNameAvailable(string $userName): bool
    {
        $user = $this->daoFactory->getUserDao()->findOneByUserName($userName);
        return $user === null;
    }
}
