<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'description',
        'amount',
        'status',
        'due_date',
        'paid_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
    ];

    // 🔥 relation étudiant
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // 🔥 STATUT PAYÉ
    public function getIsPaidAttribute()
    {
        return $this->status === 'paid';
    }

    // 🔥 RETARD
    public function getIsLateAttribute()
    {
        return $this->status === 'unpaid' && $this->due_date < now();
    }
}