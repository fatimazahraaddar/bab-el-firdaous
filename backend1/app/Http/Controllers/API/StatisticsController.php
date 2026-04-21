<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\{Payment, Student, Bus, ClassModel};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, DB};
use Illuminate\Http\JsonResponse;

class StatisticsController extends Controller
{
    public function index(): JsonResponse
    {
        $user = Auth::user();

        // 1. REVENU MENSUEL (Une seule requête groupée)
        $revenueData = Payment::where('status', 'paid')
            ->select(
                DB::raw('MONTH(paid_date) as month_num'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('paid_date', date('Y')); // Année en cours

        // Sécurité Parent
        if ($user->role === 'parent') {
            $studentIds = $user->parentProfile->children()->pluck('students.id');
            $revenueData->whereIn('student_id', $studentIds);
        }

        $revenueResults = $revenueData->groupBy('month_num')
            ->orderBy('month_num')
            ->get()
            ->pluck('total', 'month_num');

        // Formater pour le Frontend (Recharts/Chart.js)
        $revenue = collect(range(1, 12))->map(function ($month) use ($revenueResults) {
            return [
                'month' => date('M', mktime(0, 0, 0, $month, 1)),
                'value' => (float) ($revenueResults[$month] ?? 0)
            ];
        });

        // 2. RÉPARTITION ÉLÈVES (Optimisé via SQL group by)
        $studentsByClass = ClassModel::withCount('students')
            ->get()
            ->map(fn($class) => [
                'name'  => $class->name,
                'value' => $class->students_count
            ]);

        // 3. RÉSUMÉ GLOBAL
        $summary = [
            'students_count' => Student::count(),
            'buses_count'    => Bus::count(),
            'total_revenue'  => (float) Payment::where('status', 'paid')->sum('amount'),
        ];

        return response()->json([
            'revenue'  => $revenue,
            'students' => $studentsByClass,
            'summary'  => $summary
        ]);
    }
}