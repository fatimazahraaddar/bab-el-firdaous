<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubjectController extends Controller
{
    /**
     * ✅ Récupérer toutes les matières.
     * Cette méthode répondra à ton fetch(`${API_BASE}/api/subjects`) dans React.
     */
    public function index(): JsonResponse
    {
        try {
            $subjects = Subject::all();
            return response()->json($subjects, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des matières',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ Créer une nouvelle matière (optionnel pour ton admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:subjects,name|max:255',
        ]);

        $subject = Subject::create($validated);

        return response()->json([
            'message' => 'Matière créée avec succès',
            'subject' => $subject
        ], 201);
    }

    /**
     * ✅ Supprimer une matière.
     */
    public function destroy(Subject $subject): JsonResponse
    {
        $subject->delete();
        return response()->json(['message' => 'Matière supprimée']);
    }
}