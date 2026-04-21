<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * ✅ GET PROFILE DATA
     * Récupère les infos pour ton formulaire React.
     */
    public function edit(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * ✅ UPDATE PROFILE
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        // Si l'email change, on réinitialise la vérification
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
            'user' => $user->fresh(), // On renvoie les données fraîches
        ]);
    }

    /**
     * ✅ DELETE ACCOUNT
     */
    public function destroy(Request $request): JsonResponse
    {
        // On exige le mot de passe pour cette action critique
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Déconnexion manuelle avant suppression
        Auth::guard('web')->logout();

        $user->delete();

        // Nettoyage de la session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Compte supprimé avec succès.'
        ]);
    }
}