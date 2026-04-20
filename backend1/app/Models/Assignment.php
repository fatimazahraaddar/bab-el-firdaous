<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'subject',
        'class_id',
        'status'
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    // 🔥 relation classe
    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }
}
