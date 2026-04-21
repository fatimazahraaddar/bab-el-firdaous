<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',         // ex: 'Monday', 'Tuesday'
        'start_time',  // ex: '08:00'
        'end_time',    // ex: '10:00'
        'subject_id',
        'class_id',
        'room',
    ];

    /**
     * Casts pour faciliter la manipulation des heures
     */
    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time'   => 'datetime:H:i',
    ];

    // --- SCOPES ---

    /**
     * Récupère l'emploi du temps pour un jour précis
     */
    public function scopeForDay($query, $day)
    {
        return $query->where('day', $day)->orderBy('start_time');
    }

    // --- RELATIONS ---

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}