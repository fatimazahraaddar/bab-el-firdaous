<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GuardianController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json(Guardian::with(['user', 'children.user'])->get());
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            return response()->json($guardian ? $guardian->load(['user', 'children.user']) : []);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id|unique:parents,user_id',
            'phone' => 'nullable|string',
        ]);

        $guardian = Guardian::create($request->all());

        return response()->json($guardian, 201);
    }

    public function show(Guardian $parent)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json($parent->load(['user', 'children.user']));
        }

        if ($user->role === 'parent' && $user->parentProfile && $user->parentProfile->id === $parent->id) {
            return response()->json($parent->load(['user', 'children.user']));
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function update(Request $request, Guardian $parent)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'phone' => 'nullable|string',
        ]);

        $parent->update($request->all());

        return response()->json($parent);
    }

    public function destroy(Guardian $parent)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $parent->delete();

        return response()->json(['message' => 'Parent deleted']);
    }

    public function children(Guardian $parent)
    {
        $user = Auth::user();

        if ($user->role !== 'admin' && (! $user->parentProfile || $user->parentProfile->id !== $parent->id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($parent->children()->with('user')->get());
    }
}
