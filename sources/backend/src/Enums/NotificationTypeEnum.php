<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class NotificationTypeEnum extends Enum
{
    public const NEW_REFERRAL = 'newReferral';
    public const WITHDRAW = 'withdraw';
    public const REFERRED = 'referred';
    public const REDEEMED = 'redeemed';
}
