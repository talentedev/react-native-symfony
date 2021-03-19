<?php
namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\FluidSchema;
use doctrine\FluidSchema\doctrineFluidSchema;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190606054112_add_sms_sign_in extends AbstractSchemaMigrationPatch
{
    public function up(Schema $schema) : void
    {
        $db = new doctrineFluidSchema($schema);
        $db->table('sms_sign_in')
            ->id()
            ->column('user_id')->references('users')->null()
            ->column('phone_number')->string()->unique()->notNull()
            ->column('verification_code')->string()->null()
            ->column('new_code_request_date_time')->datetime()->null()
            ->column('failed_times')->integer()->default(0)
            ->column('verification_token')->string()->unique()->null()
            ->column('token_expire_date_time')->datetime()->null()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP');
    }
    
    public function down(Schema $schema) : void
    {
        $db = new FluidSchema($schema);
        $db->getDbalSchema()->dropTable('sms_sign_in');
    }
    
    public function getDescription(): string
    {
        return 'add sms sign in';
    }
}
