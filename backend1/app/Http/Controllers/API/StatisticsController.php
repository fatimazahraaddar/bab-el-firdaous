<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatisticsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // 🔥 BASE QUERY
        $paymentsQuery = Payment::where('status', 'paid');

        // 🔥 PARENT → filtre enfants
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if ($parent) {
                $paymentsQuery->whereIn(
                    'student_id',
                    $parent->children()->pluck('id')
                );
            }
        }

        // 📊 REVENUE PAR MOIS (DYNAMIQUE)
        $revenue = collect(range(1, 12))->map(function ($month) use ($paymentsQuery) {
            return [
                'month' => date('M', mktime(0, 0, 0, $month, 1)),
                'value' => (clone $paymentsQuery)
                    ->whereMonth('date', $month)
                    ->sum('amount')
            ];
        });

        // 👨‍🎓 RÉPARTITION ÉLÈVES PAR CLASSE
        $students = Student::with('class')
            ->get()
            ->groupBy(fn($s) => $s->class->name ?? 'Sans classe')
            ->map(fn($group, $name) => [
                'name' => $name,
                'value' => $group->count()
            ])
            ->values();

        return response()->json([

            // 📊 GRAPH DATA
            'revenue' => $revenue,
            'students' => $students,

            // 📊 SUMMARY
            'summary' => [
                'students' => Student::count(),
                'buses' => Bus::count(),
                'revenue' => $paymentsQuery->sum('amount')
            ]
        ]);
    }
}