<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SchoolClass;
use App\Models\Subject;

class Timetable extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'subject_id',
        'class_id',
        'room',
    ];

    // 🏫 CLASS
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    // 📚 SUBJECT
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}