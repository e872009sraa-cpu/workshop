<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    protected $fillable = ['user_id', 'title', 'description', 'date'];


    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
