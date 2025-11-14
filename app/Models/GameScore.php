<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameScore extends Model
{
    protected $fillable = [
        'alias',
        'email',
        'phone',
        'score',
    ];
}
