<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class ConfirmablePasswordController extends Controller
{
    /**
     * ✅ CONFIRMER LE MOT DE PASSE (API)
     * Cette méthode remplace le store() pour une API.
     */
    public function store(Request $request): JsonResponse
    {
        // Validation basique du champ
        $request->validate([
            'password' => 'required|string',
        ]);

        // Vérification du mot de passe avec le guard web
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => ['Le mot de passe fourni est incorrect.'],
            ]);
        }

        // On stocke la confirmation en session
        // Cela permet au middleware 'password.confirm' de laisser passer l'utilisateur
        $request->session()->put('auth.password_confirmed_at', time());

        return response()->json([
            'message' => 'Mot de passe confirmé avec succès.'
        ]);
    }
}