<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::create(['name' => 'super_admin']);
        $basicRole = Role::create(['name' => 'panel_user']);

        $superAdmin = new User;
        $superAdmin->name = 'Super Admin';
        $superAdmin->email = 's@r.mx';
        $superAdmin->password = bcrypt('s@r.mx');
        $superAdmin->save();

        $superAdmin->assignRole($superAdminRole);

        $basic = new User;
        $basic->name = 'User';
        $basic->email = 'u@r.mx';
        $basic->password = bcrypt('u@r.mx');
        $basic->save();

        $basic->assignRole($basicRole);
    }
}
