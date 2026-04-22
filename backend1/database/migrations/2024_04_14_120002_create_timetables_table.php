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

            // ✅ Utiliser un ENUM pour les jours évite les erreurs de frappe (ex: "Lundi" vs "monday")
            // C'est beaucoup plus facile à gérer côté Frontend pour le filtrage.
            $table->enum('day', ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']);

            $table->time('start_time');
            $table->time('end_time');

            // ✅ Relation avec la classe
            $table->foreignId('class_id')
                  ->constrained('school_classes')
                  ->cascadeOnDelete();

            // ✅ Relation avec la matière (Subject)
            $table->foreignId('subject_id')
                  ->nullable() 
                  ->constrained('subjects') // Assure-toi que la table 'subjects' existe
                  ->nullOnDelete();

            // ✅ Ajout d'un champ pour le nom du prof (puisqu'ils n'ont pas de compte User)
            // Cela permet aux parents de voir qui enseigne sans avoir de table complexe.
            $table->string('teacher_name')->nullable();

            $table->string('room')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetables');
    }
};