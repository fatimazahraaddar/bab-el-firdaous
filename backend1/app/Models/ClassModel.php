<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory;

    protected $table = 'school_classes';

    protected $fillable = [
        'name',   // ex: "Classe A"
        'level',  // ex: "Primaire"
        'grade',  // ex: "CP", "CE1"
    ];

    // Pour inclure automatiquement le compte des élèves dans le JSON
    protected $appends = ['students_count'];

    // --- ACCESSEURS ---

    public function getStudentsCountAttribute()
    {
        return $this->students()->count();
    }

    // --- RELATIONS ---

    /**
     * Les élèves inscrits dans cette classe
     */
    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    /**
     * Les devoirs assignés à cette classe
     */
    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'class_id');
    }

    /**
     * L'emploi du temps de la classe
     */
    public function timetables()
    {
        return $this->hasMany(Timetable::class, 'class_id');
    }
}
