<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AssignmentController extends Controller
{
    /**
     * ✅ LISTE (Optimisée pour les relations Parents/Enfants)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        // Eager loading de la classe et tri par date d'échéance la plus proche
        $query = Assignment::with('class')->orderBy('due_date', 'asc');

        if ($user->role === 'admin') {
            $query->when($request->filled('student_id'), function ($q) use ($request) {
                $student = Student::find($request->integer('student_id'));
                return $student ? $q->where('class_id', $student->class_id) : $q;
            });
        } 
        elseif ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (!$parent) return response()->json(['data' => []]);

            // Récupération des IDs de classe des enfants de manière performante
            $classIds = $parent->children()->pluck('class_id')->unique()->filter();

            if ($classIds->isEmpty()) return response()->json(['data' => []]);

            // Filtrage par étudiant spécifique si demandé
            if ($request->filled('student_id')) {
                $studentId = $request->integer('student_id');
                $child = $parent->children()->where('id', $studentId)->first();

                if (!$child) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                $query->where('class_id', $child->class_id);
            } else {
                $query->whereIn('class_id', $classIds);
            }
        } else {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Optionnel : Filtrer pour ne pas voir les devoirs très anciens
        // $query->where('due_date', '>=', now()->subMonth());

        return response()->json($query->paginate(15));
    }

    /**
     * ✅ CREATE
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only'); // Idéalement via une Gate

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'subject'     => 'required|string|max:255',
            'due_date'    => 'required|date|after_or_equal:today', // Un devoir n'est pas dans le passé
            'class_id'    => 'required|exists:school_classes,id',
            'status'      => 'nullable|in:pending,done',
        ]);

        $assignment = Assignment::create($validated);

        return response()->json($assignment->load('class'), 201);
    }

    /**
     * ✅ SHOW
     */
    public function show(Assignment $assignment): JsonResponse
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json($assignment->load('class'));
        }

        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            // Vérification directe en base de données plutôt qu'en mémoire
            $hasChildInClass = $parent->children()->where('class_id', $assignment->class_id)->exists();

            if ($hasChildInClass) {
                return response()->json($assignment->load('class'));
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Assignment $assignment): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'subject'     => 'sometimes|string|max:255',
            'due_date'    => 'sometimes|date|after_or_equal:today',
            'class_id'    => 'sometimes|exists:school_classes,id',
            'status'      => 'sometimes|in:pending,done',
        ]);

        $assignment->update($validated);

        return response()->json($assignment->load('class'));
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Assignment $assignment): JsonResponse
    {
        $this->authorize('admin-only');

        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted']);
    }
}