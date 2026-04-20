<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // ✅ CONVERSATION
    public function conversation($userId)
    {
        $authUser = Auth::user();

        // 🔐 sécurité
        if ($authUser->id == $userId) {
            return response()->json(['message' => 'Invalid user'], 400);
        }

        // 🔥 vérifier que user existe
        if (!\App\Models\User::find($userId)) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $messages = Message::where(function ($q) use ($authUser, $userId) {
                $q->where('sender_id', $authUser->id)
                  ->where('receiver_id', $userId);
            })
            ->orWhere(function ($q) use ($authUser, $userId) {
                $q->where('sender_id', $userId)
                  ->where('receiver_id', $authUser->id);
            })
            ->with(['sender:id,name', 'receiver:id,name'])
            ->orderBy('created_at')
            ->get()
            ->map(function ($m) use ($authUser) {
                return [
                    'id' => $m->id,
                    'text' => $m->text,
                    'time' => $m->created_at->format('H:i'),
                    'full_time' => $m->created_at->format('Y-m-d H:i'),
                    'is_me' => $m->sender_id === $authUser->id,
                    'sender' => [
                        'id' => $m->sender->id,
                        'name' => $m->sender->name
                    ],
                    'receiver' => [
                        'id' => $m->receiver->id,
                        'name' => $m->receiver->name
                    ]
                ];
            });

        return response()->json($messages);
    }

    // ✅ ENVOYER MESSAGE
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'text' => 'required|string|max:1000'
        ]);

        // 🔐 empêcher message à soi-même
        if ($validated['receiver_id'] == $user->id) {
            return response()->json(['message' => 'Invalid receiver'], 400);
        }

        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'text' => $validated['text']
        ]);

        return response()->json([
            'id' => $message->id,
            'text' => $message->text,
            'time' => $message->created_at->format('H:i'),
            'full_time' => $message->created_at->format('Y-m-d H:i'),
            'is_me' => true,
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id']
        ], 201);
    }

    // ✅ LISTE CONTACTS (🔥 IMPORTANT POUR FRONTEND)
    public function contacts()
    {
        $user = Auth::user();

        // 🔥 admin voit tous les users
        if ($user->role === 'admin') {
            return response()->json(
                \App\Models\User::select('id', 'name')
                    ->where('id', '!=', $user->id)
                    ->get()
            );
        }

        // 🔥 parent → peut contacter admin uniquement
        if ($user->role === 'parent') {
            return response()->json(
                \App\Models\User::where('role', 'admin')
                    ->select('id', 'name')
                    ->get()
            );
        }

        return response()->json([]);
    }
}