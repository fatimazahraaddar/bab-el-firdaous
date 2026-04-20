<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'type',
        'target',
        'start_date',
        'end_date',
        'is_pinned',   // 🔥 IMPORTANT
        'author_id'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_pinned' => 'boolean'
    ];

    // 🔥 auteur (admin)
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}