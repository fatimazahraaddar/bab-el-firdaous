<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\GuardianController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\BusController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\TimetableController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\SettingsController;
use App\Http\Controllers\API\StatisticsController;
use App\Http\Controllers\API\AbsenceController;
use App\Http\Controllers\API\AssignmentController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Middleware\ManualAuth;

/*
|--------------------------------------------------------------------------
| ROUTES PUBLIQUES (Accessibles sans connexion)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Consultation des classes (utile pour l'inscription par exemple)
    Route::get('/classes', [ClassController::class, 'index']);
    Route::get('/subjects', [SubjectController::class, 'index']);


/*
|--------------------------------------------------------------------------
| ROUTES PROTÉGÉES (Nécessitent un Token Sanctum valide)
|--------------------------------------------------------------------------
*/

Route::middleware(ManualAuth::class)->group(function () {

    // 🔐 Gestion du compte
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/profile/update', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);

    // 📊 Dashboard (Données globales pour l'accueil)
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // 👨‍🎓 Ressources API (Génère automatiquement index, store, show, update, destroy)
    Route::apiResource('students', StudentController::class);
    Route::apiResource('assignments', AssignmentController::class);
    Route::apiResource('absences', AbsenceController::class);
    Route::apiResource('guardians', GuardianController::class);
    Route::apiResource('buses', BusController::class);
    Route::apiResource('announcements', AnnouncementController::class);
    Route::apiResource('timetables', TimetableController::class);

    // 💰 Gestion des paiements
    Route::apiResource('payments', PaymentController::class);
    Route::patch('/payments/{id}/toggle', [PaymentController::class, 'toggle']);

    // 💬 Système de messagerie
    Route::get('/contacts', [MessageController::class, 'contacts']);
    Route::get('/messages/{userId}', [MessageController::class, 'conversation']);
    Route::post('/messages', [MessageController::class, 'store']);

    // 📈 Rapports et PDF
    Route::get('/reports', [ReportController::class, 'show']);
    Route::get('/reports/pdf', [ReportController::class, 'pdf']);

    // ⚙️ Paramètres de l'application
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings', [SettingsController::class, 'store']);

    // 📊 Statistiques avancées
    Route::get('/statistics', [StatisticsController::class, 'index']);
    //Subjects

});
