<?php
namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\doctrineFluidSchema;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190701082136_add_other_tables extends AbstractSchemaMigrationPatch
{
    public function up(Schema $schema) : void
    {
        $db = new doctrineFluidSchema($schema);
        // Code your migration here.
        //
        // $db->table('users')
        //     ->id() // Create an 'id' primary key that is an autoincremented integer
        //     ->column('login')->string(50)->unique()->then() // Create a login column with a "unique" index
        //     ->column('photo_url')->string(50)->null()->then() // Create a nullable 'photo_url' column
        //     ->column('country_id')->references('countries'); // Create a foreign key on the 'countries' table
        //
        // $db->junctionTable('users', 'roles'); // Create a 'users_roles' junction table between 'users' and 'roles'.

        // More documentation here: https://github.com/doctrine/dbal-fluid-schema-builder
        // and here: http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/schema-representation.html

        $db->table('business_locations')
            ->uuid()->graphqlField()
            ->column('business_id')->references('business')->graphqlField()
            ->column('district_id')->references('districts')->null()->graphqlField()
            ->column('address')->string(255)->null()->graphqlField()
            ->column('caption')->string(255)->null()->graphqlField();

        // STATUS -> appending/approved
        $db->table('promotions')
            ->uuid()->graphqlField()
            ->column('business_id')->references('business')->graphqlField()
            ->column('target_number')->integer()->null()->graphqlField()
            ->column('budget')->decimal(10, 2)->null()->graphqlField()
            ->column('caption')->string(255)->null()->graphqlField()
            ->column('description')->text()->null()->graphqlField()
            ->column('terms_of_service')->text()->null()->graphqlField()
            ->column('promo_image_url')->string(255)->null()->graphqlField()
            ->column('is_returning_allowed')->boolean()->default(0)->graphqlField()
            ->column('is_online_promo')->boolean()->default(0)->graphqlField()
            ->column('is_web_url')->boolean()->default(0)->graphqlField()
            ->column('online_transaction_type')->string(255)->null()->graphqlField() // free input from Business
            ->column('start_date')->date()->index()->null()->graphqlField()
            ->column('end_date')->date()->index()->null()->graphqlField()
            ->column('is_free_of_charge')->boolean()->default(0)->graphqlField()
            ->column('status')->string(30)->index()->default('pending')->graphqlField()
            ->column('rejected_reason')->string(255)->null()->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField();

        // JunctionTables
        $db->junctionTable('promotions', 'business_locations')->graphqlField();

        // Business can have multiple promotions
        // junctionTable is for N-N relations, 1-N need to DO $db->table('promotions')->column('business_id')->references('business')
//        $db->junctionTable('business', 'promotions')->graphqlField();

        // TODO Stripe info to add
        $db->table('business_payments')
            ->uuid()->graphqlField()
            ->column('business_id')->references('business')->unique()->graphqlField()
            ->column('stripe_card_last_4')->string(4)->null() // last 4 digit of the saved card
            ->column('stripe_customer_id')->string(255)->null()
            ->column('stripe_subscription_item_id')->string(255)->null(); // metered billing

        $db->table('customer_payments')
            ->uuid()->graphqlField()
            ->column('customer_id')->references('customers')->unique()->graphqlField()
            ->column('payment_email')->string(255)->null()->graphqlField();

        // online_redemption_transaction_value -> amount spent, linked to promotions.online_transaction_type
        // redeemed -> current customer who used the promotion/coupon
        // referrer -> the customer who shared the promotion (First time always from ambassador)
        // referrer -> if it's null, means it's from redemption proof validation
        // is_shared -> TRUE if the current customer shared the promotion
        $db->table('refers')
            ->uuid()->graphqlField()
            ->column('online_redemption_invoice_number')->string(255)->null()->graphqlField()
            ->column('online_redemption_transaction_value')->decimal(10, 2)->null()->graphqlField()
            ->column('online_promo_pricing_id')->references('online_promo_pricing')->null()->graphqlField()
            ->column('is_shared')->boolean()->default(0)->graphqlField()
            ->column('redeemed')->references('customers')->graphqlField()
            ->column('referrer')->references('customers')->null()->graphqlField()
            ->column('promotion_id')->references('promotions')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->then()
            ->index(['is_shared', 'redeemed', 'promotion_id']);

        // Online redemption, with referrer, transaction number
        // When BUSINESS approved it, we will add to table "refers"
        // online_redemption_transaction_value -> amount spent, linked to promotions.online_transaction_type
        $db->table('pending_online_redemption')
            ->uuid()->graphqlField()
            ->column('online_redemption_invoice_number')->string(255)->null()->graphqlField()
            ->column('online_redemption_transaction_value')->decimal(10, 2)->null()->graphqlField()
            ->column('online_promo_pricing_id')->references('online_promo_pricing')->graphqlField()
            ->column('is_approved')->boolean()->null()->graphqlField()
            ->column('is_shared')->boolean()->default(0)->graphqlField()
            ->column('redeemed')->references('customers')->graphqlField()
            ->column('referrer')->references('customers')->graphqlField()
            ->column('promotion_id')->references('promotions')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField();

        // Apply history redemption to become referrer so to share a promotion
        // When BUSINESS manually approved it or switch on auto approve, so while customer submit, we will set refer approved and add to table "refers", but set "referrer" to NULL, set "is_shared" to FALSE, then CUSTOMER can refer the promotion
        $db->table('pending_apply_history_redemption')
            ->uuid()->graphqlField()
            ->column('is_approved')->boolean()->null()->graphqlField()
            ->column('customer_proof_image_url')->string(255)->null()->graphqlField()
            ->column('customer_description')->string(255)->null()->graphqlField()
            ->column('is_shared')->boolean()->default(0)->graphqlField()
            ->column('redeemed')->references('customers')->graphqlField()
            ->column('referrer')->references('customers')->null()->graphqlField()
            ->column('promotion_id')->references('promotions')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField();

        // For Customer transaction history
        // STATUS -> pending/approved
        // Types :
        // 1, reward_redeemer : user_id will be redeemer
        // 2, reward_referrer : user_id will be referrer
        // 3, reward_ambassador : user_id will be ambassador
        // 4, reward_redeem_cashback : user_id will be redeemer when customer choose a referrer other than ambassador
        // 5, (NOT implemented, no action on it, we use whatsapp manually) report : Business reward for referrer, user_id will be the reporter
        // 6, withdraw : Business reward for referrer, user_id will be the customer
        // business : for Customer Transaction history (reward type transaction)
        // paypal_payout_batch_id : only for withdraw
        $db->table('transactions')
            ->uuid()->graphqlField()
            ->column('refer_id')->references('refers')->null()->graphqlField()
            ->column('user_id')->references('customers')->graphqlField()
            ->column('business')->references('business')->null()->graphqlField()
            ->column('paypal_payout_batch_id')->string(255)->null()->graphqlField()
            ->column('amount')->decimal(10, 2)->default(0)->graphqlField()
            ->column('status')->string(30)->index()->default('pending')->graphqlField()
            ->column('failed_reason')->string(255)->null()->graphqlField()
            ->column('type')->string(255)->null()->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField();

        // For Business transaction history
        // TODO change table bills to "business_transactions"
        // Types:
        // 1, add_credit: refer_id is NULL
        // 2, use_credit
        // 3, business_charge
        // Metered billing, when the transaction reward from Business reached an amount, we will charge the business
        $db->table('bills')
            ->uuid()->graphqlField()
            ->column('type')->string(255)->null()->graphqlField()
            ->column('business_id')->references('business')->graphqlField()
            ->column('refer_id')->references('refers')->null()->graphqlField()
            ->column('business_payment_id')->references('business_payments')->graphqlField()
            ->column('amount')->decimal(10, 2)->null()->graphqlField()
            ->column('failed_reason')->string(255)->null()->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField();

        // For Customer
        $db->table('wallets')
            ->uuid()->graphqlField()
            ->column('region_id')->references('regions')->notNull()->graphqlField()
            ->column('customer_id')->references('customers')->notNull()->graphqlField()
            ->column('balance')->decimal(10, 2)->default('0.00')->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->right('IS_ADMIN');
    }

    public function down(Schema $schema) : void
    {
        // Code your migration cancellation code here.
        //
        // $db->dropTable('users');
    }

    public function getDescription(): string
    {
        return '';
    }
}
