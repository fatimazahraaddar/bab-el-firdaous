<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClasse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',   // ex: "Classe 1-A"
        'level',  // ex: "Primaire", "Collège"
    ];

    /**
     * 🔥 RELATION ÉLÈVES
     * Une classe possède plusieurs élèves.
     */
    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    /**
     * 🔥 RELATION DEVOIRS
     * Une classe a ses propres devoirs/exercices.
     */
    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'class_id');
    }

    /**
     * 🔥 RELATION EMPLOI DU TEMPS
     * Une classe a une grille horaire spécifique.
     */
    public function timetables()
    {
        return $this->hasMany(Timetable::class, 'class_id');
    }

    /**
     * 🔥 ACCESSEUR : NOMBRE D'ÉLÈVES
     * Pratique pour afficher "30/35 élèves" sur ton dashboard React.
     */
    public function getStudentsCountAttribute()
    {
        return $this->students()->count();
    }
}