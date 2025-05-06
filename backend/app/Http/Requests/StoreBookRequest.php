<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'year' => 'required|integer|min:1000|max:' . date('Y'),
            'content' => 'required|string',
            'pages' => 'required|integer|min:1',
            'synopsis' => 'required|string|max:1000',
            'cover_image' => 'required|string|url',
            'genres' => 'sometimes|array|exists:genres,id',
            'genres.*' => 'integer|exists:genres,id',
        ];
    }
}
