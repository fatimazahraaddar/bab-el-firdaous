<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timetables', function (Blueprint $table) {
            $table->id();

            $table->string('day');

            $table->time('start_time');
            $table->time('end_time');

            // ✅ relations propres
            $table->foreignId('class_id')
                  ->constrained('school_classes')
                  ->cascadeOnDelete();

            $table->foreignId('subject_id')
                  ->nullable() // 🔥 important si pas encore subjects
                  ->constrained()
                  ->nullOnDelete();

            $table->string('room')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetables');
    }
};