<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json(Teacher::with('user')->get());
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id|unique:teachers,user_id',
            'subject' => 'nullable|string',
        ]);

        $teacher = Teacher::create($request->all());

        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'teacher') {
            return response()->json($teacher->load('user'));
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function update(Request $request, Teacher $teacher)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'subject' => 'nullable|string',
        ]);

        $teacher->update($request->all());

        return response()->json($teacher);
    }

    public function destroy(Teacher $teacher)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted']);
    }
}
