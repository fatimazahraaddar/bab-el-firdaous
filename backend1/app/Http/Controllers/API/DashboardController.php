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
        // 1. استعمل الـ Counts بسيطة بلا تعقيد دابا
        $studentsCount = Student::count();

        // 2. أنشئ الـ Stats بمصفوفة ثابتة للتجربة
        $stats = [
            $this->statBox('Élèves', $studentsCount, 10, 5, 'Users'),
            $this->statBox('Absences', 5, 5, 2, 'AlertCircle', true),
            $this->statBox('Paiements', 100, 50, 40, 'DollarSign'),
        ];

        // 3. جيب الـ Classes بلا حسابات معقدة دابا
        $classes = ClassModel::take(5)->get()->map(fn($class) => [
            'name' => $class->name,
            'students' => 20,
            'performance' => 90,
            'avg' => 15
        ]);

        return response()->json([
            'stats' => $stats,
            'activities' => [], // خوي هادي مؤقتاً
            'classes' => $classes,
            'events' => [],
            'announcements' => []
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
