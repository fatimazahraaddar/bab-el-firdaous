<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',     // 🔥 IMPORTANT
        'level',
        'class',
        'guardian_id',
        'phone',
        'address',
        'transport',
        'bus_id'
    ];

    // 🔗 RELATIONS

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function guardian()
    {
        return $this->belongsTo(Guardian::class);
    }

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
