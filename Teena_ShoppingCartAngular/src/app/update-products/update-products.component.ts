import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Configuration } from './../configuration';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  config = new Configuration();
  isLoggedIn: boolean;
  productDetail: FormGroup;
  productData: any;
  uploadedImage: any;
  formData = new FormData;

  obj: object = {
    price: "",
    name: "",
    image_file: "",
    category: "" 
  };

  constructor(private route: Router, private loginCheck: ApiService,
    private http: HttpClient,
    private products: ApiService) {
    this.productDetail = new FormGroup({
      price: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      image_file: new FormControl(null, Validators.required),
      category: new FormControl("", Validators.required)
    });
  }
  ngOnInit() {
  }

  img(event) {
    if (event.target.files.length > 0) {
      this.uploadedImage = event.target.files[0];
    }
  }

  updateProducts() {
    console.log(this.obj);
    console.log(this.productDetail.value)
    this.products.editProducts(this.toFormData(this.productDetail.value)).subscribe(val => {
      console.log(val)
    })
  }
  
  toFormData(formValue) {
    const formData = new FormData();
    for(let key in formValue) {
      if(key === 'image_file') {
        formData.append(key, formValue[key][0])
      } 
      else
      formData.append(key, formValue[key]);
    }
    return formData;
  }

}