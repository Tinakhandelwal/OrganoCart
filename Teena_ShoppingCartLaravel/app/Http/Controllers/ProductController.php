<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use File;


class ProductController extends Controller
{
    public function index(){

        return Product::all();
    }
    public function show($id){
        return Product::find($id);
    }
    public function store(Request $request){
      try {
        $file_name = $_FILES['image_file']['name'];
        $file_tmp =$_FILES['image_file']['tmp_name'];
        $data = array_merge($request->all(), ['image_file' => $file_name]);
        Product::create($data);
        move_uploaded_file($file_tmp,app_path()."/../public/my_images/".$file_name);
        return 'success';
      } catch(Exception $e) {
            print_r($e);die;
      }
    }
    public function update(Request $request, $id){
        try{
        $file_name = $_FILES['image_file']['name'];
        $file_tmp =$_FILES['image_file']['tmp_name'];
        $data = array_merge($request->all(), ['image_file' => $file_name]);
        $product = Product::findOrFail($id);
        $product->update($data);
        move_uploaded_file($file_tmp,app_path()."/../public/my_images/".$file_name);
        return $product;
        }catch(Exception $e) {
            print_r($e);die;
      }
    }
    public function delete(Request $request){
        $id = $request['id'];
        $product = Product::findOrFail($id);
        $product->delete();

        return 204;
    }
}
