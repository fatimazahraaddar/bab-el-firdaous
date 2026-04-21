<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * ✅ VÉRIFIER LE STATUT DE VÉRIFICATION
     * Utilisé par le frontend pour savoir s'il doit afficher l'écran "Verify Email"
     */
    public function __invoke(Request $request): JsonResponse
    {
        $isVerified = $request->user()->hasVerifiedEmail();

        return response()->json([
            'verified' => $isVerified,
            'message'  => $isVerified 
                ? 'E-mail déjà vérifié.' 
                : 'Veuillez vérifier votre adresse e-mail pour accéder à toutes les fonctionnalités.',
            'email'    => $request->user()->email
        ]);
    }
}