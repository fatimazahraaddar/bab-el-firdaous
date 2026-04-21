<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * ✅ GET SETTINGS
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();

        // Valeurs par défaut si la colonne settings est vide
        $defaultPreferences = [
            'theme' => 'light',
            'notifications' => true,
            'language' => 'fr'
        ];

        return response()->json([
            // 🏫 INFOS ÉCOLE (Statique ou via un modèle SchoolSetting)
            'school' => [
                'name'    => 'École Excellence',
                'email'   => 'contact@ecole.com',
                'phone'   => '0600000000',
                'address' => 'Casablanca'
            ],

            // 👤 INFOS UTILISATEUR
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role
            ],

            // ⚙️ PRÉFÉRENCES (Fusion des défauts avec la DB)
            'preferences' => array_merge($defaultPreferences, $user->settings ?? [])
        ]);
    }

    /**
     * ✅ UPDATE SETTINGS
     */
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name'          => 'nullable|string|max:255',
            'email'         => 'nullable|email|unique:users,email,' . $user->id,
            'theme'         => 'nullable|in:light,dark',
            'notifications' => 'nullable|boolean',
            'language'      => 'nullable|in:fr,en',
            'password'      => 'nullable|string|min:8|confirmed'
        ]);

        // 1. Mise à jour des infos de base
        if ($request->has('name'))  $user->name = $validated['name'];
        if ($request->has('email')) $user->email = $validated['email'];
        
        if ($request->filled('password')) {
            $user->password = \Hash::make($validated['password']);
        }

        // 2. Mise à jour des préférences JSON
        $currentSettings = $user->settings ?? [];
        
        $newPreferences = [
            'theme'         => $validated['theme'] ?? ($currentSettings['theme'] ?? 'light'),
            'notifications' => $request->has('notifications') ? $validated['notifications'] : ($currentSettings['notifications'] ?? true),
            'language'      => $validated['language'] ?? ($currentSettings['language'] ?? 'fr'),
        ];

        $user->settings = $newPreferences;
        $user->save();

        return response()->json([
            'message' => 'Paramètres sauvegardés avec succès',
            'data' => [
                'user' => [
                    'name'  => $user->name,
                    'email' => $user->email
                ],
                'preferences' => $user->settings
            ]
        ]);
    }
}