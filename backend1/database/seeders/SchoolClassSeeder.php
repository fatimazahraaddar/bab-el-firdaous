<?php

namespace Database\Seeders;

use App\Models\SchoolClasse;
use Illuminate\Database\Seeder;

class SchoolClassSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $classes = [
            ['name' => '1ère année', 'level' => 'primaire'],
            ['name' => '2ème année', 'level' => 'primaire'],
            ['name' => '3ème année', 'level' => 'primaire'],
            ['name' => '4ème année', 'level' => 'primaire'],
            ['name' => '5ème année', 'level' => 'primaire'],
            ['name' => '6ème année', 'level' => 'primaire'],
            ['name' => '1ère année', 'level' => 'collège'],
            ['name' => '2ème année', 'level' => 'collège'],
            ['name' => '3ème année', 'level' => 'collège'],
            ['name' => 'Tronc commun', 'level' => 'lycée'],
            ['name' => '1ère année Bac', 'level' => 'lycée'],
            ['name' => '2ème année Bac', 'level' => 'lycée'],
        ];

        foreach ($classes as $class) {
            // updateOrCreate vérifie si le nom existe déjà.
            // Si oui, il met à jour le niveau. Si non, il crée la ligne.
            SchoolClasse::updateOrCreate(
                ['name' => $class['name']], 
                ['level' => $class['level']]
            );
        }
    }
}