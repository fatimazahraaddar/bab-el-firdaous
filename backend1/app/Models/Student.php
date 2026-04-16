<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'class',
        'parent_id',
        'transport_type',
        'bus_number',
    ];

    protected $casts = [
        'transport_type' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(Guardian::class, 'parent_id');
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'student_id');
    }
}
