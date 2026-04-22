<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class ClassController extends Controller
{
    /**
     * ✅ LISTE (Avec comptage des élèves)
     */
    public function index(): JsonResponse
    {
        // On utilise withCount pour savoir immédiatement combien d'élèves sont inscrits
        $classes = SchoolClass::withCount('students')->get();
        
        return response()->json($classes);
    }

    /**
     * ✅ SHOW (Utilise le Route Model Binding)
     */
    public function show(SchoolClass $schoolClass): JsonResponse
    {
        // On charge les élèves et leurs infos utilisateur pour le détail de la classe
        return response()->json(
            $schoolClass->load('students.user')
        );
    }

    /**
     * ✅ CREATE (Admin Only)
     */
    public function store(Request $request): JsonResponse
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        $validated = $request->validate([
            'name'  => 'required|string|max:255|unique:school_classes,name',
            'level' => 'nullable|string|max:255',
        ]);

        $class = SchoolClasse::create($validated);

        return response()->json([
            'message' => 'Classe créée avec succès',
            'data'    => $class
        ], 201);
    }

    /**
     * ✅ UPDATE (Admin Only)
     */
    public function update(Request $request, SchoolClass $schoolClass): JsonResponse
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        $validated = $request->validate([
            'name'  => 'sometimes|string|max:255|unique:school_classes,name,' . $schoolClass->id,
            'level' => 'nullable|string|max:255',
        ]);

        $schoolClass->update($validated);

        return response()->json([
            'message' => 'Classe mise à jour',
            'data'    => $schoolClass
        ]);
    }

    /**
     * ✅ DELETE (Admin Only)
     */
    public function destroy(SchoolClass $schoolClass): JsonResponse
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        // Optionnel : Empêcher la suppression si la classe contient des élèves
        if ($schoolClass->students()->count() > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer une classe qui contient encore des élèves.'
            ], 422);
        }

        $schoolClass->delete();

        return response()->json([
            'message' => 'Classe supprimée avec succès'
        ]);
    }
}