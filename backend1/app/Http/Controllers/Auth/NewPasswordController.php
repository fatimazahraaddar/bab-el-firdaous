<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Hash, Password, Str};
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * ✅ RÉINITIALISATION DU MOT DE PASSE
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'token'    => ['required'],
            'email'    => ['required', 'email'],
            // Rules\Password::defaults() utilise tes réglages définis dans AppServiceProvider
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Tentative de réinitialisation via le Password Broker de Laravel
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password'       => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        // Si le broker renvoie un échec (token expiré, email incorrect, etc.)
        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'message' => __($status), // "Votre mot de passe a été réinitialisé."
            'status'  => 'success'
        ]);
    }
}