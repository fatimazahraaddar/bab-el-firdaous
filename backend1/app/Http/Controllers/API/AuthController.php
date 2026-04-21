<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * ✅ LOGIN (Basé sur les Cookies de Session)
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Tentative de connexion via le Guard Web (Session)
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        $user = Auth::user();

        // Filtre de sécurité pour les rôles autorisés sur cette interface
        if (!in_array($user->role, ['admin', 'parent'])) {
            Auth::logout();
            return response()->json([
                'message' => 'Accès non autorisé'
            ], 403);
        }

        // Regénérer la session pour éviter la fixation de session
        $request->session()->regenerate();

        return response()->json([
            'user' => $user,
            'message' => 'Connexion réussie'
        ]);
    }

    /**
     * ✅ REGISTER
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $role = 'parent';
        // Seul un admin authentifié peut créer un autre admin
        if (Auth::check() && Auth::user()->role === 'admin' && $request->filled('role')) {
            $role = in_array($request->role, ['admin', 'parent']) ? $request->role : 'parent';
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $role,
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'Utilisateur créé avec succès'
        ], 201);
    }

    /**
     * ✅ LOGOUT
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    /**
     * ✅ GET USER (Optimisé)
     */
    public function user(Request $request): JsonResponse
    {
        // On charge les relations nécessaires en une seule fois (Eager Loading)
        $user = $request->user()->load('parentProfile.children.user');

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'children' => $user->parentProfile 
                ? $user->parentProfile->children->map(fn($child) => [
                    'id' => $child->id,
                    'name' => $child->user->name ?? 'Élève',
                ]) 
                : [],
        ]);
    }

    // ... tes méthodes updateProfile et changePassword restent valides
}