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

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Classes PUBLIC
Route::get('/classes', [ClassController::class, 'index']);


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // 🔐 Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/profile/update', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);

    // 📊 Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // 👨‍🎓 Students
    Route::apiResource('students', StudentController::class);

    // 📚 Assignments
    Route::apiResource('assignments', AssignmentController::class);

    // ⚠️ Absences
    Route::apiResource('absences', AbsenceController::class);

    // 👨‍👩‍👧 Parents
    Route::apiResource('guardians', GuardianController::class);

    // 🚌 Bus
    Route::apiResource('buses', BusController::class);

    // 💰 Payments
    Route::apiResource('payments', PaymentController::class);
    Route::patch('/payments/{id}/toggle', [PaymentController::class, 'toggle']);

    // 📢 Announcements
    Route::apiResource('announcements', AnnouncementController::class);

    // 📅 Timetable
    Route::apiResource('timetables', TimetableController::class);

    // 💬 Messages
    Route::get('/contacts', [MessageController::class, 'contacts']);
    Route::get('/messages/{userId}', [MessageController::class, 'conversation']);
    Route::post('/messages', [MessageController::class, 'store']);

    // 📈 Reports
    Route::get('/reports', [ReportController::class, 'show']);
    Route::get('/reports/pdf', [ReportController::class, 'pdf']);

    // ⚙️ Settings
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings', [SettingsController::class, 'store']);

    // 📊 Statistics
    Route::get('/statistics', [StatisticsController::class, 'index']);
});
