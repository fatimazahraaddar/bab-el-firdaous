<?php

namespace Database\Seeders;

use App\Models\Absence;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AbsenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = Student::all();

        foreach ($students as $student) {
            // N-criyiw 2 ghiyabat l-koul t-lmid mitalan
            Absence::create([
                'student_id' => $student->id,
                'date'       => Carbon::now()->subDays(rand(1, 10)), // ghiyab f l-10 iyam l-khira
                'status'     => 'Absent',
                'justified'  => rand(0, 1), // mara justified mara la
                'reason'     => 'Maladie ou voyage familiale',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
