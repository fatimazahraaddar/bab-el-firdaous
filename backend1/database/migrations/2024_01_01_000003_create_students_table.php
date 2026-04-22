<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('phone')->nullable()->after('guardian_id');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('level');
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['M', 'F'])->nullable();

            // ⚠️ LA CORRECTION EST ICI : 
            // On remplace 'guardians' par 'parents' car c'est le nom de ta table
            $table->foreignId('guardian_id')->constrained('parents')->cascadeOnDelete();

            // Vérifie que ce nom correspond bien à ton fichier school_classes
            $table->foreignId('class_id')->constrained('school_classes')->cascadeOnDelete();

            $table->string('transport_type')->default('private');
            
            // On met nullOnDelete pour ne pas supprimer l'élève si le bus est supprimé
            $table->foreignId('bus_id')->nullable()->constrained('buses')->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
      Schema::table('students', function (Blueprint $table) {
        $table->dropColumn('phone');
    });
        Schema::dropIfExists('students');
    }
};