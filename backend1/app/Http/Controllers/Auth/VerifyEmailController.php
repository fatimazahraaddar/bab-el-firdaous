<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * ✅ VALIDATION DE L'EMAIL
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // 1. L'URL vers ton frontend React (ex: http://localhost:3000)
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');

        // 2. Si déjà vérifié, on redirige directement vers le dashboard
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->to($frontendUrl . '/dashboard?verified=1');
        }

        // 3. Sinon, on marque comme vérifié et on déclenche l'événement
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // 4. Redirection vers React avec un flag de succès
        return redirect()->to($frontendUrl . '/dashboard?verified=1');
    }
}