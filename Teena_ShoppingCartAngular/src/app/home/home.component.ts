import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  categories: any;
  products: any;
  columns: any;
  col:any;
  constructor(private loginCheck: ApiService,private route: Router,private fetchData: ApiService) { }

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
}