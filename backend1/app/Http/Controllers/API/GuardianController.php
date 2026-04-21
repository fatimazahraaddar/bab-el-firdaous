<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Guardian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class GuardianController extends Controller
{
    /**
     * ✅ LISTE (Avec pagination et eager loading)
     */
    public function index(): JsonResponse
    {
        // On charge l'utilisateur lié pour avoir accès au nom/email stockés dans 'users'
        return response()->json(Guardian::with('user')->latest()->paginate(10));
    }

    /**
     * ✅ CRÉER UN PARENT (Transactionnel)
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone'    => 'required|string|max:20',
            'job'      => 'nullable|string|max:255',
        ]);

        try {
            $guardian = DB::transaction(function () use ($validated) {
                // 1. Créer l'accès Login
                $user = User::create([
                    'name'     => $validated['name'],
                    'email'    => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role'     => 'parent'
                ]);

                // 2. Créer le profil Guardian lié
                return Guardian::create([
                    'user_id' => $user->id,
                    'phone'   => $validated['phone'],
                    'job'     => $validated['job'] ?? null
                ]);
            });

            return response()->json([
                'message'  => 'Parent créé avec succès',
                'guardian' => $guardian->load('user')
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la création'], 500);
        }
    }

    /**
     * ✅ SHOW
     */
    public function show(Guardian $guardian): JsonResponse
    {
        // On charge aussi les enfants pour que l'admin voie qui est lié à qui
        return response()->json($guardian->load(['user', 'children.user']));
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Guardian $guardian): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'phone' => 'sometimes|string|max:20',
            'job'   => 'nullable|string|max:255',
            // Si tu veux aussi permettre de changer le nom/email du User lié :
            'name'  => 'sometimes|string|max:255',
        ]);

        DB::transaction(function () use ($validated, $guardian) {
            $guardian->update($validated);

            if (isset($validated['name'])) {
                $guardian->user->update(['name' => $validated['name']]);
            }
        });

        return response()->json([
            'message'  => 'Profil parent mis à jour',
            'guardian' => $guardian->load('user')
        ]);
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Guardian $guardian): JsonResponse
    {
        $this->authorize('admin-only');

        DB::transaction(function () use ($guardian) {
            // On supprime l'utilisateur (le Guardian sera supprimé par cascade 
            // si tu as mis onDele('cascade') dans ta migration, sinon on le fait manuellement)
            $guardian->user->delete(); 
            $guardian->delete();
        });

        return response()->json(['message' => 'Parent et compte utilisateur supprimés']);
    }
}