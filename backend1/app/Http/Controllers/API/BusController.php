<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class BusController extends Controller
{
    /**
     * ✅ LISTE (Avec Eager Loading et Pagination)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Bus::withCount('students')->latest();

        if ($user->role === 'admin') {
            // L'admin voit tout
        } 
        elseif ($user->role === 'parent') {
            $parent = $user->parentProfile;
            if (!$parent) return response()->json(['data' => []]);

            $studentIds = $parent->children()->pluck('students.id');

            // On filtre les bus qui transportent au moins un des enfants du parent
            $query->whereHas('students', function ($q) use ($studentIds) {
                $q->whereIn('students.id', $studentIds);
            });
        } else {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($query->paginate(10));
    }

    /**
     * ✅ CREATE
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only'); // Idéalement via une Gate

        $validated = $request->validate([
            'number'      => 'required|string|max:50|unique:buses,number',
            'driver_name' => 'required|string|max:255',
            'capacity'    => 'required|integer|min:1',
            'zone'        => 'nullable|string|max:255',
        ]);

        $bus = Bus::create($validated);

        return response()->json($bus, 201);
    }

    /**
     * ✅ SHOW
     */
    public function show(Bus $bus): JsonResponse
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return response()->json($bus->load('students.user')->loadCount('students'));
        }

        if ($user->role === 'parent') {
            $parent = $user->parentProfile;
            
            // Vérification SQL directe (plus performant que charger la collection)
            $hasChildInBus = $bus->students()
                ->where('parent_id', $parent->id) // Si la table student a un parent_id
                ->exists();

            if ($hasChildInBus) {
                return response()->json($bus->load('students.user')->loadCount('students'));
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Bus $bus): JsonResponse
    {
        $this->authorize('admin-only');

        $validated = $request->validate([
            'number'      => 'sometimes|string|max:50|unique:buses,number,' . $bus->id,
            'driver_name' => 'sometimes|string|max:255',
            'capacity'    => 'sometimes|integer|min:1',
            'zone'        => 'nullable|string|max:255',
        ]);

        if (isset($validated['capacity'])) {
            // On utilise loadCount si pas déjà fait ou count() direct
            $currentTotal = $bus->students()->count();

            if ($validated['capacity'] < $currentTotal) {
                return response()->json([
                    'message' => "La capacité ne peut pas être inférieure au nombre d'élèves actuels ($currentTotal)."
                ], 422);
            }
        }

        $bus->update($validated);

        return response()->json($bus->loadCount('students'));
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Bus $bus): JsonResponse
    {
        $this->authorize('admin-only');

        // Optionnel : vérifier si le bus est vide avant de supprimer ?
        $bus->delete();

        return response()->json(['message' => 'Bus supprimé avec succès']);
    }
}