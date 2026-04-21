<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Guardian;
use App\Models\Payment;
use App\Models\Student;
use App\Models\SchoolClass;
use App\Models\User;
use App\Models\Timetable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        // 1. L'ADMINISTRATEUR (Accès total au Dashboard)
        $admin = User::create([
            'name' => 'Direction Scolaire',
            'email' => 'admin@schoolhub.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. LE PARENT (Accès à l'interface Parent)
        $parentUser = User::create([
            'name' => 'Sophie Martin',
            'email' => 'parent@schoolhub.test',
            'password' => Hash::make('password'),
            'role' => 'parent',
        ]);

        $guardian = Guardian::create([
            'user_id' => $parentUser->id,
            'phone' => '+212600000000',
        ]);

        // 3. LA CLASSE
        $class5A = SchoolClass::where('name', '5A')->first() ?? SchoolClass::create(['name' => '5A', 'level' => 'college']);

        // 4. L'ÉLÈVE (Simple profil, PAS de compte User)
        // Note : On ne crée pas de User pour Lina, seulement une entrée dans la table students.
        $student = Student::create([
            'name' => 'Lina Martin', // Assure-toi d'avoir une colonne 'name' dans ta table students
            'guardian_id' => $guardian->id,
            'class_id' => $class5A->id,
            'level' => 'college',
            'transport' => 'bus',
        ]);

        // 5. ANNONCE (Visible par le parent)
        Announcement::create([
            'title' => 'Réunion Parents-Professeurs',
            'content' => 'La réunion aura lieu vendredi prochain à 18h.',
            'author_id' => $admin->id,
            'target' => 'parents',
        ]);

        // 6. PAIEMENT (Géré par l'admin, payé par le parent)
        Payment::create([
            'student_id' => $student->id,
            'description' => 'Cantine Octobre',
            'amount' => 500.00,
            'status' => 'unpaid',
            'due_date' => now()->addDays(15),
        ]);

        // 7. EMPLOI DU TEMPS (Consultable par le parent)
        Timetable::create([
            'day' => 'Monday',
            'start_time' => '08:30',
            'end_time' => '10:30',
            'subject_id' => 1, 
            'class_id' => $class5A->id,
            'room' => 'Salle B4',
        ]);
    }
}