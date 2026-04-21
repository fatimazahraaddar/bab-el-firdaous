<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\{Guardian, Student, User};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Hash, DB};
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class StudentController extends Controller
{
    /**
     * ✅ LISTE (Avec pagination et recherche avancée)
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Eager loading pour éviter le problème N+1
        $query = Student::with(['user', 'guardian', 'schoolClass', 'bus'])
            ->withCount(['absences', 'payments']);

        // --- FILTRES ---
        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        if ($request->filled('transport')) {
            $query->where('transport', $request->transport);
        }

        // --- SÉCURITÉ DES RÔLES ---
        if ($user->role === 'admin') {
            return response()->json($query->latest()->paginate(20));
        }

        if ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            if (!$guardian) return response()->json([]);

            return response()->json(
                $query->where('guardian_id', $guardian->id)->latest()->get()
            );
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * ✅ CRÉER ÉLÈVE + PARENT (Transactionnel)
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only'); // Utilisation des Policies ou Gates

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'password'     => 'required|string|min:6',
            'level'        => 'required|string|max:255',
            'class_id'     => 'required|exists:school_classes,id',
            'phone'        => 'nullable|string|max:255',
            'address'      => 'nullable|string',
            'transport'    => 'nullable|in:pieton,bus',
            'bus_id'       => 'nullable|exists:buses,id',
            // Infos Parent
            'parent_name'  => 'required|string|max:255',
            'parent_email' => 'required|email|unique:users,email',
            'parent_phone' => 'required|string|max:255',
        ]);

        try {
            $data = DB::transaction(function () use ($validated) {
                // 1. Créer le compte Login du Parent
                $parentPassword = Str::random(8);
                $parentUser = User::create([
                    'name'     => $validated['parent_name'],
                    'email'    => $validated['parent_email'],
                    'password' => Hash::make($parentPassword),
                    'role'     => 'parent',
                ]);

                // 2. Créer le profil Guardian
                $guardian = Guardian::create([
                    'user_id' => $parentUser->id,
                    'name'    => $validated['parent_name'],
                    'email'   => $validated['parent_email'],
                    'phone'   => $validated['parent_phone'],
                ]);

                // 3. Créer le compte Login de l'Élève
                $studentUser = User::create([
                    'name'     => $validated['name'],
                    'email'    => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role'     => 'student',
                ]);

                // 4. Créer le profil Élève
                $student = Student::create([
                    'user_id'     => $studentUser->id,
                    'level'       => $validated['level'],
                    'class_id'    => $validated['class_id'],
                    'guardian_id' => $guardian->id,
                    'phone'       => $validated['phone'] ?? null,
                    'address'     => $validated['address'] ?? null,
                    'transport'   => $validated['transport'] ?? 'pieton',
                    'bus_id'      => $validated['bus_id'] ?? null,
                ]);

                return [
                    'student' => $student,
                    'parent_password' => $parentPassword
                ];
            });

            return response()->json([
                'message'      => 'Élève et parent créés avec succès',
                'parent_creds' => [
                    'email'    => $validated['parent_email'],
                    'password' => $data['parent_password'],
                ],
                'student'      => $data['student']->load(['user', 'guardian', 'schoolClass', 'bus']),
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la création : ' . $e->getMessage()], 500);
        }
    }

    /**
     * ✅ SHOW
     */
    public function show(Student $student): JsonResponse
    {
        $user = Auth::user();

        // Vérification de propriété pour le parent
        if ($user->role === 'parent') {
            if ($student->guardian_id !== $user->parentProfile->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json(
            $student->load(['user', 'guardian', 'schoolClass', 'bus', 'absences', 'payments'])
        );
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Student $student): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'level'       => 'sometimes|string|max:255',
            'class_id'    => 'sometimes|exists:school_classes,id',
            'guardian_id' => 'sometimes|exists:guardians,id',
            'bus_id'      => 'nullable|exists:buses,id',
            'phone'       => 'nullable|string|max:255',
            'address'     => 'nullable|string',
            'transport'   => 'sometimes|in:pieton,bus',
        ]);

        $student->update($validated);

        return response()->json($student->load(['user', 'schoolClass', 'guardian', 'bus']));
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Student $student): JsonResponse
    {
        $this->authorize('admin-only');

        DB::transaction(function () use ($student) {
            // Supprimer le User lié d'abord
            if ($student->user) {
                $student->user->delete();
            }
            $student->delete();
        });

        return response()->json(['message' => 'Élève supprimé avec succès']);
    }
}