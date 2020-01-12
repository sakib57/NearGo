import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }

  get_all_shop(){
      return this.http.get<any>(`${this.domain}api?action=shop`);
  }
  get_cat_shop(cat_id){
      return this.http.get<any>(`${this.domain}api/${cat_id}?action=cat_shop`);
  }

  shop_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=shop`);
  }

  addWishList(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'add_shop_wish',user_id:data.user_id,shop_id:data.shop_id}, httpOptions
    )
  }

  checkWishList(data){
    return this.http.get<any>(`${this.domain}api/${data.user_id}?action=check_store_wishlist&query_id=${data.shop_id}`);
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
      { action: 'rm_shop_wish',user_id:data.user_id,shop_id:data.shop_id}, httpOptions
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
      { action: 'update_shop_rating',shop_id:data.shop_id,total_rating:data.total_rating,total_people_rated:data.total_people_rated}, httpOptions
    )
  }

  getMyShops(user_id){
    return this.http.get<any>(`${this.domain}api/${user_id}?action=my_shops`);
  }

  
}