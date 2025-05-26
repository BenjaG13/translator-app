<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;

class BookUserController extends Controller
{


    


    public function getProgress($slug)
    {
        
        $user = Auth::user();
        $book = Book::where('slug', $slug)->firstOrFail();
        
        // Verificar si el usuario ya tiene un registro de progreso para este libro
        $bookUser = $user->books()->where('book_id', $book->id)->first();

        if (!$bookUser) {
            // Si no existe, crear el registro con progress = 1
            $user->books()->attach($book->id, ['progress' => 1]);
            $progress = 1;
        } else {
            // Si existe, obtener el progreso actual
            $progress = $bookUser->pivot->progress;
        }

        return response()->json(['progress' => $progress]);
    }

    public function updateProgress(Request $request, $slug)
    {
        $user = Auth::user();
        $book = Book::where('slug', $slug)->firstOrFail();
        $progress = $request->input('progress');

        // Validación básica
        $request->validate([
            'progress' => 'required|integer|min:1'
        ]);

        // Actualizar o crear el registro si no existe
        $user->books()->syncWithoutDetaching([$book->id => ['progress' => $progress]]);

        return response()->json(['message' => 'Progreso actualizado correctamente']);
    }
}
