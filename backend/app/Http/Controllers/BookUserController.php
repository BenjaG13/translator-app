<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookUserController extends Controller
{


    
    public function getProgress($slug)
    {
        $user = Auth::user();
        $book = Book::where('slug', $slug)->firstOrFail();
        $progress = $user->books()->where('book_id', $book->id)->first()->pivot->progress ?? 1;
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

        $user->books()->updateExistingPivot($book->id, ['progress' => $progress]);
        return response()->json(['message' => 'Progreso actualizado correctamente']);
    }
}
