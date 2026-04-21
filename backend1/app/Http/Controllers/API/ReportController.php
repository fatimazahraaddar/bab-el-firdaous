<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\{Payment, Student, Bus};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Barryvdh\DomPDF\Facade\Pdf; // Assure-toi d'avoir installé barryvdh/laravel-dompdf

class ReportController extends Controller
{
    /**
     * ✅ RAPPORT GLOBAL (JSON)
     */
    public function show(Request $request): JsonResponse
    {
        $user = Auth::user();
        $month = $request->query('month');
        $year = $request->query('year');

        // On initialise la requête
        $query = Payment::with('student.user');

        // Filtrage par Date (on vérifie sur due_date ou paid_date selon ton besoin métier)
        if ($month && $year) {
            $query->whereYear('due_date', $year)
                  ->whereMonth('due_date', $month);
        }

        // Sécurité des Rôles
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (!$parent) return response()->json(['message' => 'Profil parent introuvable'], 404);
            
            $studentIds = $parent->children()->pluck('students.id');
            $query->whereIn('student_id', $studentIds);
        } elseif ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Exécution de la requête
        $payments = $query->get();

        return response()->json([
            'stats' => [
                'students_total' => Student::count(),
                'buses_total'    => Bus::count(),
            ],
            'summary' => [
                'period'       => $month && $year ? "$month/$year" : 'Global',
                'count'        => $payments->count(),
                'total_paid'   => $payments->where('status', 'paid')->sum('amount'),
                'total_unpaid' => $payments->where('status', 'unpaid')->sum('amount'),
                'total_amount' => $payments->sum('amount'),
            ],
            'payments' => $payments->map(fn($p) => [
                'id'          => $p->id,
                'student'     => $p->student->user->name ?? 'Inconnu',
                'amount'      => $p->amount,
                'description' => $p->description,
                'due_date'    => $p->due_date,
                'status'      => $p->status
            ])
        ]);
    }

    /**
     * 📄 EXPORT PDF
     */
    public function pdf(Request $request)
    {
        $user = Auth::user();
        
        // On réutilise la même logique de filtrage
        $query = Payment::with(['student.user', 'student.class']);

        if ($user->role === 'parent') {
            $studentIds = $user->parentProfile->children()->pluck('students.id');
            $query->whereIn('student_id', $studentIds);
        }

        $payments = $query->get();

        $data = [
            'title'        => 'Rapport de Paiements - ' . now()->format('d/m/Y'),
            'payments'     => $payments,
            'totalPaid'    => $payments->where('status', 'paid')->sum('amount'),
            'totalUnpaid'  => $payments->where('status', 'unpaid')->sum('amount'),
            'generated_by' => $user->name,
        ];

        $pdf = Pdf::loadView('reports.payments', $data);

        // On définit le format paysage si beaucoup de colonnes
        $pdf->setPaper('a4', 'portrait');

        return $pdf->download('rapport_paiements_' . now()->format('d_m_Y') . '.pdf');
    }
}