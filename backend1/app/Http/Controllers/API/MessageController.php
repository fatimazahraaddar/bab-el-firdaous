<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    /**
     * ✅ RÉCUPÉRER UNE CONVERSATION
     */
    public function conversation($userId): JsonResponse
    {
        $authUser = Auth::user();

        if ($authUser->id == $userId) {
            return response()->json(['message' => 'Invalid user'], 400);
        }

        // On vérifie l'existence et on récupère les infos du destinataire
        $otherUser = User::findOrFail($userId);

        // Récupération des messages avec une seule requête optimisée
        $messages = Message::where(function ($q) use ($authUser, $userId) {
                $q->where('sender_id', $authUser->id)->where('receiver_id', $userId);
            })
            ->orWhere(function ($q) use ($authUser, $userId) {
                $q->where('sender_id', $userId)->where('receiver_id', $authUser->id);
            })
            ->with(['sender:id,name', 'receiver:id,name'])
            ->orderBy('created_at', 'asc')
            ->get();

        // 🔥 MARQUER COMME LUS
        // On marque comme "lus" tous les messages reçus de cet utilisateur
        Message::where('sender_id', $userId)
            ->where('receiver_id', $authUser->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json($messages->map(fn($m) => [
            'id'        => $m->id,
            'text'      => $m->text,
            'time'      => $m->created_at->format('H:i'),
            'full_time' => $m->created_at->format('d/m/Y H:i'),
            'is_me'     => $m->sender_id === $authUser->id,
            'sender'    => $m->sender,
            'receiver'  => $m->receiver,
            'is_read'   => $m->read_at !== null
        ]));
    }

    /**
     * ✅ ENVOYER UN MESSAGE
     */
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'text'        => 'required|string|max:1000'
        ]);

        if ($validated['receiver_id'] == $user->id) {
            return response()->json(['message' => 'Action invalide'], 400);
        }

        $message = Message::create([
            'sender_id'   => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'text'        => $validated['text'],
            'read_at'     => null
        ]);

        return response()->json([
            'id'        => $message->id,
            'text'      => $message->text,
            'time'      => $message->created_at->format('H:i'),
            'is_me'     => true,
            'is_read'   => false
        ], 201);
    }

    /**
     * ✅ LISTE DES CONTACTS (Avec dernier message et compteur non-lus)
     */
    public function contacts(): JsonResponse
    {
        $user = Auth::user();

        $query = User::select('id', 'name', 'role')->where('id', '!=', $user->id);

        // Restriction des contacts selon le rôle
        if ($user->role === 'parent') {
            $query->where('role', 'admin');
        }

        $contacts = $query->get()->map(function ($contact) use ($user) {
            // On ajoute le nombre de messages non lus pour ce contact
            $contact->unread_count = Message::where('sender_id', $contact->id)
                ->where('receiver_id', $user->id)
                ->whereNull('read_at')
                ->count();
                
            return $contact;
        });

        return response()->json($contacts);
    }
}