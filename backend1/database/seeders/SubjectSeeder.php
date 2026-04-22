<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    $subjects = [
        ['id' => 1, 'name' => 'Arabe'],
        ['id' => 2, 'name' => 'Français'],
        ['id' => 3, 'name' => 'Mathématiques'],
        ['id' => 4, 'name' => 'Anglais'],
        ['id' => 5, 'name' => 'Physique'],
        ['id' => 6, 'name' => 'Sport'],
        ['id' => 7, 'name' => 'Informatique'],
        ['id' => 8, 'name' => 'Histoire Géographie'],
        ['id' => 9, 'name' => 'Education Islamique'],
        ['id' => 10, 'name' => 'Philosophie'],
        ['id' => 11, 'name' => 'Sciences de la Vie et de la Terre (SVT)'],
    ];

    foreach ($subjects as $subject) {
        // On utilise le modèle Subject pour créer les lignes
        \App\Models\Subject::updateOrCreate(['name' => $subject['name']]);
    }
}
    }

