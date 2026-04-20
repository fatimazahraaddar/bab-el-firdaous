<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\Announcement;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // 🔥 Parent profile
    public function parentProfile()
    {
        return $this->hasOne(Guardian::class, 'user_id');
    }

    // 🔥 Student profile (just relation, pas login)
    public function studentProfile()
    {
        return $this->hasOne(Student::class, 'user_id');
    }

    // 🔥 Announcements (admin)
    public function announcements()
    {
        return $this->hasMany(Announcement::class, 'author_id');
    }
}