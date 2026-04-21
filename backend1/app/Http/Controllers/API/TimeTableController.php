<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Timetable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class TimetableController extends Controller
{
    /**
     * ✅ LISTE (Filtrée par classe)
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        $classId = $request->query('class_id');

        $query = Timetable::with(['class', 'subject']);

        // 🔥 ADMIN : Voir tout ou filtrer par classe spécifique
        if ($user->role === 'admin') {
            if ($classId) {
                $query->where('class_id', $classId);
            }
        } 
        // 🔥 PARENT : Voir uniquement les classes de ses enfants
        elseif ($user->role === 'parent') {
            $guardian = $user->parentProfile;
            if (!$guardian) return response()->json([]);

            $allowedClassIds = $guardian->children()->pluck('class_id')->toArray();

            // Si le parent demande une classe spécifique, on vérifie qu'il y a droit
            if ($classId) {
                if (!in_array($classId, $allowedClassIds)) {
                    return response()->json(['message' => 'Accès refusé'], 403);
                }
                $query->where('class_id', $classId);
            } else {
                $query->whereIn('class_id', $allowedClassIds);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Tri logique pour le calendrier : Jour -> Heure de début
        $timetables = $query->orderByRaw("FIELD(day, 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')")
                            ->orderBy('start_time')
                            ->get();

        return response()->json($timetables);
    }

    /**
     * ✅ CREATE (Avec détection de conflit)
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'class_id'   => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'day'        => 'required|string|in:Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche',
            'start_time' => 'required|date_format:H:i',
            'end_time'   => 'required|date_format:H:i|after:start_time',
            'room'       => 'nullable|string|max:50'
        ]);

        // 🛑 VÉRIFICATION DE CONFLIT
        // Est-ce qu'il y a déjà un cours dans cette classe qui chevauche ces horaires ?
        $overlap = Timetable::where('class_id', $validated['class_id'])
            ->where('day', $validated['day'])
            ->where(function ($q) use ($validated) {
                $q->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                  ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']])
                  ->orWhere(function ($sub) use ($validated) {
                      $sub->where('start_time', '<=', $validated['start_time'])
                          ->where('end_time', '>=', $validated['end_time']);
                  });
            })->exists();

        if ($overlap) {
            return response()->json(['message' => 'Conflit d\'horaire : La classe est déjà occupée.'], 422);
        }

        $timetable = Timetable::create($validated);

        return response()->json($timetable->load(['class', 'subject']), 201);
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Timetable $timetable): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'class_id'   => 'sometimes|exists:school_classes,id',
            'subject_id' => 'sometimes|exists:subjects,id',
            'day'        => 'sometimes|string',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time'   => 'sometimes|date_format:H:i|after:start_time',
            'room'       => 'nullable|string'
        ]);

        $timetable->update($validated);

        return response()->json($timetable->load(['class', 'subject']));
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Timetable $timetable): JsonResponse
    {
        $this->authorize('admin-only');
        $timetable->delete();
        return response()->json(['message' => 'Cours supprimé']);
    }
}