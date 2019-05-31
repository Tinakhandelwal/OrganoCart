import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loggedIn =  false;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
  }

  onLoginUser(e: { controls: { email: { value: any; }; password: { value: any; }; }; }) {
    console.log('logged in');
    const user = {
      email: e.controls.email.value,
      password: e.controls.password.value
    };
    this.api.loginUser(user);
     console.log(user);
    this.api.isUserLoggedIn.subscribe(val => {
      this.loggedIn = val;
      console.log(this.loggedIn)
      const user = JSON.parse(localStorage.getItem('user'))
      if (this.loggedIn && user.role === 1) {
        this.route.navigate(['/dashboard']);
      } 
      if(this.loggedIn && user.role === 0) {
        this.route.navigate(['/admindashboard']);
      }
    })
  }

}
