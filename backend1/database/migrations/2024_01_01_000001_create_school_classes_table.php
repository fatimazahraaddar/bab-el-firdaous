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
        Schema::create('school_classes', function (Blueprint $table) {
            $table->id();

            // ✅ unique() est crucial ici : on ne veut pas deux classes "6ème A"
            $table->string('name')->unique();

            // ✅ Utiliser un enum pour le niveau permet de filtrer facilement 
            // côté React (Primaire, Collège, Lycée)
            $table->enum('level', ['maternelle', 'primaire', 'college', 'lycee']);

            // ✅ Optionnel : Capacité maximale de la classe
            $table->integer('capacity')->default(30);

            // ✅ Optionnel : Une description ou un local spécifique (ex: Salle 102)
            $table->string('room_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_classes');
    }
};