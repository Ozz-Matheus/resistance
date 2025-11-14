<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameScoreController;

Route::get('/', function () {
    return view('welcome');
});

// Save Game
Route::post('/scores', [GameScoreController::class, 'store'])
    ->name('scores.store');

// Reset...
Route::get('clear', function () {

    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('config:cache');

    return redirect('/#clear');

})->name('clear');
