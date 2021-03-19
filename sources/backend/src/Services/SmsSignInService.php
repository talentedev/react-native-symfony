<?php

namespace App\Services;

use App\Dao\Generated\DaoFactory;
use App\Exception\AppException;
use App\Model\SmSignIn;
use Aws\Exception\AwsException;
use DateTimeImmutable;
use Exception;
use doctrine\Security\UserService\UserServiceInterface;
use function Safe\preg_match;

// use Aws\Sns\SnsClient;
// use function Safe\sprintf;

class SmsSignInService
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
     * Throws an error if token is invalid.
     * If token is valid and the user exists (already signed up), logs him in and return true.
     * Otherwise just returns false.
     *
     * @param string $smsSignInToken
     * @return bool
     * @throws AppException
     */
    public function verifyTokenAndLogUserIfExists(string $smsSignInToken): bool
    {
        $smsSignIn = $this->daoFactory->getSmSignInDao()->findOneByVerificationToken($smsSignInToken);
        if ($smsSignIn === null || $smsSignIn->hasVerificationTokenExpired()) {
            throw new AppException('Invalid token');
        }
        $this->resetVerificationCodeStuffs($smsSignIn);
        $this->daoFactory->getSmSignInDao()->save($smsSignIn);
        $user = $smsSignIn->getUser();
        if ($user) {
            $this->userService->loginWithoutPassword($user->getLogin());
            return true;
        }
        return false;
    }

    private function resetVerificationCodeStuffs(SmSignIn $smSignIn): void
    {
        $smSignIn->setVerificationCode(null);
        $smSignIn->setNewCodeRequestDateTime(null);
        $smSignIn->setFailedTimes(0);
    }

    /**
     * @param string $phoneNumber
     * @param string $code
     * @return string|null
     * @throws Exception
     */
    public function verifyCodeAndGetToken(string $phoneNumber, string $code): ?string
    {
        if (preg_match('^\d{6}$^', $code) === 0) {
            return null;
        }
        $smsSignIn = $this->daoFactory->getSmSignInDao()->findOneByPhoneNumber($phoneNumber);
        if ($smsSignIn === null) {
            return null; // instead of throwing an error to avoid phone numbers pinpointing
        }
        $failedTimes = $smsSignIn->getFailedTimes();
        if ($failedTimes >= SmSignIn::MAX_FAILED_TIMES) {
            throw new AppException('Maximum code verification attempts reached');
        }
        if ($smsSignIn->getVerificationCode() === $code) {
//            $client = $smsSignIn->getUser();
//            if ($client === null) {
//                $client = new User (uniqid('client_login_', true), uniqid('client_password_', true), uniqid('sms_client_', true));
//                $client->setPhoneNumber($phoneNumber);
//                $smsSignIn->setClient($client);
//            }
            $token = bin2hex(random_bytes(32));
            $smsSignIn->setVerificationToken($token);
            $smsSignIn->setTokenExpireDateTimeFromNow();
            $this->resetVerificationCodeStuffs($smsSignIn);
//            $this->daoFactory->getClientDao()->save($client);
            $this->daoFactory->getSmSignInDao()->save($smsSignIn);
            return $token;
        }
        $smsSignIn->setFailedTimes($failedTimes + 1);
        $this->daoFactory->getSmSignInDao()->save($smsSignIn);
        return null;
    }

    /**
     * @param string $phoneNumber
     * @return DateTimeImmutable|null
     * @throws AppException
     */
    public function sendSmsVerificationCode(string $phoneNumber): ?DateTimeImmutable
    {
        $smsSignIn = $this->daoFactory->getSmSignInDao()->findOneByPhoneNumber($phoneNumber);
        if ($smsSignIn === null) {
            // TODO: implement/use a queue system to prevent a DoS or spamming different phone numbers
            $smsSignIn = new SmSignIn($phoneNumber);
            try {
                $smsSignIn = $this->sendSmsAndUpdateSmSignIn($smsSignIn);
            } catch (Exception $e) {
                throw new AppException('Cannot send SMS, please retry later.', 400, $e);
            }
            $this->daoFactory->getSmSignInDao()->save($smsSignIn);
            return $smsSignIn->getNewCodeRequestDateTime();
        }
        $newCodeRequestDateTime = $smsSignIn->getNewCodeRequestDateTime();
        $now = new DateTimeImmutable();
        if ($newCodeRequestDateTime === null || $newCodeRequestDateTime <= $now) {
            try {
                $smsSignIn = $this->sendSmsAndUpdateSmSignIn($smsSignIn);
            } catch (Exception $e) {
                throw new AppException('Cannot send SMS, please retry later.', 400, $e);
            }
            $this->daoFactory->getSmSignInDao()->save($smsSignIn);
            return $smsSignIn->getNewCodeRequestDateTime();
        }
        return null;
    }

    /**
     * @param SmSignIn $smSignIn
     * @return SmSignIn
     * @throws AwsException
     * @throws Exception
     */
    private function sendSmsAndUpdateSmSignIn(SmSignIn $smSignIn): SmSignIn
    {

        $verificationCode = '000000'; // TODO: remove tmp solution for prod

//        $snsClient = new SnsClient([
//            'region' => 'eu-west-1',
//            'version' => '2010-03-31', // 'latest'
//            'credentials' => [
//                'key' => AWS_SNS_KEY,
//                'secret' => AWS_SNS_SECRET,
//            ],
//        ]);
//
//        $verificationCode = sprintf('%06d', random_int(1, 999999));
//        str_shuffle($verificationCode);
//        $message = "[ambassador]\nYour verification code is: $verificationCode";
//
//        $result = $snsClient->publish([
//            'Message' => $message,
//            'PhoneNumber' => $smSignIn->getPhoneNumber(),
//        ]);
        // $result = ['MessageId' => '...'] if success, otherwise it throws an AwsException
        // var_dump($result);
        $smSignIn->setVerificationCode($verificationCode);
        $smSignIn->setFailedTimes(0);
        $smSignIn->setNewCodeRequestDateTimeFromNow();
        return $smSignIn;
    }
}
