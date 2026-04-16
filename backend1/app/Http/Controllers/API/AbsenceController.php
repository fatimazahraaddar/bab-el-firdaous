<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsenceController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json(Absence::with('student.user')->get());
        }

        if ($user->role === 'student') {
            $student = $user->studentProfile;
            return response()->json($student ? $student->absences()->get() : []);
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            if (! $guardian) {
                return response()->json([]);
            }
            $absences = Absence::whereIn('student_id', $guardian->children()->pluck('id'))->with('student.user')->get();
            return response()->json($absences);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        if (! in_array(Auth::user()->role, ['admin', 'teacher'], true)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'student_id' => 'required|exists:students,id',
            'date' => 'required|date',
            'status' => 'required|in:present,absent',
        ]);

        $absence = Absence::create($request->all());

        return response()->json($absence, 201);
    }

    public function show(Absence $absence)
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json($absence->load('student.user'));
        }

        if ($user->role === 'student' && $user->studentProfile && $user->studentProfile->id === $absence->student_id) {
            return response()->json($absence);
        }

        if ($user->role === 'parent' && $user->parentProfile && $user->parentProfile->children->contains($absence->student_id)) {
            return response()->json($absence);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function update(Request $request, Absence $absence)
    {
        if (! in_array(Auth::user()->role, ['admin', 'teacher'], true)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'date' => 'nullable|date',
            'status' => 'nullable|in:present,absent',
        ]);

        $absence->update($request->all());

        return response()->json($absence);
    }

    public function destroy(Absence $absence)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $absence->delete();

        return response()->json(['message' => 'Absence deleted']);
    }
}
