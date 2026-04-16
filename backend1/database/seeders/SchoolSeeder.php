<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Guardian;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\TimeTable;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@schoolhub.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $teacherUser = User::create([
            'name' => 'Marc Dupont',
            'email' => 'teacher@schoolhub.test',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        Teacher::create([
            'user_id' => $teacherUser->id,
            'subject' => 'Mathématiques',
        ]);

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

        $studentUser = User::create([
            'name' => 'Lina Martin',
            'email' => 'student@schoolhub.test',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        Student::create([
            'user_id' => $studentUser->id,
            'class' => '5ème A',
            'parent_id' => $guardian->id,
            'transport_type' => 'bus',
            'bus_number' => 'B12',
        ]);

        Announcement::create([
            'title' => 'Rentrée scolaire',
            'content' => 'La rentrée aura lieu le lundi 1er septembre. Pensez à préparer votre matériel.',
            'author_id' => $admin->id,
            'target' => 'all',
        ]);

        Payment::create([
            'student_id' => $studentUser->id,
            'description' => 'Frais de scolarité',
            'amount' => 1200.00,
            'status' => 'unpaid',
            'due_date' => now()->addDays(30)->toDateString(),
        ]);

        TimeTable::create([
            'day' => 'Monday',
            'start_time' => '08:30:00',
            'end_time' => '09:30:00',
            'subject' => 'Mathématiques',
            'teacher' => 'Marc Dupont',
            'class' => '5ème A',
            'room' => 'A1',
        ]);
    }
}
