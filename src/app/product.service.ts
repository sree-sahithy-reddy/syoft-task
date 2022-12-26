import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    token:any = localStorage.getItem('token');
    baseUrl:string = 'http://localhost:3000/v1';

  constructor(private http:HttpClient) { }

  getAllProducts() {
    return this.http.get(this.baseUrl + '/get_all_products',{
       headers: {
        Authorization: 'Bearer ' + this.token
       }
    })
  }

  addProduct(data:any) {
    return this.http.post(this.baseUrl + '/add_product',data,{
       headers: {
        Authorization: 'Bearer ' + this.token
       }
    })
  }

  deleteProduct(data:any) {
    return this.http.post(this.baseUrl + '/remove_product',data,{
        headers: {
         Authorization: 'Bearer ' + this.token
        }
     })
  }
}
