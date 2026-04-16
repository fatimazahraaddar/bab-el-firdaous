<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json(Student::with(['user', 'parent.user'])->get());
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            return response()->json($guardian ? $guardian->children()->with('user')->get() : []);
        }

        if ($user->role === 'student') {
            $student = $user->studentProfile;
            return response()->json($student ? $student->load(['user', 'parent.user']) : []);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id|unique:students,user_id',
            'class' => 'nullable|string',
            'parent_id' => 'nullable|exists:parents,id',
            'transport_type' => 'required|in:bus,pedestrian',
            'bus_number' => 'nullable|string',
        ]);

        $student = Student::create($request->all());

        return response()->json($student, 201);
    }

    public function show(Student $student)
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json($student->load(['user', 'parent.user']));
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            if ($guardian && $guardian->children->contains($student->id)) {
                return response()->json($student->load(['user', 'parent.user']));
            }
        }

        if ($user->role === 'student' && $user->studentProfile && $user->studentProfile->id === $student->id) {
            return response()->json($student->load(['user', 'parent.user']));
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function update(Request $request, Student $student)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'class' => 'nullable|string',
            'parent_id' => 'nullable|exists:parents,id',
            'transport_type' => 'nullable|in:bus,pedestrian',
            'bus_number' => 'nullable|string',
        ]);

        $student->update($request->all());

        return response()->json($student);
    }

    public function destroy(Student $student)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted']);
    }
}
