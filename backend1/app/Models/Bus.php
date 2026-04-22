<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'bus_number',
        'driver_name',
        'driver_phone', // 🔥 AJOUT : Pour que les parents/admin puissent appeler
        'capacity',
        'zone',
        'status'        // 🔥 AJOUT : 'active', 'maintenance', 'inactive'
    ];

    protected $casts = [
        'capacity' => 'integer'
    ];

    // --- ACCESSEURS (Appended attributes) ---

    // Pour que ces données soient visibles dans ton JSON API
    protected $appends = ['students_count', 'available_seats'];

    /**
     * Nombre d'élèves actuellement inscrits dans ce bus
     */
    public function getStudentsCountAttribute()
    {
        return $this->students()->count();
    }

    /**
     * Calcul des places restantes
     */
    public function getAvailableSeatsAttribute()
    {
        return $this->capacity - $this->students_count;
    }

    // --- RELATIONS ---

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}