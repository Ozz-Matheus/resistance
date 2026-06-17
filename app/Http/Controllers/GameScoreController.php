<?php

namespace App\Http\Controllers;

use App\Models\GameScore;
use Illuminate\Http\Request;

class GameScoreController extends Controller
{
    public function index()
    {
        // Controlamos el límite desde el .env, con fallback a 10
        $limit = config('app.leaderboard_limit', env('LEADERBOARD_LIMIT', 10));

        $scores = GameScore::select('alias', 'score')
            ->orderBy('score', 'desc')
            ->take($limit)
            ->get();

        return view('leaderboard', compact('scores'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'alias' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'digits:10'],
            'score' => ['required', 'integer', 'min:0'],
        ]);

        GameScore::create($data);

        return response()->json(['ok' => true]);
    }
}
