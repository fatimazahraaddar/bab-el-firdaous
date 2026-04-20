<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    // ✅ LISTE
    public function index(Request $request)
    {
        $user = Auth::user();
        $studentId = $request->integer('student_id');

        // 🔥 ADMIN → tous les paiements
        if ($user->role === 'admin') {
            $query = Payment::with('student.user')->latest();
            if ($studentId) {
                $query->where('student_id', $studentId);
            }

            return response()->json(
                $query->get()
            );
        }

        // 🔥 PARENT → paiements de ses enfants
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if (!$parent) {
                return response()->json([]);
            }

            $studentIds = $parent->children()->pluck('id');
            $query = Payment::whereIn('student_id', $studentIds)
                ->with('student.user')
                ->latest();

            if ($studentId) {
                if (! $studentIds->contains($studentId)) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }

                $query->where('student_id', $studentId);
            }

            return response()->json($query->get());
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ CREATE (ADMIN ONLY)
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'paid_date' => 'nullable|date',
            'status' => 'nullable|in:paid,unpaid',
        ]);

        $payment = Payment::create([
            'student_id' => $validated['student_id'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'due_date' => $validated['due_date'],
            'paid_date' => $validated['paid_date'] ?? null,
            'status' => $validated['status'] ?? 'unpaid'
        ]);

        return response()->json(
            $payment->load('student.user'),
            201
        );
    }

    // ✅ SHOW
    public function show(Payment $payment)
    {
        $user = Auth::user();

        // 🔥 ADMIN → accès total
        if ($user->role === 'admin') {
            return response()->json(
                $payment->load('student.user')
            );
        }

        // 🔥 PARENT → seulement ses enfants
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if ($parent && $parent->children->contains('id', $payment->student_id)) {
                return response()->json(
                    $payment->load('student.user')
                );
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ UPDATE STATUS (ADMIN ONLY)
    public function update(Request $request, Payment $payment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'description' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric|min:0',
            'due_date' => 'sometimes|date',
            'paid_date' => 'nullable|date',
            'status' => 'sometimes|in:paid,unpaid',
        ]);

        $payment->update($validated);

        return response()->json(
            $payment->load('student.user')
        );
    }

    // ✅ DELETE (ADMIN ONLY)
    public function destroy(Payment $payment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment->delete();

        return response()->json([
            'message' => 'Paiement supprimé'
        ]);
    }

    // 🔥 TOGGLE STATUS (ADMIN ONLY)
    public function toggle($id)
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment = Payment::findOrFail($id);

        $payment->status = $payment->status === 'paid' ? 'unpaid' : 'paid';
        $payment->save();

        return response()->json(
            $payment->load('student.user')
        );
    }
}
