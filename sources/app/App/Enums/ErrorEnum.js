const ERROR_REFERRER_NOT_EXISTING = 'ERROR_REFERRER_NOT_EXISTING' // wrong username
const ERROR_WRONG_PASSCODE = 'ERROR_WRONG_PASSCODE'
const ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD = 'ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD' // Business should have a valid payment method
const ERROR_BUSINESS_HAS_NO_SUBCATEGORY = 'ERROR_BUSINESS_HAS_NO_SUBCATEGORY' // Business should have a subcategory
const ERROR_SUBCATEGORY_CHARGE_AMOUNT_NULL = 'ERROR_SUBCATEGORY_CHARGE_AMOUNT_NULL'
const ERROR_SUBCATEGORY_SHARE_AMOUNT_NULL = 'ERROR_SUBCATEGORY_SHARE_AMOUNT_NULL' // sub category referrer or ambassador share amount is null
const ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED =
  'ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED'
const ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER =
  'ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER' // You have already redeemed this promotion with the given referrer
const ERROR_SERVER_MULTIPLE_REFER_FOUND = 'ERROR_SERVER_MULTIPLE_REFER_FOUND' // More than 1 Refer entry found with the given parameters
const ERROR_PROMOTION_INVALID_REFERRER = 'ERROR_PROMOTION_INVALID_REFERRER' // If no Refer entry found, the only valid referrer should be ambassador
const ERROR_PROMOTION_CIRCLE_REDEEM = 'ERROR_PROMOTION_CIRCLE_REDEEM' // You cannot use one of your redeemers as referrer
export default {
  ERROR_REFERRER_NOT_EXISTING,
  ERROR_WRONG_PASSCODE,
  ERROR_BUSINESS_HAS_NO_PAYMENT_METHOD,
  ERROR_BUSINESS_HAS_NO_SUBCATEGORY,
  ERROR_SUBCATEGORY_CHARGE_AMOUNT_NULL,
  ERROR_SUBCATEGORY_SHARE_AMOUNT_NULL,
  ERROR_PROMOTION_RETURNING_CUSTOMER_NOT_ALLOWED,
  ERROR_PROMOTION_MULTIPLE_REDEEM_WITH_SAME_REFERRER,
  ERROR_SERVER_MULTIPLE_REFER_FOUND,
  ERROR_PROMOTION_INVALID_REFERRER,
  ERROR_PROMOTION_CIRCLE_REDEEM,
}
