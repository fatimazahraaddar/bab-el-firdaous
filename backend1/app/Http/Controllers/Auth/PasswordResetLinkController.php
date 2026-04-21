<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * ✅ ENVOYER LE LIEN DE RÉINITIALISATION
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Validation de l'email
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // 2. Tentative d'envoi du lien via le broker
        // Password::sendResetLink va vérifier si l'email existe,
        // générer un token unique et envoyer la notification.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // 3. Gestion de l'erreur (ex: utilisateur introuvable ou trop d'essais)
        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        // 4. Réponse de succès
        return response()->json([
            'message' => __($status), // "Nous vous avons envoyé par courriel le lien..."
            'status'  => 'success'
        ]);
    }
}