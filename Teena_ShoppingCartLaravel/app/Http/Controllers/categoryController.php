<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\category;

class categoryController extends Controller
{
    public function index(){

        return category::all();
    }
    public function store(Request $request){
        $validator = $request->validate([
            'categoryName' => 'required|string'
        ]);
        if (!empty($validator = $request->all())) {
          $category_id = (new category())->createCategory((object)$request);
        }
    }
}
