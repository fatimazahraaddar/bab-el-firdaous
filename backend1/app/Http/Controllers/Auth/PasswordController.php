<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\JsonResponse;

class PasswordController extends Controller
{
    /**
     * ✅ METTRE À JOUR LE MOT DE PASSE (API)
     */
    public function update(Request $request): JsonResponse
    {
        // 1. Validation rigoureuse
        // 'current_password' vérifie automatiquement si la saisie correspond au MDP en DB
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ], [
            'current_password.current_password' => 'Le mot de passe actuel est incorrect.',
        ]);

        // 2. Mise à jour de l'utilisateur authentifié
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        // 3. Réponse JSON pour le frontend
        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès.',
            'status' => 'success'
        ]);
    }
}