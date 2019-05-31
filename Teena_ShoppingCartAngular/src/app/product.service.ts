import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  addProductToCart(products: any){
    localStorage.setItem("product", JSON.stringify(products));
  }
  getProductFromCart(){
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart(){
    return localStorage.removeItem("product");
  }
  errorHandler(error:Response){
    console.log(error);
    return throwError(error);
  }
}
