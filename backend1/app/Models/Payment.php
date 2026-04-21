<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'parent_id',    // 🔥 AJOUT : Pour lier directement au payeur
        'description',
        'amount',
        'category',     // 🔥 AJOUT : 'Tuition', 'Bus', 'Canteen', 'Books'
        'status',       // 'paid', 'unpaid', 'pending'
        'due_date',
        'paid_date',
        'reference'     // 🔥 AJOUT : Numéro de facture ou reçu
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
    ];

    // On expose les attributs calculés dans le JSON de l'API
    protected $appends = ['is_paid', 'is_late'];

    // --- ACCESSEURS ---

    public function getIsPaidAttribute()
    {
        return $this->status === 'paid';
    }

    public function getIsLateAttribute()
    {
        return $this->status === 'unpaid' && $this->due_date->isPast();
    }

    // --- RELATIONS ---

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function parent()
    {
        return $this->belongsTo(Guardian::class, 'parent_id');
    }
}