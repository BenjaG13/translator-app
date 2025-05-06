<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = ['Ficción', 'No ficción', 'Ciencia ficción', 'Fantasía', 'Misterio', 'Romance', 'Biografía', 'Historia'];
        foreach ($genres as $genre) {
            Genre::create(['name' => $genre]);
        }
    }
}
