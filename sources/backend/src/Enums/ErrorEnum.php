<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class ErrorEnum extends Enum
{
    public const ERROR_REFERRER_NOT_EXISTING = 'ERROR_REFERRER_NOT_EXISTING'; // wrong username

    public const ERROR_WRONG_PASSCODE = 'ERROR_WRONG_PASSCODE';

    public const ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD = 'ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD'; // Business should have a valid payment method
    public const ERROR_BUSINESS_HAS_NO_SUBCATEGORY = 'ERROR_BUSINESS_HAS_NO_SUBCATEGORY'; // Business should have a subcategory

    public const ERROR_SUBCATEGORY_CHARGE_AMOUNT_NULL = 'ERROR_SUBCATEGORY_CHARGE_AMOUNT_NULL';
    public const ERROR_SUBCATEGORY_SHARE_AMOUNT_NULL = 'ERROR_SUBCATEGORY_SHARE_AMOUNT_NULL'; // sub category referrer or ambassador share amount is null


    public const ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED = 'ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED';
    public const ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER = 'ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER'; // You have already redeemed this promotion with the given referrer
    public const ERROR_PROMOTION_NO_ONLINE_PRICING = 'ERROR_PROMOTION_NO_ONLINE_PRICING';
    public const ERROR_PROMOTION_NO_ONLINE_PRICING_MATCH = 'ERROR_PROMOTION_NO_ONLINE_PRICING_MATCH';

    public const ERROR_SERVER_MULTIPLE_REFER_FOUND = 'ERROR_SERVER_MULTIPLE_REFER_FOUND'; // More than 1 Refer entry found with the given parameters
    public const ERROR_PROMOTION_INVALID_REFERRER = 'ERROR_PROMOTION_INVALID_REFERRER';// If no Refer entry found, the only valid referrer should be ambassador
    public const ERROR_PROMOTION_CIRCLE_REDEEM = 'ERROR_PROMOTION_CIRCLE_REDEEM'; // You cannot use one of your redeemers as referrer

    public const ERROR_PROMOTION_TRANSACTION_VALUE_NOT_POSITIVE = 'ERROR_PROMOTION_TRANSACTION_VALUE_NOT_POSITIVE'; // Should be > 0

    // Stripe
    public const ERROR_INVALID_REQUEST = 'ERROR_INVALID_REQUEST';
    public const ERROR_CANNOT_FETCH_CARD_DATA = 'ERROR_CANNOT_FETCH_CARD_DATA';
    public const ERROR_API_EXCEPTION = 'ERROR_API_EXCEPTION';

    public const ERROR_PROMOTION_NOT_VALID_AND_ACTIVE = 'ERROR_PROMOTION_NOT_VALID_AND_ACTIVE';
}
