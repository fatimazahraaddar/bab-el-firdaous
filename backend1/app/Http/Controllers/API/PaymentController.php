<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    /**
     * ✅ LISTE (Avec Pagination & Filtrage)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $studentId = $request->integer('student_id');

        $query = Payment::with('student.user')->latest();

        if ($user->role === 'admin') {
            if ($studentId) {
                $query->where('student_id', $studentId);
            }
        } elseif ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (!$parent) return response()->json(['data' => []]);

            $studentIds = $parent->children()->pluck('students.id');
            $query->whereIn('student_id', $studentIds);

            if ($studentId) {
                if (!$studentIds->contains($studentId)) {
                    return response()->json(['message' => 'Accès refusé pour cet élève'], 403);
                }
                $query->where('student_id', $studentId);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($query->paginate(15));
    }

    /**
     * ✅ CREATE (Admin Only)
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'student_id'  => 'required|exists:students,id',
            'description' => 'required|string|max:255',
            'amount'      => 'required|numeric|min:0',
            'due_date'    => 'required|date',
            'paid_date'   => 'nullable|date',
            'status'      => 'nullable|in:paid,unpaid',
        ]);

        // Logique auto : si on crée en 'paid', on met la date du jour par défaut
        if (($validated['status'] ?? 'unpaid') === 'paid' && empty($validated['paid_date'])) {
            $validated['paid_date'] = now()->toDateString();
        }

        $payment = Payment::create($validated);

        return response()->json($payment->load('student.user'), 201);
    }

    /**
     * ✅ SHOW
     */
    public function show(Payment $payment): JsonResponse
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json($payment->load('student.user'));
        }

        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            // Vérification SQL directe
            $isOwnChild = $parent->children()->where('students.id', $payment->student_id)->exists();

            if ($isOwnChild) {
                return response()->json($payment->load('student.user'));
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Payment $payment): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'description' => 'sometimes|string|max:255',
            'amount'      => 'sometimes|numeric|min:0',
            'due_date'    => 'sometimes|date',
            'paid_date'   => 'nullable|date',
            'status'      => 'sometimes|in:paid,unpaid',
        ]);

        $payment->update($validated);

        return response()->json($payment->load('student.user'));
    }

    /**
     * ✅ TOGGLE STATUS (Pratique pour le Dashboard)
     */
    public function toggle($id): JsonResponse
    {
        $payment = Payment::findOrFail($id); // جلب السجل يدوياً بـ ID

        $payment->status = ($payment->status === 'paid') ? 'unpaid' : 'paid';
        $payment->paid_date = ($payment->status === 'paid') ? now() : null;
        $payment->save();

        return response()->json($payment->load('student.user'));
    }
    /**
     * ✅ DELETE
     */
    public function destroy(Payment $payment): JsonResponse
    {
        $this->authorize('admin-only');
        $payment->delete();

        return response()->json(['message' => 'Paiement supprimé']);
    }
}
