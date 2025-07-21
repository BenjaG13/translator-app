<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Book::with('genres');

        // Filtrar por nombre si se proporciona el parámetro 'search'
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('title', 'like', '%' . $searchTerm . '%');
        }

        // Filtrar por género si se proporciona el parámetro 'genre'
        if ($request->has('genre')) {
            $genre = $request->input('genre');
            $query->whereHas('genres', function ($q) use ($genre) {
                $q->where('name', $genre);
            });
        }

        $books = $query->get();
        return response()->json($books, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $book = Book::create($validated);

        if ($request->has('genres') && is_array($request->input('genres'))) {
            $book->genres()->sync($request->input('genres'));
        }

        return response()->json($book->load('genres'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): JsonResponse
    {
        $book = Book::where('slug', $slug)->with('genres')->firstOrFail();
        return response()->json($book, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, string $slug): JsonResponse
    {
        $book = Book::where('slug', $slug)->firstOrFail();
        $validated = $request->validated();
        $book->update($validated);

        if ($request->has('genres') && is_array($request->input('genres'))) {
            $book->genres()->sync($request->input('genres'));
        }

        return response()->json($book->load('genres'), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug): JsonResponse
    {
        $book = Book::where('slug', $slug)->firstOrFail();
        $book->genres()->detach();
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully'], 200);
    }

    public function getSentences(string $slug): JsonResponse
    {
        try {
            // Buscar el libro por slug
            $book = Book::where('slug', $slug)->firstOrFail();

            // Crear un archivo temporal y escribir el contenido
            $tempFile = tempnam(sys_get_temp_dir(), 'book_content_');
            file_put_contents($tempFile, $book->content);

            // Escapar la ruta del archivo temporal
            $escapedFilePath = escapeshellarg($tempFile);

            // Ejecutar el script de Python pasando la ruta del archivo
            $command = "/opt/venv/bin/python /var/www/scripts/split_sentences.py {$escapedFilePath} 2>&1";
            $output = [];
            $exitCode = null;
            exec($command, $output, $exitCode);

            // Eliminar el archivo temporal
            unlink($tempFile);

            // Verificar si hubo un error
            if ($exitCode !== 0) {
                return response()->json(['error' => 'Error al procesar el texto: ' . implode("\n", $output)], 500);
            }

            // Convertir la salida en un array de oraciones
            $sentences = array_filter($output, function ($sentence) {
                return !empty($sentence);
            });

            // Devolver las oraciones como JSON
            return response()->json(['sentences' => array_values($sentences)], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Libro no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

}