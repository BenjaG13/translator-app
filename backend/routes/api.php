<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\TranslationController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/books/{slug}/progress', [BookUserController::class, 'getProgress']);
    Route::post('/books/{slug}/progress', [BookUserController::class, 'updateProgress']);
    Route::get('/mybooks', [BookUserController::class, 'myBooks']); // <-- NUEVA RUTA

    Route::post('logout', [UserController::class, 'logout']);
});


Route::apiResource('books', BookController::class)->parameters([
    'books' => 'slug',
]);

Route::get('genres', [GenreController::class, 'index']);

Route::get('/books/{slug}/sentences', [BookController::class, 'getSentences']);

Route::get('/genres-with-books', [GenreController::class, 'indexWithBooks']);


Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

Route::post('/translate', [TranslationController::class, 'translate']);

Route::get('/health', function () { return response()->json(['ok' => true]); });


