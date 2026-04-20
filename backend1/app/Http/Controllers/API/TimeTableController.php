<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Timetable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimetableController extends Controller
{
    // ✅ LISTE
    public function index()
    {
        $user = Auth::user();

        // 🔥 ADMIN → tout voir
        if ($user->role === 'admin') {
            return response()->json(
                Timetable::with(['class', 'subject'])->get()
            );
        }

        // 🔥 PARENT → emploi du temps des enfants
        if ($user->role === 'parent') {

            $guardian = $user->parentProfile;

            if (!$guardian) {
                return response()->json([]);
            }

            $classIds = $guardian->children()->pluck('class_id');

            $timetables = Timetable::whereIn('class_id', $classIds)
                ->with(['class', 'subject'])
                ->orderBy('day')
                ->orderBy('start_time')
                ->get();

            return response()->json($timetables);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // ✅ CREATE
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'class_id' => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room' => 'nullable|string'
        ]);

        $timetable = Timetable::create($validated);

        return response()->json(
            $timetable->load(['class', 'subject']),
            201
        );
    }

    // ✅ SHOW
    public function show(Timetable $timetable)
    {
        return response()->json(
            $timetable->load(['class', 'subject'])
        );
    }

    // ✅ UPDATE
    public function update(Request $request, Timetable $timetable)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'class_id' => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'room' => 'nullable|string'
        ]);

        $timetable->update($validated);

        return response()->json(
            $timetable->load(['class', 'subject'])
        );
    }

    // ✅ DELETE
    public function destroy(Timetable $timetable)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $timetable->delete();

        return response()->json([
            'message' => 'Timetable deleted'
        ]);
    }
}
