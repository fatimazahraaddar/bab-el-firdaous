<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TimeTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimeTableController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'student') {
            // Filter by class, but for now all
            $timetables = TimeTable::all();
        } elseif ($user->role === 'teacher') {
            $timetables = TimeTable::where('teacher', $user->name)->get();
        } else {
            $timetables = TimeTable::all();
        }

        return response()->json($timetables);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'subject' => 'required|string',
            'teacher' => 'required|string',
            'class' => 'required|string',
            'room' => 'nullable|string',
        ]);

        $timetable = TimeTable::create($request->all());

        return response()->json($timetable, 201);
    }

    public function show(TimeTable $timetable)
    {
        return response()->json($timetable);
    }

    public function update(Request $request, TimeTable $timetable)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'subject' => 'required|string',
            'teacher' => 'required|string',
            'class' => 'required|string',
            'room' => 'nullable|string',
        ]);

        $timetable->update($request->all());

        return response()->json($timetable);
    }

    public function destroy(TimeTable $timetable)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $timetable->delete();

        return response()->json(['message' => 'Timetable deleted']);
    }
}