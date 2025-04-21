<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = ['title', 'author', 'year', 'content', 'synopsis', 'cover_image'];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'book_genre', 'book_id', 'genre_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
                    ->withPivot('progress')
                    ->withTimestamps();
    }
}


