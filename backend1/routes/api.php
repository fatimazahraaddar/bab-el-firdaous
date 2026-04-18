<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});


Route::post('/login', [AuthController::class, 'login']);

*/


// 🔓 Routes publiques (pas d'authentification requise)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔐 Routes protégées (nécessitent un token Sanctum valide)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});



Route::get('/test-debug', function() {
    return response()->json([
        'debug_enabled' => config('app.debug'),
        'app_env' => config('app.env'),
        'test' => 'Si vous voyez ceci, Laravel fonctionne !'
    ]);
});