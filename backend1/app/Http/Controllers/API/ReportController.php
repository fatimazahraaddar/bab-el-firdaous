<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    // 📊 RAPPORT GLOBAL
    public function show(Request $request)
    {
        $user = Auth::user();

        $month = $request->month;
        $year = $request->year;

        $paymentsQuery = Payment::with('student.user');

        // 🔥 filtre date
        if ($month && $year) {
            $paymentsQuery->whereMonth('date', $month)
                          ->whereYear('date', $year);
        }

        // 🔥 ADMIN
        if ($user->role === 'admin') {
            $payments = $paymentsQuery->get();
        }

        // 🔥 PARENT
        elseif ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if (!$parent) {
                return response()->json([]);
            }

            $studentIds = $parent->children()->pluck('id');

            $payments = $paymentsQuery
                ->whereIn('student_id', $studentIds)
                ->get();
        }

        else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([

            // 📊 GLOBAL STATS
            'stats' => [
                'students' => Student::count(),
                'buses' => Bus::count(),
            ],

            // 📊 SUMMARY
            'summary' => [
                'type' => 'Paiements',
                'period' => $month && $year ? "$month/$year" : 'Global',
                'totalPaid' => $payments->where('status', 'paid')->sum('amount'),
                'totalUnpaid' => $payments->where('status', 'unpaid')->sum('amount'),
                'total' => $payments->sum('amount')
            ],

            // 📋 DETAILS
            'payments' => $payments->map(function ($p) {
                return [
                    'id' => $p->id,
                    'student' => $p->student->user->name ?? '',
                    'amount' => $p->amount,
                    'date' => $p->date,
                    'status' => $p->status
                ];
            })
        ]);
    }

    // 📄 EXPORT PDF
    public function pdf(Request $request)
    {
        $user = Auth::user();

        $paymentsQuery = Payment::with('student.user');

        // 🔥 filtre parent
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if ($parent) {
                $paymentsQuery->whereIn(
                    'student_id',
                    $parent->children()->pluck('id')
                );
            }
        }

        $payments = $paymentsQuery->get();

        $pdf = \PDF::loadView('reports.payments', [
            'payments' => $payments,
            'totalPaid' => $payments->where('status', 'paid')->sum('amount'),
            'totalUnpaid' => $payments->where('status', 'unpaid')->sum('amount'),
        ]);

        return $pdf->download('report.pdf');
    }
}