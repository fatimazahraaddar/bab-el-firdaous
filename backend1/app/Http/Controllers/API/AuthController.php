<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guardian;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ✅ LOGIN (TOKEN)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // ❌ mauvais credentials
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // ❌ rôle non autorisé
        if (!in_array($user->role, ['admin', 'parent'])) {
            return response()->json([
                'message' => 'Accès non autorisé'
            ], 403);
        }

        // 🔥 supprimer anciens tokens
        $user->tokens()->delete();

        // 🔥 créer token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // ✅ REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            // 'phone' => 'nullable|string', // Zidha ila kanti kat-siftha f l-formulaire
        ]);

        // Kandiro Transaction bach ila t-creera user o t-bloca l-guardian, may-wellich 3andna user "m-ytim"
        return DB::transaction(function () use ($request) {

            // 1. Creation dyal l-User Account
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'parent',
            ]);

            // 2. Creation dyal l-Profil f table Guardians (HADA HUWA L-FIX)
            Guardian::create([
                'user_id' => $user->id,
                'name'    => $user->name,
                'email'   => $user->email,
                'phone'   => $request->phone ?? null,
            ]);

            return response()->json([
                'message' => 'Parent registered successfully',
                'user' => $user->load('parentProfile') // Ila kanti dayr relation
            ], 201);
        });
    }
    // ✅ LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Déconnecté'
        ]);
    }

    // ✅ USER
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
