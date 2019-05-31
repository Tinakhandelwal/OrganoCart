import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoggedIn: boolean;
  categories: any;
  products: any;
  columns: any;
  productAddedToCart: any;
  col: any;
  constructor(private loginCheck: ApiService, private route: Router, private fetchData: ApiService
    , private productService: ProductService) { }

  ngOnInit() {
    this.loginCheck.isUserLoggedIn.subscribe(val => {
      this.isLoggedIn = val
    })
    this.fetchData.getCategories().subscribe(categories => {
      this.categories = categories;
      this.columns = Object.keys(categories[0]);
      console.log(this.columns);
      console.log(categories);
    });
    this.fetchData.getProducts().subscribe(products => {
      this.products = products;
      this.col = Object.keys(this.products[0]);
      console.log(this.col);
      console.log(products);
    });
  }
  OnAddCart() {
    this.fetchData.getProducts().subscribe(products => {
      this.products = products;
      console.log(products);
      this.productAddedToCart = this.productService.getProductFromCart();
      if (this.productAddedToCart == null) {
        this.productAddedToCart = [];
        this.productAddedToCart.push(products);
        this.productService.addProductToCart(this.productAddedToCart);
      }
    });
  }

      // this.alert.push(
      //   id: 1,
      //   type: 'success',
      //   message: 'Product added to cart'
      // )
 }
