<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TranslationController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/books/{slug}/progress', [BookUserController::class, 'getProgress']);
    Route::post('/books/{slug}/progress', [BookUserController::class, 'updateProgress']);
    
    Route::post('logout', [UserController::class, 'logout']);
});


Route::apiResource('books', BookController::class)->parameters([
    'books' => 'slug',
]);

Route::get('/books/{slug}/sentences', [BookController::class, 'getSentences']);


Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

Route::post('/translate', [TranslationController::class, 'translate']);



