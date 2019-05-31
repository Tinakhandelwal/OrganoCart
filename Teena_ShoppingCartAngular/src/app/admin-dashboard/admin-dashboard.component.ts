import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  isLoggedIn: boolean;
  data: any;
  columns: any;

  constructor(private loginCheck: ApiService,
    private route: Router,
    private fetchData: ApiService) { }

  ngOnInit() {
    this.loginCheck.isUserLoggedIn.subscribe(val => {
      this.isLoggedIn = val
    })
    this.fetchData.getProducts().subscribe(data => {
      this.data = data;
      this.columns = Object.keys(this.data[0]);
      console.log(this.columns);
      console.log(data);
    });
  }
  deleteData(id) {
    if (confirm("Do you want to delete record ?")) {
      this.fetchData.deleteProducts(id).subscribe(val => {
        console.log(val)
      })
      // Deleting the element
      console.log('inside delete id')
      console.log(id)
      this.data.splice(id - 1, 1);
    } else {
      console.log('not deleted');
    }
  }
  goProducts() {
    this.route.navigate(['addproducts']);
  }
  updateProducts() {
    this.route.navigate(['updateproducts']);
  }

}
