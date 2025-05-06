<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = ['title', 'author', 'year', 'content', 'synopsis', 'cover_image', 'pages', 'slug'];

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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($book) {
            $book->slug = Str::slug($book->title);
        });

        static::updating(function ($book) {
            if ($book->isDirty('title')) {
                $book->slug = Str::slug($book->title);
            }
        });
    }

    // Mutador para limpiar el campo content automáticamente
    public function setContentAttribute($value)
    {
        $decodedValue = stripslashes($value);
        $this->attributes['content'] = $this->cleanText($decodedValue);
    }

    protected function cleanText(string $text): string
    {
        $text = preg_replace('/\r\n|\r|\n/', ' ', $text);
        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);
        return $text;
    }

}


