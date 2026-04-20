<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    // ✅ GET SETTINGS
    public function index()
    {
        $user = Auth::user();

        return response()->json([

            // 🏫 SCHOOL (temporaire → DB plus tard)
            'school' => [
                'name' => 'École Excellence',
                'email' => 'contact@ecole.com',
                'phone' => '0600000000',
                'address' => 'Casablanca'
            ],

            // 👤 USER INFO
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ],

            // ⚙️ SETTINGS USER (peut venir DB plus tard)
            'preferences' => [
                'theme' => 'light',
                'notifications' => true,
                'language' => 'fr'
            ]
        ]);
    }

    // ✅ UPDATE SETTINGS
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email',
            'theme' => 'nullable|in:light,dark',
            'notifications' => 'nullable|boolean',
            'language' => 'nullable|in:fr,en'
        ]);

        // 🔥 update user (simple version)
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }

        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }

        $user->save();

        // 🔥 settings (temporaire → DB plus tard)
        return response()->json([
            'message' => 'Paramètres sauvegardés avec succès',
            'data' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'preferences' => [
                    'theme' => $validated['theme'] ?? 'light',
                    'notifications' => $validated['notifications'] ?? true,
                    'language' => $validated['language'] ?? 'fr'
                ]
            ]
        ]);
    }
}