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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            
            $table->string('title');
            $table->text('description')->nullable();

            // ✅ Correction : On lie le devoir à une matière réelle de ta table 'subjects'
            $table->foreignId('subject_id')
                  ->constrained('subjects')
                  ->cascadeOnDelete();

            // ✅ Correction : On lie le devoir à une classe spécifique
            $table->foreignId('class_id')
                  ->constrained('school_classes')
                  ->cascadeOnDelete();

            $table->date('due_date');

            // ✅ Le statut est utile pour l'affichage (ex: En cours / Terminé)
            $table->enum('status', ['pending', 'completed'])->default('pending');

            // ✅ Optionnel : Ajout d'un champ pour un lien vers un document (PDF de l'exercice)
            $table->string('file_path')->nullable();

            $table->timestamps();

            // Index pour charger rapidement les devoirs d'une classe
            $table->index(['class_id', 'due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};