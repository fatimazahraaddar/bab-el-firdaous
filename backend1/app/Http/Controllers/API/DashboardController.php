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

        // Hna khass had l-method t-koun m-define-ya (chof l-teht)
        [$startDate, $endDate, $previousStart, $previousEnd] = $this->resolvePeriodRange($request->query('period', 'month'));

        if ($user->role === 'admin') {
            return $this->adminDashboard($startDate, $endDate, $previousStart, $previousEnd, $request->query('period'));
        }

        if ($user->role === 'parent') {
            return $this->parentDashboard($user);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function adminDashboard($start, $end, $pStart, $pEnd, $period)
    {
        $studentsCount = Student::count();
        $absencesCount = Absence::whereBetween('date', [$start, $end])->count();
        $paymentsSum = Payment::where('status', 'paid')->whereBetween('created_at', [$start, $end])->sum('amount');

        $stats = [
            $this->statBox('Élèves', $studentsCount, $studentsCount, Student::where('created_at', '<', $start)->count(), 'Users'),
            $this->statBox('Absences', $absencesCount, $absencesCount, Absence::whereBetween('date', [$pStart, $pEnd])->count(), 'AlertCircle', true),
            $this->statBox('Paiements', $paymentsSum . ' DH', $paymentsSum, Payment::where('status', 'paid')->whereBetween('created_at', [$pStart, $pEnd])->sum('amount'), 'DollarSign'),
        ];

        $news = Announcement::where('type', '!=', 'event')
            ->latest()
            ->take(5)
            ->get();

        // 2. Njibo l-i3lanat li l-type dyalhom event
        $events = Announcement::where('type', 'event')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats'         => $stats,
            'activities'    => $this->getRecentActivities() ?? [], // Ila kant null, reje3 array khawi
            'classes'       => ClassModel::take(5)->get()->map(fn($c) => [
                'name' => $c->name,
                'students' => $c->students_count ?? 0
            ]) ?? [],
            'announcements' => Announcement::latest()->take(5)->get() ?? [],
            // 'events'        => [], // Zid hado khawyin bach React may-crashi-ch ila kaye-qlib 3lihom
            'announcements' => $news->map(fn($a) => [
                'id'      => $a->id,
                'title'   => $a->title,
                'content' => $a->content,
                'date'    => $a->created_at->diffForHumans(),
            ]),

            // Hna les events (li homa aslan announcements)
            'events' => $events->map(fn($e) => [
                'id'    => $e->id,
                'title' => $e->title,
                'date'  => $e->created_at->format('d M'), // Aw yqder t-kon 3andek date_event khassa
                'time'  => $e->created_at->format('H:i'),
                'type'  => 'event'
            ]),
        ]);
    }
    // f DashboardController.php
    public function parentDashboard($user)
    {
        // 1. Njibo l-profil m3a l-wled (Children)
        $parent = $user->parentProfile()->with(['children.user', 'children.school_classes'])->first();

        if (!$parent) {
            return response()->json(['children' => [], 'stats' => []], 200);
        }

        // 2. Darouri t-returni l-data f west l-map bach React y-lqaha
        $childrenData = $parent->children->map(function ($student) {
            return [
                'id'        => $student->id,
                'name'      => $student->user->name ?? 'Élève',
                'level'     => $student->level ?? 'N/A',
                'transport' => $student->transport ?? '--',
                'class'     => $student->school_classes->name ?? 'N/A',
                'avatar'    => null, // React ghadi y-khdem b placeholder mitalan
            ];
        });

        // 3. Response JSON nqiya
        return response()->json([
            'welcome_message' => "Bonjour, " . $user->name,
            'children'        => $childrenData, // Hada houwa li kaye-mapih React
            'stats'           => [
                ['title' => 'Enfants', 'value' => $childrenData->count()],
                ['title' => 'Absences', 'value' => Absence::whereIn('student_id', $parent->children->pluck('id'))->count()],
                ['title' => 'Paiements regles', 'value' => Payment::whereIn('student_id', $parent->children->pluck('id'))->where('status', 'paid')->count()],
            ]
        ]);
    }

    // --- HELPER METHODS (Li kano naqsin o daro erreur) ---

    private function resolvePeriodRange($period)
    {
        $end = Carbon::now();
        $start = Carbon::now();

        switch ($period) {
            case 'week':
                $start->startOfWeek();
                break;
            case 'month':
                $start->startOfMonth();
                break;
            case 'year':
                $start->startOfYear();
                break;
            default:
                $start->startOfMonth();
        }

        $diff = $start->diffInDays($end);
        $pEnd = (clone $start)->subDay();
        $pStart = (clone $pEnd)->subDays($diff);

        return [$start, $end, $pStart, $pEnd];
    }

    private function statBox($title, $value, $curr, $prev, $icon, $inverse = false)
    {
        $change = $prev > 0 ? (($curr - $prev) / $prev) * 100 : 0;
        return [
            'title' => $title,
            'value' => $value,
            'change' => round($change, 1) . '%',
            'isPositive' => $inverse ? $curr <= $prev : $curr >= $prev,
            'icon' => $icon
        ];
    }

    public function getRecentActivities()
    {
        $students = Student::with('user')->latest()->take(3)->get()->map(fn($s) => [
            'message' => "Nouvel élève : {$s->user->name}",
            'time' => $s->created_at->diffForHumans(),
            'icon' => 'UserPlus',
            'created_at' => $s->created_at
        ]);

        return $students;
    }
}
