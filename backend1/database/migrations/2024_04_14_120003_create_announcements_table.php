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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('content');

            // ✅ Correction : Utilisation d'enum pour sécuriser les types de données
            // 'info' est le plus courant, 'urgent' peut déclencher une couleur rouge en React.
            $table->enum('type', ['info', 'urgent', 'event'])->default('info'); 

            // ✅ Correction : 'target' définit qui voit l'annonce. 
            // Puisqu'il n'y a pas d'interface élève/prof, on cible admin ou parent.
            $table->enum('target', ['parent', 'admin', 'all'])->default('all');

            $table->boolean('is_pinned')->default(false);

            // ✅ Ajout de dates pour automatiser l'affichage/disparition
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();

            // ✅ Relation avec l'auteur (l'admin qui crée l'annonce)
            $table->foreignId('author_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->timestamps();
            
            // ✅ Indexation pour la performance si tu as beaucoup d'annonces
            $table->index(['type', 'target', 'is_pinned']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};