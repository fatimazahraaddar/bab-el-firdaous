<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AnnouncementController extends Controller
{
    /**
     * ✅ LISTE (Avec Scoping et Pagination)
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Announcement::query();

        // إذا كان المستخدم ليس أدمن، نطبق عليه الفلتر
        if ($user->role !== 'admin') {
            $query->where(function ($q) use ($user) {
                $q->where('target', 'all');
                if ($user->role === 'parent') {
                    $q->orWhere('target', 'parents');
                }
                if ($user->role === 'student') {
                    $q->orWhere('target', 'students');
                }
            });
        }
        // ملاحظة: إذا كان admin، لن يطبق الفلتر وسيرى كل الإعلانات

        // فلتر التاريخ (تأكد أن هذا لا يخفي الإعلانات التي تريد رؤيتها)
        $query->where(function ($q) {
            $now = now();
            $q->whereNull('end_date')
                ->orWhere('end_date', '>=', $now);
        });

        $announcements = $query->orderByDesc('is_pinned')
            ->latest()
            ->paginate(10);

        return response()->json($announcements);
    }

    /**
     * ✅ CREATE (Avec transaction pour le "Pinned")
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('admin-only'); // Utilisation d'une Gate ou Policy

        $validated = $request->validate([
            'title'      => 'required|string|max:255',
            'content'    => 'required|string',
            'type'       => 'required|string|in:info,warning,urgent,event', // Typage plus strict
            'target'     => 'required|in:all,parents',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
            'is_pinned'  => 'boolean'
        ]);

        // Utilisation d'une transaction pour garantir l'intégrité si le "pin" change
        $announcement = DB::transaction(function () use ($validated) {
            if (!empty($validated['is_pinned'])) {
                Announcement::where('is_pinned', true)->update(['is_pinned' => false]);
            }

            return Announcement::create([
                ...$validated,
                'author_id' => Auth::id(),
            ]);
        });

        return response()->json($announcement, 201);
    }

    /**
     * ✅ SHOW
     */
    public function show(Announcement $announcement): JsonResponse
    {
        // On vérifie que l'utilisateur a le droit de voir CETTE annonce (target)
        if ($announcement->target === 'parents' && Auth::user()->role !== 'parent' && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($announcement);
    }

    /**
     * ✅ UPDATE
     */
    public function update(Request $request, Announcement $announcement): JsonResponse
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title'      => 'sometimes|string|max:255',
            'content'    => 'sometimes|string',
            'type'       => 'sometimes|string|in:info,warning,urgent',
            'target'     => 'sometimes|in:all,parents',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
            'is_pinned'  => 'sometimes|boolean'
        ]);

        DB::transaction(function () use ($validated, $announcement) {
            if (isset($validated['is_pinned']) && $validated['is_pinned']) {
                Announcement::where('is_pinned', true)
                    ->where('id', '!=', $announcement->id)
                    ->update(['is_pinned' => false]);
            }
            $announcement->update($validated);
        });

        return response()->json($announcement);
    }

    /**
     * ✅ DELETE
     */
    public function destroy(Announcement $announcement): JsonResponse
    {
        if ($announcement->author_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted']);
    }
}
