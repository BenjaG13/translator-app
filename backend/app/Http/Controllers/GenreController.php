<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Models\Genre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(): JsonResponse
    {
        try {
            $genres = Genre::all();
            return response()->json($genres, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cargar los géneros: ' . $e->getMessage()], 500);
        }
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
    public function store(StoreGenreRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Genre $genre)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        //
    }

     public function indexWithBooks(Request $request): JsonResponse
    {
        $limitPerGenre = (int) $request->query('limit', 12); // default 12

        //cache por x segundos para rendimiento
        $cacheKey = "genres_with_books_{$limitPerGenre}";
        $data = Cache::remember($cacheKey, 60, function () use ($limitPerGenre) {
            return Genre::query()
                ->with(['books' => function ($q) use ($limitPerGenre) {
                    $q->with('genres')->take($limitPerGenre);
                }])
                ->get();
        });

        return response()->json($data, 200);
    }
}
