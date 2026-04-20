<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'text',
        'file',        // 🔥 AJOUT (pour fichiers)
        'is_read'      // 🔥 AJOUT (lu ou non)
    ];

    protected $casts = [
        'is_read' => 'boolean'
    ];

    // 🔥 expéditeur
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // 🔥 destinataire
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}