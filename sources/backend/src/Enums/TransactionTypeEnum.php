<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class TransactionTypeEnum extends Enum
{
    public const REWARD = 'reward';
    public const REPORT = 'report';
    public const WITHDRAW = 'withdraw';
}
