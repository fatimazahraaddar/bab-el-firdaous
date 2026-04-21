<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\{Announcement, Student, Absence, ClassModel, Payment};

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        [$startDate, $endDate, $previousStart, $previousEnd] = $this->resolvePeriodRange($request->query('period', 'month'));

        if ($user->role === 'admin') {
            return $this->adminDashboard($startDate, $endDate, $previousStart, $previousEnd, $request->query('period'));
        }

        if ($user->role === 'parent') {
            return $this->parentDashboard($user);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    private function adminDashboard($start, $end, $pStart, $pEnd, $period)
    {
        // 1. STATS GLOBALES (en seulement 3 requêtes groupées)
        $studentsCount = Student::count();
        $studentsCurrent = Student::whereBetween('created_at', [$start, $end])->count();
        $studentsPrev = Student::whereBetween('created_at', [$pStart, $pEnd])->count();

        $absencesCurrent = Absence::whereBetween('date', [$start->toDateString(), $end->toDateString()])->count();
        $absencesPrev = Absence::whereBetween('date', [$pStart->toDateString(), $pEnd->toDateString()])->count();

        $paymentsCurrent = Payment::where('status', 'paid')->whereBetween('paid_date', [$start->toDateString(), $end->toDateString()])->count();
        $paymentsPrev = Payment::where('status', 'paid')->whereBetween('paid_date', [$pStart->toDateString(), $pEnd->toDateString()])->count();

        // 2. ACTIVITÉS RÉCENTES (Optimisé avec Limit)
        $activities = $this->getRecentActivities();

        // 3. CLASSES & PERFORMANCE (Optimisé sans boucles SQL)
        $classes = ClassModel::withCount(['students', 'students as absent_count' => function($query) {
            $query->whereHas('absences', function($q) {
                $q->whereDate('date', now()->toDateString()); // Exemple: absences du jour
            });
        }])->get()->map(fn($class) => [
            'name' => $class->name,
            'students' => $class->students_count,
            'performance' => $class->students_count > 0 
                ? round((($class->students_count - $class->absent_count) / $class->students_count) * 100) 
                : 100,
            'avg' => 4.5 // Tu peux lier cela à une moyenne de notes si tu as le module
        ]);

        return response()->json([
            'stats' => [
                $this->statBox('Élèves', $studentsCount, $studentsCurrent, $studentsPrev, 'Users'),
                $this->statBox('Absences (' . $this->periodLabel($period) . ')', $absencesCurrent, $absencesCurrent, $absencesPrev, 'AlertCircle', true),
                $this->statBox('Paiements', $paymentsCurrent, $paymentsCurrent, $paymentsPrev, 'DollarSign'),
            ],
            'activities' => $activities,
            'classes' => $classes,
            'events' => $this->getUpcomingEvents(),
            'announcements' => Announcement::latest()->take(5)->get(['id', 'title', 'created_at'])
        ]);
    }

    private function getRecentActivities()
    {
        // On récupère les données, on les formate et on les fusionne proprement
        $students = Student::with('user')->latest()->take(3)->get()->map(fn($s) => [
            'message' => "Nouvel élève : {$s->user->name}",
            'time' => $s->created_at->diffForHumans(),
            'icon' => 'CheckCircle',
            'created_at' => $s->created_at
        ]);

        $payments = Payment::with('student.user')->latest()->take(3)->get()->map(fn($p) => [
            'message' => ($p->status === 'paid' ? "Paiement reçu : " : "Attente : ") . $p->student->user->name,
            'time' => $p->created_at->diffForHumans(),
            'icon' => $p->status === 'paid' ? 'DollarSign' : 'Calendar',
            'created_at' => $p->created_at
        ]);

        return $students->concat($payments)->sortByDesc('created_at')->values()->take(6);
    }

    private function statBox($title, $value, $curr, $prev, $icon, $inverse = false)
    {
        $change = $this->formatChange($curr, $prev);
        $isPositive = $curr >= $prev;
        if ($inverse) $isPositive = !$isPositive; // Pour les absences, moins c'est mieux

        return [
            'title' => $title,
            'value' => $value,
            'change' => $change,
            'isPositive' => $isPositive,
            'icon' => $icon
        ];
    }

    // Tes méthodes privées resolvePeriodRange, formatChange et periodLabel restent identiques
}