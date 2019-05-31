import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestGuard } from './Guards/guest.guard';
import { AuthGuard } from './Guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { UpdateProductsComponent } from './update-products/update-products.component';

const routes: Routes = [
 { path:'',
 component:HomeComponent
},
{
  path:'login',
  component:LoginComponent,
  canActivate: [GuestGuard]
},
{
  path:'register',
  component:RegisterComponent,
  canActivate: [GuestGuard]

},
{
  path:'dashboard',
  component:DashboardComponent,
  canActivate: [AuthGuard],
  data: {roleCustomer: '1'}
},
{
  path:'admindashboard',
  component:AdminDashboardComponent,
  canActivate: [AuthGuard],
  data: {roleAdmin: '0'}
},
{
  path:'addproducts',
  component:AddProductsComponent,
},
{
  path:'updateproducts',
  component:UpdateProductsComponent,
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
