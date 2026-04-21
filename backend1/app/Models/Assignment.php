<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'subject_id', // Changé en ID pour lier au modèle Subject
        'class_id',
        'file_path',   // 🔥 Ajout pour stocker l'énoncé (PDF/Image)
        'status'       // 'active', 'draft', 'archived'
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    // --- SCOPES ---

    /**
     * Récupère les devoirs dont la date limite n'est pas encore passée
     */
    public function scopeUpcoming($query)
    {
        return $query->where('due_date', '>=', now())->orderBy('due_date', 'asc');
    }

    /**
     * Récupère les devoirs en retard
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now());
    }

    // --- RELATIONS ---

    public function schoolClass()
    {
        // Attention : 'class' est un mot réservé en PHP, 
        // utiliser schoolClass est souvent plus sûr pour éviter les bugs.
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
