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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();

            // ✅ Relation avec l'étudiant
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            $table->date('date');

            // ✅ Correction : Utiliser un enum pour le statut
            // 'late' (retard) est indispensable pour la gestion scolaire !
            $table->enum('status', ['absent', 'late'])->default('absent');

            // ✅ Justification
            $table->boolean('is_justified')->default(false); 
            $table->text('reason')->nullable(); // Ex: Certificat médical, raison familiale...

            // ✅ Optionnel : Heure d'arrivée si c'est un retard
            $table->time('arrival_time')->nullable();

            $table->timestamps();

            // Indexation pour retrouver rapidement les absences d'un élève à une date précise
            $table->index(['student_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};