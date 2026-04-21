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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            // ✅ Relations avec les utilisateurs (Sender/Receiver)
            $table->foreignId('sender_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('receiver_id')->constrained('users')->cascadeOnDelete();

            // ✅ Contenu du message
            $table->text('text');

            // ✅ Gestion des fichiers améliorée
            $table->string('file_path')->nullable(); // Chemin du fichier
            $table->string('file_name')->nullable(); // Nom d'origine (ex: justificatif.pdf)
            $table->string('file_type')->nullable(); // image, pdf, etc.

            // ✅ État de lecture et suppression
            $table->timestamp('read_at')->nullable(); // Plus précis qu'un boolean
            
            // ✅ "Soft delete" individuel (pour que l'un puisse supprimer sans effacer chez l'autre)
            $table->boolean('deleted_by_sender')->default(false);
            $table->boolean('deleted_by_receiver')->default(false);

            $table->timestamps();

            // ✅ Indexation pour charger les conversations rapidement
            $table->index(['sender_id', 'receiver_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};