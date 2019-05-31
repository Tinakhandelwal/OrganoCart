import { Injectable } from '@angular/core';
import {Configuration} from './configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  config = new Configuration();
  checkStatus = new BehaviorSubject<boolean>(true);
  isUserLoggedIn = this.checkStatus.asObservable();

  constructor(private http: HttpClient) { }
  checkLogin(){
    const token = localStorage.getItem('access_token');
    if(token){
    this.checkStatus.next(true);
    }
    else{
      this.checkStatus.next(false);
    }
  }

  registerUser(user: any) {
    return this.http
      .post(this.config.apiUrl + '/register',
        user).subscribe(uservalue => console.log(uservalue));
  }

  loginUser(user: any) {
    return this.http.post(this.config.apiUrl + '/login', user)
      .subscribe((checkUser: any) => {
        console.log(checkUser)
        if (checkUser[1].original.access_token) {
          window.alert(`${checkUser[0].original.name} Logged in Successfully`);
          localStorage.setItem('access_token', checkUser[1].original.access_token);
          localStorage.setItem('user', JSON.stringify(checkUser[0].original));
          localStorage.setItem('userrole', JSON.stringify(checkUser[0].original.role));          
          this.checkLogin();
        }
      });
  }
  logoutUser(){
   return this.http.post(this.config.apiUrl + '/logout',{token: localStorage.getItem('access_token')})
   .subscribe(message =>{
     if(message){
      window.alert("You are Successfully Logged Out");
       localStorage.removeItem('access_token');
       localStorage.removeItem('user');
       localStorage.removeItem('userrole');
       this.checkLogin();
     }
   });
  }

  getProducts() {
    return this.http.get(this.config.apiUrl1 + '/products');
  }
  postProducts(productData: object) {
    return this.http.post(this.config.apiUrl1 + '/products', productData)
  }
 editProducts(productData: object) {
  return this.http.post(this.config.apiUrl1 + '/products{id}', productData)
  }
  getCategories() {
    return this.http.get(this.config.apiUrl1 + '/category');
  }
  deleteProducts(id) {
    console.log(id);
    return this.http.post(this.config.apiUrl1 + '/deleteproducts', {'id': id});
  }
}