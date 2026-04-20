<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsenceController extends Controller
{
    // ✅ LISTE
    public function index(Request $request)
    {
        $user = Auth::user();
        $studentId = $request->integer('student_id');

        // 🔥 ADMIN
        if ($user->role === 'admin') {
            $query = Absence::with('student.user')->latest();
            if ($studentId) {
                $query->where('student_id', $studentId);
            }

            return response()->json(
                $query->get()
            );
        }

        // 🔥 PARENT
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if (!$parent) {
                return response()->json([]);
            }

            $studentIds = $parent->children()->pluck('id');
            $query = Absence::whereIn('student_id', $studentIds)
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
            'date' => 'required|date',
            'subject' => 'nullable|string',
            'justified' => 'boolean',
            'reason' => 'nullable|string'
        ]);

        $absence = Absence::create($validated);

        return response()->json($absence, 201);
    }

    // ✅ SHOW
    public function show(Absence $absence)
    {
        $user = Auth::user();

        // 🔥 ADMIN
        if ($user->role === 'admin') {
            return response()->json(
                $absence->load('student.user')
            );
        }

        // 🔥 PARENT
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if ($parent && $parent->children->contains('id', $absence->student_id)) {
                return response()->json($absence);
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ UPDATE
    public function update(Request $request, Absence $absence)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'date' => 'nullable|date',
            'subject' => 'nullable|string',
            'justified' => 'boolean',
            'reason' => 'nullable|string'
        ]);

        $absence->update($validated);

        return response()->json($absence);
    }

    // ✅ DELETE
    public function destroy(Absence $absence)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $absence->delete();

        return response()->json(['message' => 'Absence deleted']);
    }
}
