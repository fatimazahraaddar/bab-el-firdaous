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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            // ✅ Utilisation de foreignId pour une relation propre avec les étudiants
            // cascadeOnDelete : si l'élève est supprimé, ses factures le sont aussi.
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            // ✅ Ajout d'une relation avec le parent (celui qui doit payer)
            // Cela facilite énormément les requêtes côté "Interface Parent".
            $table->foreignId('parent_id')
                  ->constrained('parents')
                  ->cascadeOnDelete();

            $table->string('description'); // ex: Frais d'inscription, Cantine Mai...
            $table->decimal('amount', 10, 2);

            // ✅ Ajout de 'pending' pour les paiements en attente de validation par l'admin
            $table->enum('status', ['paid', 'unpaid', 'pending', 'late'])->default('unpaid');

            $table->date('due_date');      // Date limite
            $table->date('paid_date')->nullable(); // Date réelle du paiement

            // ✅ Ajout du mode de paiement pour la comptabilité
            $table->string('payment_method')->nullable(); // virement, espèces, carte

            $table->timestamps();

            // Index pour accélérer la recherche des factures impayées
            $table->index(['status', 'due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};