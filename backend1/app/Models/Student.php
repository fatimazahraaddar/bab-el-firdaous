<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SchoolClasse;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'guardian_id',
        'class_id',    // ✅ Changé pour correspondre à la relation BelongsTo
        'bus_id',
        'level',   
        'first_name',  // 👈
        'last_name',   // 👈    // ex: Primaire, Collège
        'phone',
        'address',
        'transport',   // boolean ou string (ex: 'bus', 'private')
    ];

    // --- RELATIONS ---

    /**
     * Le compte utilisateur (Nom, Email, Photo de profil)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * La classe actuelle (SchoolClass)
     */
    public function schoolClass()
    {
        return $this->belongsTo(SchoolClasse::class, 'class_id');
    }

    /**
     * Le parent/tuteur légal
     */
    public function guardian()
    {
        return $this->belongsTo(Guardian::class, 'guardian_id');
    }

    /**
     * Le bus assigné (si applicable)
     */
    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}