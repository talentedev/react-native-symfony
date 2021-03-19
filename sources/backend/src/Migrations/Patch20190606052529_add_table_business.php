<?php
namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\FluidSchema;
use doctrine\FluidSchema\doctrineFluidSchema;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190606052529_add_table_business extends AbstractSchemaMigrationPatch
{
    public function up(Schema $schema) : void
    {
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

        $db = new doctrineFluidSchema($schema);

        // STATUS -> appending/approved
        // facebook_id not used, only facebook_url
        // business_credit is like wallet for Business
        $db->table('business')
            ->extends('users')
            ->column('sub_category_id')->references('sub_categories')->graphqlField()
            ->column('region_id')->references('regions')->graphqlField()
            ->column('business_credit')->decimal(10, 2)->default(0)->graphqlField()
            ->column('business_name')->string(255)->null()->graphqlField()
            ->column('status')->string(30)->index()->default('pending')->graphqlField()
            ->column('rejected_reason')->string(255)->null()->graphqlField()
            ->column('instagram_id')->string(255)->null()->graphqlField()
            ->column('instagram_url')->string(255)->null()->graphqlField()
            ->column('facebook_id')->string(255)->null()->graphqlField()
            ->column('facebook_url')->string(255)->null()->graphqlField()
            ->column('website_url')->string(255)->null()->graphqlField()
            ->column('apple_store_url')->string(255)->null()->graphqlField()
            ->column('play_store_url')->string(255)->null()->graphqlField()
            ->column('profile_image_url')->string(255)->null()->graphqlField()
            ->column('description')->string(255)->null()->graphqlField()
            ->column('terms_and_conditions')->string(255)->null()->graphqlField()
            ->column('passcode')->string(255)->default('000000')->null()
            ->column('is_auto_approve_become_referrer')->boolean()->default(0)
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->right('IS_ADMIN')
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->right('IS_ADMIN');
    }

    public function down(Schema $schema) : void
    {
        $db = new FluidSchema($schema);
        $db->getDbalSchema()->dropTable('business');
    }

    public function getDescription(): string
    {
        return 'add table Business';
    }
}
