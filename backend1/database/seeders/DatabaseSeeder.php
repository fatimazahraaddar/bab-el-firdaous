<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Création de l'Administrateur par défaut
        User::create([
            'name' => 'Admin Scolaire',
            'email' => 'admin@ecole.com',
            'password' => Hash::make('password'), // Toujours hasher le mot de passe
            'role' => 'admin',
        ]);

        // 2. Appel des autres seeders
        $this->call([
            SchoolClassSeeder::class,
            // StudentSeeder::class, (à ajouter quand tu seras prête)
            // BusSeeder::class,
        ]);
    }
}