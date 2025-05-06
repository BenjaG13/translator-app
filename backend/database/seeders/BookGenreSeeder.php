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
        ];

        foreach ($bookGenres as $relation) {
            DB::table('book_genre')->insert($relation);
        }
    }
}
