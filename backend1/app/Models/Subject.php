<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse.
     * @var array
     */
    protected $fillable = [
        'name',
        'code', // Optionnel (ex: MATH101)
        'description'
    ];

    /**
     * RELATION : Une matière peut apparaître dans plusieurs lignes de l'emploi du temps.
     */
    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class);
    }
}