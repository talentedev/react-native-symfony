<?php
namespace App\Migrations;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Schema\Schema;
use doctrine\Database\Patcher\AbstractSchemaMigrationPatch;
use doctrine\FluidSchema\FluidSchema;
use doctrine\FluidSchema\doctrineFluidSchema;
use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Logged;


/**
 * This class is a patch used to apply changes to the database.
 */
class Patch20190528072446_modify_users_table extends AbstractSchemaMigrationPatch
{
    public function up(Schema $schema) : void
    {
        $db = new doctrineFluidSchema($schema);

        $modifyUsers = $db->table('users')
            ->column('user_name')->string(255)->null()->unique()->graphqlField()
            ->column('phone_number')->string(255)->notNull()->graphqlField();

        $users = $db->table('users')->graphqlType()
            ->getDbalTable();

        $users->getColumn('id')->setComment("@UUID\n@".Field::class);
//        $users->getColumn('login')->setComment('@' .Field::class."\n@".Logged::class);
        $users->getColumn('email')->setComment('@' .Field::class."\n@".Logged::class);
        $users->getColumn('lastname')->setComment('@' .Field::class."\n@".Logged::class);
        $users->getColumn('firstname')->setComment('@' .Field::class."\n@".Logged::class);

        $roles = $db->table('roles')->graphqlType()->getDbalTable();
        $roles->getColumn('id')->setComment('@' .Field::class);
        $roles->getColumn('label')->setComment('@' .Field::class);

        $user_roles = $db->table('users_roles')->getDbalTable()->addOption('comment', '@' .Field::class);

        $rolesRight = $db->table('roles_rights')->graphqlType()->getDbalTable();
        $rolesRight->getColumn('role_id')->setComment('@' .Field::class);
        $rolesRight->getColumn('right_key')->setComment('@' .Field::class);
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
