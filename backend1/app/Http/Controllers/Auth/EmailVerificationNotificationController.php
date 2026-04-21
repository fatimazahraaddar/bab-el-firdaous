<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * ✅ RENVOYER LE LIEN DE VÉRIFICATION
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Si l'utilisateur est déjà vérifié, pas besoin de renvoyer
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Votre e-mail est déjà vérifié.',
                'verified' => true
            ]);
        }

        // 2. Optionnel : Ajouter un throttle manuel ou via middleware sur la route
        // pour limiter à 1 envoi toutes les minutes par exemple.

        // 3. Déclencher l'envoi de la notification Laravel standard
        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'status' => 'verification-link-sent',
            'message' => 'Un nouveau lien de vérification a été envoyé à votre adresse e-mail.'
        ]);
    }
}