<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'price', 'name', 'category', 'image_file'
    ];
    public function category()
    {
        return $this->belongsTo('App\category');
    }
}
