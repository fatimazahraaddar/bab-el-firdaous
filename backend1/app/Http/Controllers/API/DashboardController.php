<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

// ✅ MODELS
use App\Models\Announcement;
use App\Models\Student;
use App\Models\Absence;
use App\Models\ClassModel;
use App\Models\Payment;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        [$startDate, $endDate, $previousStartDate, $previousEndDate] = $this->resolvePeriodRange(
            $request->query('period', 'month')
        );

        // ================= ADMIN =================
        if ($user->role === 'admin') {
            $studentsTotal = Student::count();

            $studentsCurrent = Student::whereBetween('created_at', [$startDate, $endDate])->count();
            $studentsPrevious = Student::whereBetween('created_at', [$previousStartDate, $previousEndDate])->count();

            $absencesCurrent = Absence::whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])->count();
            $absencesPrevious = Absence::whereBetween('date', [$previousStartDate->toDateString(), $previousEndDate->toDateString()])->count();

            $paymentsCurrent = Payment::where('status', 'paid')
                ->whereBetween('paid_date', [$startDate->toDateString(), $endDate->toDateString()])
                ->count();
            $paymentsPrevious = Payment::where('status', 'paid')
                ->whereBetween('paid_date', [$previousStartDate->toDateString(), $previousEndDate->toDateString()])
                ->count();

            $recentStudents = Student::with('user')
                ->latest()
                ->take(3)
                ->get()
                ->map(function ($student) {
                    return [
                        'message' => 'Nouvel eleve ajoute: ' . ($student->user->name ?? 'Inconnu'),
                        'time' => $student->created_at?->diffForHumans(),
                        'icon' => 'CheckCircle',
                        'created_at' => $student->created_at,
                    ];
                });

            $recentAbsences = Absence::with('student.user')
                ->latest('date')
                ->take(3)
                ->get()
                ->map(function ($absence) {
                    return [
                        'message' => 'Absence enregistree: ' . ($absence->student->user->name ?? 'Inconnu'),
                        'time' => optional($absence->date)->diffForHumans(),
                        'icon' => 'AlertCircle',
                        'created_at' => $absence->created_at ?? $absence->date,
                    ];
                });

            $recentPayments = Payment::with('student.user')
                ->latest()
                ->take(3)
                ->get()
                ->map(function ($payment) {
                    return [
                        'message' => ($payment->status === 'paid' ? 'Paiement recu: ' : 'Paiement en attente: ')
                            . ($payment->student->user->name ?? 'Inconnu'),
                        'time' => $payment->created_at?->diffForHumans(),
                        'icon' => $payment->status === 'paid' ? 'DollarSign' : 'Calendar',
                        'created_at' => $payment->created_at,
                    ];
                });

            $activities = $recentStudents
                ->concat($recentAbsences)
                ->concat($recentPayments)
                ->sortByDesc('created_at')
                ->take(6)
                ->values()
                ->map(function ($activity) {
                    unset($activity['created_at']);
                    return $activity;
                });

            $classes = ClassModel::withCount('students')
                ->get()
                ->map(function ($class) {
                    $studentIds = Student::where('class_id', $class->id)->pluck('id');
                    $absentStudentsCount = $studentIds->isEmpty()
                        ? 0
                        : Absence::whereIn('student_id', $studentIds)->distinct('student_id')->count('student_id');

                    $attendanceRate = $class->students_count > 0
                        ? round((($class->students_count - $absentStudentsCount) / $class->students_count) * 100)
                        : 0;

                    $attendanceRate = max(0, min(100, $attendanceRate));

                    return [
                        'name' => $class->name,
                        'students' => $class->students_count,
                        'performance' => $attendanceRate,
                        'avg' => round($attendanceRate / 5, 1),
                    ];
                });

            $announcements = Announcement::latest()
                ->take(5)
                ->get(['id', 'title', 'created_at']);

            $events = Announcement::whereNotNull('start_date')
                ->whereDate('start_date', '>=', now()->toDateString())
                ->orderBy('start_date')
                ->take(4)
                ->get()
                ->map(function ($announcement) {
                    return [
                        'title' => $announcement->title,
                        'date' => optional($announcement->start_date)->format('Y-m-d'),
                        'time' => optional($announcement->start_date)->format('H:i'),
                    ];
                });

            if ($events->isEmpty()) {
                $events = Payment::where('status', 'unpaid')
                    ->whereDate('due_date', '>=', now()->toDateString())
                    ->orderBy('due_date')
                    ->take(4)
                    ->get()
                    ->map(function ($payment) {
                        return [
                            'title' => 'Echeance paiement: ' . $payment->description,
                            'date' => optional($payment->due_date)->format('Y-m-d'),
                            'time' => '--:--',
                        ];
                    });
            }

            return response()->json([

                'stats' => [
                    [
                        'title' => 'Eleves',
                        'value' => $studentsTotal,
                        'change' => $this->formatChange($studentsCurrent, $studentsPrevious),
                        'isPositive' => $studentsCurrent >= $studentsPrevious,
                        'icon' => 'Users',
                    ],
                    [
                        'title' => 'Absences (' . $this->periodLabel($request->query('period', 'month')) . ')',
                        'value' => $absencesCurrent,
                        'change' => $this->formatChange($absencesCurrent, $absencesPrevious),
                        'isPositive' => $absencesCurrent <= $absencesPrevious,
                        'icon' => 'AlertCircle',
                    ],
                    [
                        'title' => 'Paiements (payes)',
                        'value' => $paymentsCurrent,
                        'change' => $this->formatChange($paymentsCurrent, $paymentsPrevious),
                        'isPositive' => $paymentsCurrent >= $paymentsPrevious,
                        'icon' => 'DollarSign',
                    ],
                ],
                'activities' => $activities,
                'classes' => $classes,
                'events' => $events,
                'announcements' => $announcements,
            ]);
        }

        // ================= PARENT =================
        if ($user->role === 'parent') {

            $parent = $user->parentProfile;

            if (!$parent) {
                return response()->json([]);
            }

            $students = $parent->children()->with(['user', 'class'])->get();
            $studentIds = $students->pluck('id');

            $absencesCount = Absence::whereIn('student_id', $studentIds)->count();
            $paidPaymentsCount = Payment::whereIn('student_id', $studentIds)->where('status', 'paid')->count();

            return response()->json([

                'children' => $students->map(function ($child) {
                    $childAbsencesCount = $child->absences()->count();
                    $attendanceRate = max(0, 100 - ($childAbsencesCount * 5));

                    return [
                        'id' => $child->id,
                        'name' => $child->user->name ?? '',
                        'class' => $child->class?->name ?? '',
                        'average' => round($attendanceRate / 5, 1),
                        'absences' => $childAbsencesCount,
                        'level' => $child->level,
                        'transport' => $child->transport,
                    ];
                }),
                'stats' => [
                    [
                        'title' => 'Enfants',
                        'value' => $students->count(),
                    ],
                    [
                        'title' => 'Absences',
                        'value' => $absencesCount,
                    ],
                    [
                        'title' => 'Paiements regles',
                        'value' => $paidPaymentsCount,
                    ],
                ],
            ]);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 403);
    }

    private function resolvePeriodRange(string $period): array
    {
        $now = Carbon::now();

        if ($period === 'week') {
            $start = $now->copy()->startOfWeek();
            $end = $now->copy()->endOfWeek();
        } elseif ($period === 'year') {
            $start = $now->copy()->startOfYear();
            $end = $now->copy()->endOfYear();
        } else {
            $start = $now->copy()->startOfMonth();
            $end = $now->copy()->endOfMonth();
        }

        $duration = $start->diffInSeconds($end) + 1;
        $previousEnd = $start->copy()->subSecond();
        $previousStart = $previousEnd->copy()->subSeconds($duration - 1);

        return [$start, $end, $previousStart, $previousEnd];
    }

    private function formatChange(int $current, int $previous): string
    {
        if ($previous === 0) {
            return $current === 0 ? '0%' : '+100%';
        }

        $percent = round((($current - $previous) / $previous) * 100);
        return ($percent >= 0 ? '+' : '') . $percent . '%';
    }

    private function periodLabel(string $period): string
    {
        if ($period === 'week') {
            return 'Semaine';
        }
        if ($period === 'year') {
            return 'Annee';
        }
        return 'Mois';
    }
}
