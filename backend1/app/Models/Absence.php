<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'date',
        'status', // 'absent', 'late' (en retard)
        'reason',
        'justified'
    ];

    protected $casts = [
        'date' => 'date',
        'justified' => 'boolean'
    ];

    // --- SCOPES POUR LES STATISTIQUES ---
    
    public function scopeJustified($query)
    {
        return $query->where('justified', true);
    }

    public function scopeUnjustified($query)
    {
        return $query->where('justified', false);
    }

    // --- RELATIONS ---

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}