<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
          $table->id();

          $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // 🔥 IMPORTANT

          $table->string('level');
          $table->unsignedBigInteger('class_id');
          $table->foreignId('guardian_id')->constrained('parents')->onDelete('cascade');

          $table->string('phone')->nullable();
          $table->string('address')->nullable();

          $table->string('transport')->nullable();
          $table->unsignedBigInteger('bus_id')->nullable();

          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
