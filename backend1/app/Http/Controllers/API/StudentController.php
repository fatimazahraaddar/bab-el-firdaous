<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    // ✅ LISTE
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Student::with(['user', 'guardian', 'schoolClass', 'bus'])
            ->withCount(['absences', 'payments']);

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('level')) {
            $query->where('level', $request->string('level')->toString());
        }

        if ($request->filled('transport')) {
            $query->where('transport', $request->string('transport')->toString());
        }

        if ($user->role === 'admin') {
            return response()->json($query->latest()->get());
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;

            return response()->json(
                $guardian
                    ? (clone $query)->where('guardian_id', $guardian->id)->latest()->get()
                    : []
            );
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ CREATE
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'level' => 'required|string|max:255',
            'class_id' => 'required|exists:school_classes,id',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'transport' => 'nullable|in:pieton,bus',
            'bus_id' => 'nullable|exists:buses,id',
            'parent_name' => 'required|string|max:255',
            'parent_email' => 'required|email|unique:users,email',
            'parent_phone' => 'required|string|max:255',
        ]);

        $parentPassword = Str::random(8);

        $parentUser = User::create([
            'name' => $validated['parent_name'],
            'email' => $validated['parent_email'],
            'password' => Hash::make($parentPassword),
            'role' => 'parent',
        ]);

        $guardian = Guardian::create([
            'user_id' => $parentUser->id,
            'name' => $validated['parent_name'],
            'email' => $validated['parent_email'],
            'phone' => $validated['parent_phone'],
        ]);

        $studentUser = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'student',
        ]);

        $student = Student::create([
            'user_id' => $studentUser->id,
            'level' => $validated['level'],
            'class_id' => $validated['class_id'],
            'guardian_id' => $guardian->id,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'transport' => $validated['transport'] ?? 'pieton',
            'bus_id' => $validated['bus_id'] ?? null,
        ]);

        return response()->json([
            'message' => 'Élève + parent créés avec succès',
            'parent_login' => [
                'email' => $parentUser->email,
                'password' => $parentPassword,
            ],
            'student' => $student->load(['user', 'guardian', 'schoolClass', 'bus']),
        ], 201);
    }

    // ✅ SHOW
    public function show(Student $student)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json(
                $student->load(['user', 'guardian', 'schoolClass', 'bus', 'absences', 'payments'])
            );
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;

            if ($guardian && $guardian->children->contains($student->id)) {
                return response()->json(
                    $student->load(['user', 'guardian', 'schoolClass', 'bus', 'absences', 'payments'])
                );
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ UPDATE
    public function update(Request $request, Student $student)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'level' => 'nullable|string|max:255',
            'class_id' => 'nullable|exists:school_classes,id',
            'guardian_id' => 'nullable|exists:parents,id',
            'bus_id' => 'nullable|exists:buses,id',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'transport' => 'nullable|in:pieton,bus',
        ]);

        $student->update($validated);

        return response()->json(
            $student->load(['user', 'schoolClass', 'guardian', 'bus'])
        );
    }

    // ✅ DELETE
    public function destroy(Student $student)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($student->user) {
            $student->user->delete();
        }

        $student->delete();

        return response()->json([
            'message' => 'Student deleted',
        ]);
    }
}

