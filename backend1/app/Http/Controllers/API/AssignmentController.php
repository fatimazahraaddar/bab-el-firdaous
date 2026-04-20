<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignmentController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Assignment::with('class')->latest('due_date');

        if ($user->role === 'admin') {
            if ($request->filled('student_id')) {
                $student = Student::find($request->integer('student_id'));
                if ($student) {
                    $query->where('class_id', $student->class_id);
                }
            }

            return response()->json($query->get());
        }

        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (! $parent) {
                return response()->json([]);
            }

            $children = $parent->children()->get(['id', 'class_id']);
            $classIds = $children->pluck('class_id')->filter()->unique()->values();

            $query->whereIn('class_id', $classIds);

            if ($request->filled('student_id')) {
                $studentId = $request->integer('student_id');
                $child = $children->firstWhere('id', $studentId);

                if (! $child) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }

                $query->where('class_id', $child->class_id);
            }

            return response()->json($query->get());
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subject' => 'required|string|max:255',
            'due_date' => 'required|date',
            'class_id' => 'required|exists:school_classes,id',
            'status' => 'nullable|in:pending,done',
        ]);

        $assignment = Assignment::create($validated);

        return response()->json($assignment->load('class'), 201);
    }

    public function show(Assignment $assignment)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json($assignment->load('class'));
        }

        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (! $parent) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $classIds = $parent->children()->pluck('class_id');
            if ($classIds->contains($assignment->class_id)) {
                return response()->json($assignment->load('class'));
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function update(Request $request, Assignment $assignment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'subject' => 'sometimes|string|max:255',
            'due_date' => 'sometimes|date',
            'class_id' => 'sometimes|exists:school_classes,id',
            'status' => 'sometimes|in:pending,done',
        ]);

        $assignment->update($validated);

        return response()->json($assignment->load('class'));
    }

    public function destroy(Assignment $assignment)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted']);
    }
}

