<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class GuardianController extends Controller
{
    // ✅ LISTE DES PARENTS
    public function index()
    {
        return response()->json(Guardian::all());
    }

    // ✅ CRÉER UN PARENT
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|max:20',
            'job' => 'nullable|string|max:255',
        ]);

        // 🔐 créer user (login)
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'parent'
        ]);

        // 👨‍👩‍👧 créer guardian
        $guardian = Guardian::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'job' => $validated['job'] ?? null
        ]);

        return response()->json([
            'message' => 'Parent créé avec succès',
            'guardian' => $guardian
        ], 201);
    }

    // ✅ AFFICHER UN PARENT
    public function show($id)
    {
        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['message' => 'Parent non trouvé'], 404);
        }

        return response()->json($guardian);
    }

    // ✅ METTRE À JOUR
    public function update(Request $request, $id)
    {
        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['message' => 'Parent non trouvé'], 404);
        }

        $guardian->update($request->all());

        return response()->json([
            'message' => 'Parent mis à jour',
            'guardian' => $guardian
        ]);
    }

    // ✅ SUPPRIMER
    public function destroy($id)
    {
        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['message' => 'Parent non trouvé'], 404);
        }

        $guardian->delete();

        return response()->json([
            'message' => 'Parent supprimé'
        ]);
    }
}