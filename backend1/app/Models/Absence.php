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
        'status',
        'reason',       // 🔥 AJOUT IMPORTANT
        'justified'     // 🔥 AJOUT IMPORTANT
    ];

    protected $casts = [
        'date' => 'date',
        'justified' => 'boolean'
    ];

    // 🔥 relation étudiant
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}