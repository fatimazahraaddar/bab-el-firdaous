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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();

            // ✅ unique() empêche d'avoir deux fois "Mathématiques" par erreur
            $table->string('name')->unique();

            // ✅ Optionnel : slug pour des URLs plus propres côté React (ex: /matiere/mathematiques)
            $table->string('slug')->unique()->nullable();

            // ✅ Optionnel : couleur pour l'affichage dans l'emploi du temps (Timetable)
            // Permet d'afficher les maths en bleu, le sport en vert, etc.
            $table->string('color')->default('#3490dc'); 

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};