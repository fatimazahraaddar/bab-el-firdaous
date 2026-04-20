<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    // ✅ LISTE
    public function index()
    {
        $user = Auth::user();

        $roleMap = [
            'parent' => 'parents',
            'admin' => 'all'
        ];

        $target = $roleMap[$user->role] ?? 'all';

        return response()->json(
            Announcement::where('target', 'all')
                ->orWhere('target', $target)
                ->orderByDesc('is_pinned') // 🔥 pinned en haut
                ->latest()
                ->get()
        );
    }

    // ✅ CREATE (ADMIN ONLY)
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|string',
            'target' => 'required|in:all,parents',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_pinned' => 'boolean'
        ]);

        // 🔥 un seul pinned
        if (!empty($validated['is_pinned'])) {
            Announcement::where('is_pinned', true)->update(['is_pinned' => false]);
        }

        $announcement = Announcement::create([
            ...$validated,
            'author_id' => Auth::id(),
        ]);

        return response()->json($announcement, 201);
    }

    // ✅ SHOW
    public function show(Announcement $announcement)
    {
        return response()->json($announcement);
    }

    // ✅ UPDATE
    public function update(Request $request, Announcement $announcement)
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'type' => 'sometimes|string',
            'target' => 'sometimes|in:all,parents',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_pinned' => 'sometimes|boolean'
        ]);

        // 🔥 gérer pinned proprement
        if (isset($validated['is_pinned']) && $validated['is_pinned']) {
            Announcement::where('is_pinned', true)->update(['is_pinned' => false]);
        }

        $announcement->update($validated);

        return response()->json($announcement);
    }

    // ✅ DELETE
    public function destroy(Announcement $announcement)
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted']);
    }
}