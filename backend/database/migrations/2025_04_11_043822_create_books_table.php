<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Título del libro
            $table->string('slug', 255)->unique(); // Slug único para el libro
            $table->string('author'); // Autor del libro
            $table->integer('year'); // Año de publicación
            $table->longText('content');
            $table->integer('pages'); // Número de páginas
            $table->text('synopsis'); // Sinopsis del libro
            $table->string('cover_image'); //portada del libro    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
