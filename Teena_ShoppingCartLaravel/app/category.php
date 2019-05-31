<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $fillable = [ 'categoryName' ];
    
    public function products()
    {
        return $this->hasMany('App\Product');
    }

 public function createCategory($request)
{
    $create = self::create(
        [
            'categoryName' => $request['categoryName'],
        ]
    );
    return $create->category_id;
}
}
