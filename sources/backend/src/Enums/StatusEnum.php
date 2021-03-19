<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class StatusEnum extends Enum
{
    public const PENDING = 'pending';
    public const REFUSED = 'refused';
    public const APPROVED = 'approved';
}
