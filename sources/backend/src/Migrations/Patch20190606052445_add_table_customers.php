<?php
namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\FluidSchema;
use doctrine\FluidSchema\doctrineFluidSchema;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190606052445_add_table_customers extends AbstractSchemaMigrationPatch
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

        $db->table('customers')
            ->extends('users')
            ->column('civility')->string(255)->null()->graphqlField()
            ->column('birth_date')->date()->null()->graphqlField()
            ->column('instagram_id')->string(255)->null()->graphqlField()
            ->column('profile_image_url')->string(255)->null()->graphqlField()
            ->column('created_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->right('IS_ADMIN')
            ->column('updated_date')->datetime()->default('CURRENT_TIMESTAMP')->graphqlField()->right('IS_ADMIN')
            ->column('current_region_id')->references('regions')->graphqlField();

        $db->table('customers_categories')
            ->column('customer_id')->references('customers')->null()->graphqlField()
            ->column('category_id')->references('categories')->null()->graphqlField();
    }

    public function down(Schema $schema) : void
    {
        $db = new FluidSchema($schema);
        $db->getDbalSchema()->dropTable('customers');
    }

    public function getDescription(): string
    {
        return 'add table Customers';
    }
}
