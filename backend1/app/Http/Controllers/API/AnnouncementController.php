<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $announcements = Announcement::where('target', 'all')
            ->orWhere('target', $user->role . 's')
            ->get();

        return response()->json($announcements);
    }

    public function store(Request $request)
    {
        if (!in_array(Auth::user()->role, ['admin', 'teacher'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'target' => 'required|in:all,students,teachers,parents',
        ]);

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => Auth::id(),
            'target' => $request->target,
        ]);

        return response()->json($announcement, 201);
    }

    public function show(Announcement $announcement)
    {
        return response()->json($announcement);
    }

    public function update(Request $request, Announcement $announcement)
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'target' => 'required|in:all,students,teachers,parents',
        ]);

        $announcement->update($request->all());

        return response()->json($announcement);
    }

    public function destroy(Announcement $announcement)
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted']);
    }
}