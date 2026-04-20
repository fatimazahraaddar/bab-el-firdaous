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
        'job',
        'user_id' // 🔥 IMPORTANT
    ];

    // 🔥 relation user (compte)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔥 relation enfants
    public function children()
    {
        return $this->hasMany(Student::class, 'guardian_id'); // ✅ CORRIGÉ
    }

    // 🔥 nombre d'enfants (dashboard)
    public function getChildrenCountAttribute()
    {
        return $this->children()->count();
    }
}