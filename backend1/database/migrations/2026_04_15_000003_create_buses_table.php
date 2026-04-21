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
        Schema::create('buses', function (Blueprint $table) {
            $table->id();

            // ✅ Identifiant unique du bus (ex: BUS-01, Scolaire-A)
            $table->string('bus_number')->unique();

            // ✅ Infos conducteur
            $table->string('driver_name');
            $table->string('driver_phone')->nullable(); // 🔥 Vital pour que l'admin puisse l'appeler

            // ✅ Capacité et zone
            $table->integer('capacity'); // Nombre de sièges
            $table->string('route_name')->nullable(); // ex: "Quartier Maârif", "Zone Nord"

            // ✅ Statut du bus
            $table->enum('status', ['active', 'maintenance', 'inactive'])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buses');
    }
};