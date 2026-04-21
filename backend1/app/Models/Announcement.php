<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'type',        // 'info', 'warning', 'urgent', 'event'
        'target',      // 'all', 'parents', 'students'
        'start_date',
        'end_date',
        'is_pinned',
        'author_id'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date'   => 'datetime',
        'is_pinned'  => 'boolean'
    ];

    // --- SCOPES : La clé d'un dashboard propre ---

    /**
     * Récupère uniquement les annonces en cours (date actuelle entre start et end)
     */
    public function scopeActive(Builder $query)
    {
        $now = now();
        return $query->where('start_date', '<=', $now)
                     ->where(function ($q) use ($now) {
                         $q->whereNull('end_date')
                           ->orWhere('end_date', '>=', $now);
                     });
    }

    /**
     * Trie par priorité (épinglé d'abord, puis plus récent)
     */
    public function scopeOrdered(Builder $query)
    {
        return $query->orderBy('is_pinned', 'desc')
                     ->latest();
    }

    // --- RELATIONS ---

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}