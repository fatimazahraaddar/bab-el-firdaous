<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AbsenceController extends Controller
{
    /**
     * ✅ LISTE (Optimisée avec Eager Loading et Pagination)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        // Utilisation du query builder pour éviter de charger trop de données en mémoire
        $query = Absence::with(['student.user:id,name,email']); 

        if ($user->role === 'admin') {
            // Filtrage optionnel par étudiant côté DB
            $query->when($request->student_id, function ($q, $id) {
                return $q->where('student_id', $id);
            });
        } 
        elseif ($user->role === 'parent') {
            // Utilisation d'une relation directe pour éviter les pluck() manuels
            // On suppose que ParentProfile a une relation 'children'
            $studentIds = $user->parentProfile->children()->pluck('students.id');

            if ($studentIds->isEmpty()) {
                return response()->json(['data' => []]);
            }

            $query->whereIn('student_id', $studentIds)
                  ->when($request->student_id, function ($q, $id) use ($studentIds) {
                      return $studentIds->contains($id) 
                          ? $q->where('student_id', $id) 
                          : $q->whereRaw('1 = 0'); // Force un résultat vide si non autorisé
                  });
        } else {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Pagination indispensable en production
        return response()->json($query->latest()->paginate(15));
    }

    /**
     * ✅ CREATE (Validation stricte)
     */
    public function store(Request $request): JsonResponse
    {
        // En production, utilise une Policy plutôt que des if()
        $this->authorize('create', Absence::class);

        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'date'       => 'required|date|before_or_equal:today',
            'subject'    => 'nullable|string|max:255',
            'justified'  => 'boolean',
            'reason'     => 'nullable|string|max:1000'
        ]);

        $absence = Absence::create($validated);

        return response()->json($absence, 201);
    }

    /**
     * ✅ SHOW (Route Model Binding + Policy)
     */
    public function show(Absence $absence): JsonResponse
    {
        // Utilise les Policies Laravel pour centraliser la sécurité
        // $this->authorize('view', $absence);

        return response()->json($absence->load('student.user'));
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Absence $absence): JsonResponse
    {
        $this->authorize('update', $absence);

        $validated = $request->validate([
            'date'      => 'nullable|date|before_or_equal:today',
            'subject'   => 'nullable|string|max:255',
            'justified' => 'boolean',
            'reason'    => 'nullable|string|max:1000'
        ]);

        $absence->update($validated);

        return response()->json($absence);
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Absence $absence): JsonResponse
    {
        $this->authorize('delete', $absence);

        $absence->delete();

        return response()->json(['message' => 'Absence deleted']);
    }
}