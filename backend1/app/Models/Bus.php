<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'driver_name',
        'capacity',
        'zone'
    ];

    protected $casts = [
        'capacity' => 'integer'
    ];

    // 🔥 relation élèves
    public function students()
    {
        return $this->hasMany(Student::class);
    }

    // 🔥 nombre d'élèves (utile dashboard)
    public function getStudentsCountAttribute()
    {
        return $this->students()->count();
    }
}