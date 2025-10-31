<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslationController extends Controller
{
    public function translate(Request $request)
    {
        
        $request->validate([
            'text' => 'required|string',
            'source' => 'required|string',
            'target' => 'required|string',
        ]);
        
        $text = $request->input('text');
        $source = $request->input('source');
        $target = $request->input('target');

        $libreTranslateUrl = 'http://libretranslate:5000/translate';                                                                                                                        

        try {
            $response = Http::post($libreTranslateUrl, [
                'q' => $text,
                'source' => $source,
                'target' => $target,
            ]);
            
            
            if ($response->successful()) {
                return response()->json(['translation' => $response->json()['translatedText']]);
            } else {
                
                return response()->json(['error' => 'Error en la traducción'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al conectar con LibreTranslate'], 500);
        }
    }
}


