<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookGenres = [
            ['book_id' => 1, 'genre_id' => 1], // Cien años de soledad - Ficción
            ['book_id' => 1, 'genre_id' => 4], // Cien años de soledad - Fantasía
            ['book_id' => 2, 'genre_id' => 3], // 1984 - Ciencia ficción
            ['book_id' => 3, 'genre_id' => 4], // El señor de los anillos - Fantasía

             // 4 -> Cien años de soledad
            ['book_id' => 4, 'genre_id' => 1], // Ficción
            ['book_id' => 4, 'genre_id' => 8], // Historia (opcional)

            // 5 -> 1984 (si lo vuelves a insertar / duplicado) - si ya existe, evita duplicarlo
            ['book_id' => 5, 'genre_id' => 3], // Ciencia ficción
            ['book_id' => 5, 'genre_id' => 1], // Ficción

            // 6 -> El gran Gatsby
            ['book_id' => 6, 'genre_id' => 1], // Ficción
            ['book_id' => 6, 'genre_id' => 6], // Romance

            // 7 -> Crimen y castigo
            ['book_id' => 7, 'genre_id' => 1], // Ficción
            ['book_id' => 7, 'genre_id' => 5], // Misterio

            // 8 -> Fahrenheit 451
            ['book_id' => 8, 'genre_id' => 3], // Ciencia ficción
            ['book_id' => 8, 'genre_id' => 1], // Ficción

            // 9 -> Matar a un ruiseñor
            ['book_id' => 9, 'genre_id' => 1], // Ficción
            ['book_id' => 9, 'genre_id' => 8], // Historia (opcional)

            // 10 -> La carretera
            ['book_id' => 10, 'genre_id' => 1], // Ficción
            ['book_id' => 10, 'genre_id' => 3], // Ciencia ficción / post-apocalíptico

            // 11 -> El nombre del viento
            ['book_id' => 11, 'genre_id' => 4], // Fantasía
            ['book_id' => 11, 'genre_id' => 1], // Ficción

            // 12 -> La chica del tren
            ['book_id' => 12, 'genre_id' => 5], // Misterio
            ['book_id' => 12, 'genre_id' => 1], // Ficción
        ];

        foreach ($bookGenres as $relation) {
            DB::table('book_genre')->insert($relation);
        }
    }
}
// prueba pp
