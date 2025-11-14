<?php

namespace App\Http\Controllers;

use App\Models\GameScore;
use Illuminate\Http\Request;

class GameScoreController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'alias' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:10'],
            'score' => ['required', 'integer', 'min:0'],
        ]);

        GameScore::create($data);

        return response()->json(['ok' => true]);
    }
}
