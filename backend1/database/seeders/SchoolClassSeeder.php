<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use Illuminate\Database\Seeder;

class SchoolClassSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $classes = [
            ['name' => '1A', 'level' => 'primaire'],
            ['name' => '2A', 'level' => 'primaire'],
            ['name' => '3A', 'level' => 'primaire'],
            ['name' => '4A', 'level' => 'college'],
            ['name' => '5A', 'level' => 'college'],
            ['name' => '6A', 'level' => 'lycee'],
        ];

        foreach ($classes as $class) {
            // updateOrCreate vérifie si le nom existe déjà.
            // Si oui, il met à jour le niveau. Si non, il crée la ligne.
            SchoolClass::updateOrCreate(
                ['name' => $class['name']], 
                ['level' => $class['level']]
            );
        }
    }
}