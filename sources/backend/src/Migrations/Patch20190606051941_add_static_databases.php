<?php
namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\FluidSchema;
use doctrine\FluidSchema\doctrineFluidSchema;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190606051941_add_static_databases extends AbstractSchemaMigrationPatch
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

        // Region/Country Ex: Hong Kong, India
        $db->table('regions')
            ->id()->graphqlField()
            ->column('name')->string(255)->graphqlField();

        // Districts (Only for Hong Kong) Ex: Causeway Bay, Central
        $db->table('districts')
            ->id()->graphqlField()
            ->column('name')->string(255)->null()->graphqlField()
            ->column('region_id')->references('regions')->graphqlField();

        $db->table('categories')
            ->id()->graphqlField()
            ->column('label')->string(255)->graphqlField()
            ->column('icon_white_url')->string(255)->graphqlField() // For category selected
            ->column('icon_grey_url')->string(255)->graphqlField() // For category unselected
            ->column('icon_black_url')->string(255)->graphqlField(); // For promotion card category indication

        $db->table('sub_categories')
            ->id()->graphqlField()
            ->column('category_id')->references('categories')->graphqlField()
            ->column('label')->string(255)->graphqlField();

        $db->table('sub_category_customer_average_spending')
            ->id()->graphqlField()
            ->column('sub_category_id')->references('sub_categories')->graphqlField()
            ->column('region_id')->references('regions')->graphqlField()
            ->column('min_average_spending')->decimal(10, 2)->null()->graphqlField()
            ->column('max_average_spending')->decimal(10, 2)->null()->graphqlField()->then()
            ->index(['sub_category_id', 'region_id']);

        $db->table('offline_promo_pricing')
            ->id()->graphqlField()
            ->column('sub_category_id')->references('sub_categories')->graphqlField()
            ->column('region_id')->references('regions')->graphqlField()
            ->column('charge')->decimal(10, 2)->graphqlField()
            ->column('referrer_share')->decimal(10, 2)->graphqlField()
            ->column('ambassador_share')->decimal(10, 2)->graphqlField()->then()
            ->index(['sub_category_id', 'region_id']);

        $db->table('online_promo_pricing')
            ->id()->graphqlField()
            ->column('category_id')->references('categories')->graphqlField()
            ->column('region_id')->references('regions')->graphqlField()
            ->column('customer_min_spending')->decimal(10, 2)->null()->graphqlField()
            ->column('customer_max_spending')->decimal(10, 2)->null()->graphqlField()
            ->column('charge')->decimal(10, 2)->graphqlField()
            ->column('referrer_share')->decimal(10, 2)->graphqlField()
            ->column('redeemer_share')->decimal(10, 2)->graphqlField()
            ->column('ambassador_share')->decimal(10, 2)->graphqlField()->then()
            ->index(['category_id', 'region_id']);
    }

    public function down(Schema $schema) : void
    {
        $db = new FluidSchema($schema);
        $db->getDbalSchema()->dropTable('categories');
    }

    public function getDescription(): string
    {
        return 'add static databases';
    }
}
