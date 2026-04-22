<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'address', // 🔥 AJOUT : Souvent nécessaire pour les urgences/bus
        'user_id' 
    ];

    // Pour que le compte d'enfants soit inclus dans chaque réponse API
    protected $appends = ['children_count'];

    // --- ACCESSEURS ---

    public function getChildrenCountAttribute()
    {
        return $this->children()->count();
    }

    // --- RELATIONS ---

    /**
     * Le compte utilisateur lié (pour le login et les notifications)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Les élèves dont ce parent est responsable
     */
    public function children()
    {
        // On précise la clé étrangère guardian_id dans la table students
        return $this->hasMany(Student::class, 'guardian_id');
    }

    /**
     * Optionnel : Récupérer les paiements effectués par ce parent
     */
    public function payments()
    {
        return $this->hasMany(Payment::class, 'parent_id');
    }
}