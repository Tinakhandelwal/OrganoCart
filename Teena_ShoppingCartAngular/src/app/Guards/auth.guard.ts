import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private route: Router) {}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   const auth = localStorage.getItem('access_token') ? true : false;
  //   if(!auth) {
  //     this.route.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const auth = !!localStorage.getItem('access_token');
    const check = JSON.parse(localStorage.getItem('userrole'));
    if (auth) {
      if (route.data.roleCustomer && route.data.roleCustomer.indexOf(check) !== -1) {
        return true;
      }
      if (route.data.roleAdmin && route.data.roleAdmin.indexOf(check) !== -1) {
        return true;
      }
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
