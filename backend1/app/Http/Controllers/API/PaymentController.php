<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'student') {
            $payments = Payment::where('student_id', $user->id)->get();
        } elseif ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            $payments = $guardian ? Payment::whereIn('student_id', $guardian->children()->pluck('user_id'))->get() : collect();
        } else {
            $payments = Payment::all();
        }

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'student_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|in:paid,unpaid',
            'due_date' => 'required|date',
        ]);

        $payment = Payment::create($request->all());

        return response()->json($payment, 201);
    }

    public function show(Payment $payment)
    {
        return response()->json($payment);
    }

    public function update(Request $request, Payment $payment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:paid,unpaid',
            'paid_date' => 'nullable|date',
        ]);

        $payment->update($request->all());

        return response()->json($payment);
    }

    public function destroy(Payment $payment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment deleted']);
    }
}