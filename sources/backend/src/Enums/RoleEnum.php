<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class RoleEnum extends Enum
{
    public const ADMIN = [ 'id' => '1', 'name' => 'ADMIN'];
    public const CUSTOMER = [ 'id' => '2', 'name' => 'CUSTOMER'];
    public const BUSINESS = [ 'id' => '3', 'name' => 'BUSINESS'];
}
