<?php
namespace App\Migrations;

use Doctrine\DBAL\Connection;
use doctrine\Database\Patcher\AbstractDataMigrationPatch;

/**
 * This class is a patch used to apply insert/update/deletes to rows of the database.
 */
class Patch20190528073207_add_default_admin_user extends AbstractDataMigrationPatch
{
    public function up(Connection $connection) : void
    {
        // Code your data processing code here.
        $connection->insert('users', [
            'id' => 1,
            'login' => 'admin',
            'password' => password_hash('admin', PASSWORD_DEFAULT),
            'email' => 'admin@email.com',
            'phone_number' => '+852 12345678',
        ]);
        $connection->insert('roles', [
            'id' => 1,
            'label' => 'ADMIN',
        ]);
        $connection->insert('roles', [
            'id' => 2,
            'label' => 'CUSTOMER',
        ]);
        $connection->insert('roles', [
            'id' => 3,
            'label' => 'BUSINESS',
        ]);
        $connection->insert('users_roles', [
            'user_id' => 1,
            'role_id' => 1,
        ]);
        $connection->insert('roles_rights', [
            'role_id' => 1,
            'right_key' => 'IS_ADMIN',
        ]);
        $connection->insert('roles_rights', [
            'role_id' => 2,
            'right_key' => 'IS_CUSTOMER',
        ]);
        $connection->insert('roles_rights', [
            'role_id' => 3,
            'right_key' => 'IS_BUSINESS',
        ]);
    }

    public function down(Connection $connection) : void
    {
        // Code your migration cancellation code here.
    }

    public function getDescription(): string
    {
        return '';
    }
}
