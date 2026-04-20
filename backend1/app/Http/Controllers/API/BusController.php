<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BusController extends Controller
{
    // ✅ LISTE
    public function index()
    {
        $user = Auth::user();

        // 🔥 ADMIN → voit tous les bus
        if ($user->role === 'admin') {
            return response()->json(
                Bus::withCount('students')->latest()->get()
            );
        }

        // 🔥 PARENT → voit seulement bus de ses enfants
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if (!$parent) {
                return response()->json([]);
            }

            $studentIds = $parent->children()->pluck('id');

            return response()->json(
                Bus::whereHas('students', function ($q) use ($studentIds) {
                    $q->whereIn('id', $studentIds);
                })->withCount('students')->get()
            );
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ CREATE (ADMIN ONLY)
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'number' => 'required|string|max:50|unique:buses,number',
            'driver_name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'zone' => 'nullable|string|max:255',
        ]);

        $bus = Bus::create($validated);

        return response()->json($bus, 201);
    }

    // ✅ SHOW
    public function show(Bus $bus)
    {
        $user = Auth::user();

        // 🔥 ADMIN → accès complet
        if ($user->role === 'admin') {
            return response()->json(
                $bus->load('students.user')->loadCount('students')
            );
        }

        // 🔥 PARENT → seulement si son enfant est dans ce bus
        if ($user->role === 'parent') {
            $parent = $user->parentProfile;

            if ($parent && $bus->students->whereIn('id', $parent->children->pluck('id'))->count()) {
                return response()->json(
                    $bus->load('students.user')->loadCount('students')
                );
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ UPDATE
    public function update(Request $request, Bus $bus)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'number' => 'sometimes|string|max:50|unique:buses,number,' . $bus->id,
            'driver_name' => 'sometimes|string|max:255',
            'capacity' => 'sometimes|integer|min:1',
            'zone' => 'nullable|string|max:255',
        ]);

        // 🔥 vérifier capacité
        if (isset($validated['capacity'])) {
            $studentsCount = $bus->students()->count();

            if ($validated['capacity'] < $studentsCount) {
                return response()->json([
                    'message' => 'Capacité inférieure au nombre actuel d’élèves'
                ], 422);
            }
        }

        $bus->update($validated);

        return response()->json(
            $bus->loadCount('students')
        );
    }

    // ✅ DELETE
    public function destroy(Bus $bus)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $bus->delete();

        return response()->json([
            'message' => 'Bus supprimé avec succès'
        ]);
    }
}