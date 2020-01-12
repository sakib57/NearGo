import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }
  get_all_product(){
    return this.http.get<any>(`${this.domain}api?action=product`);
  }
  get_cat_product(cat_id){
    return this.http.get<any>(`${this.domain}api/${cat_id}?action=cat_product`);
  }
  get_shopwise_product(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=shop_wise_product`);
  }

  product_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=product`);
  }

  addWishList(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'add_product_wish',user_id:data.user_id,product_id:data.product_id}, httpOptions
    )
  }

  checkWishList(data){
    return this.http.get<any>(`${this.domain}api/${data.user_id}?action=check_product_wishlist&query_id=${data.product_id}`);
    //return data
  }

  rmWishList(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'rm_product_wish',user_id:data.user_id,product_id:data.product_id}, httpOptions
    )
  }

  updateRating(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'update_product_rating',product_id:data.product_id,total_rating:data.total_rating,total_people_rated:data.total_people_rated}, httpOptions
    )
  }

  getMyProducts(user_id){
    return this.http.get<any>(`${this.domain}api/${user_id}?action=my_products`);
  }
}