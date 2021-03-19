<?php

namespace App\Controllers\GraphQL;

use App\Exception\AppException;
use App\Model\SmSignIn;
use App\Services\SmsSignInService;
use DateTimeImmutable;
use Exception;
use Safe\Exceptions\PcreException;
use doctrine\GraphQLite\Annotations\Mutation;

class SmsSignInController
{
    /** @var SmsSignInService */
    protected $smsSignInService;

    /**
     * ClientsController constructor.
     * @param SmsSignInService $smsSignInService
     */
    public function __construct(SmsSignInService $smsSignInService)
    {
        $this->smsSignInService = $smsSignInService;
    }

    /**
     * @Mutation()
     * @param string $token
     * @return bool
     * @throws AppException
     */
    public function smsLogin(string $token): bool
    {
        return $this->smsSignInService->verifyTokenAndLogUserIfExists($token);
    }

    /**
     * @Mutation()
     * @param string $countryCode
     * @param string $number
     * @param string $code
     * @return string|null
     * @throws Exception
     */
    public function verifyCodeAndGetToken(string $countryCode, string $number, string $code): ?string
    {
        $fullPhoneNumber = SmSignIn::formatAndVerifyPhoneNumber($countryCode, $number);
        return $this->smsSignInService->verifyCodeAndGetToken($fullPhoneNumber, $code);
    }

    /**
     * @Mutation()
     * @param string $countryCode
     * @param string $number
     * @return DateTimeImmutable|null
     * @throws AppException
     * @throws PcreException
     */
    public function sendVerificationSms(string $countryCode, string $number): ?DateTimeImmutable
    {
        $fullPhoneNumber = SmSignIn::formatAndVerifyPhoneNumber($countryCode, $number);
        return $this->smsSignInService->sendSmsVerificationCode($fullPhoneNumber);
    }
}
