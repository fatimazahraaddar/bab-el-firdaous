<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignmentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'student') {
            // Students see assignments for their class
            // Assuming class is stored in user, but for now, return all
            $assignments = Assignment::all();
        } elseif ($user->role === 'teacher') {
            $assignments = Assignment::where('teacher_id', $user->id)->get();
        } else {
            $assignments = Assignment::all();
        }

        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'subject' => 'required|string',
            'class' => 'required|string',
        ]);

        $assignment = Assignment::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'teacher_id' => Auth::id(),
            'subject' => $request->subject,
            'class' => $request->class,
        ]);

        return response()->json($assignment, 201);
    }

    public function show(Assignment $assignment)
    {
        return response()->json($assignment);
    }

    public function update(Request $request, Assignment $assignment)
    {
        if ($assignment->teacher_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'subject' => 'required|string',
            'class' => 'required|string',
        ]);

        $assignment->update($request->all());

        return response()->json($assignment);
    }

    public function destroy(Assignment $assignment)
    {
        if ($assignment->teacher_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted']);
    }
}