<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\WorkshopController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/workshops', [WorkshopController::class, 'index']);
Route::get('/workshops/{workshop}', [WorkshopController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-registrations', [RegistrationController::class, 'index']);
    Route::post('/workshops/{workshop}/register', [RegistrationController::class, 'store']);
    Route::delete('/registrations/{registration}', [RegistrationController::class, 'destroy']);

    Route::middleware('organizer')->group(function () {
        Route::post('/workshops', [WorkshopController::class, 'store']);
        Route::put('/workshops/{workshop}', [WorkshopController::class, 'update']);
        Route::delete('/workshops/{workshop}', [WorkshopController::class, 'destroy']);
    });
});