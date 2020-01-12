import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    domain = environment.domain

    constructor(
      public http: HttpClient
    ) { }

    getAllReview(shop_id){
        return this.http.get<any>(`${this.domain}api/${shop_id}?action=shop_review`);
    }

    addShopReview(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'add_shop_review',user_id:data.user_id,shop_id:data.shop_id,rate:data.rate,message:data.message}, httpOptions
      )
    }

    checkUserAlreadyReviewd(user_id,shop_id){
      return this.http.get<any>(`${this.domain}api/${user_id}?action=check_shop_review&query_id=${shop_id}`);
    }
    checkUserAlreadyReviewdProd(user_id,product_id){
      return this.http.get<any>(`${this.domain}api/${user_id}?action=check_prod_review&query_id=${product_id}`);
    }

    updateShopReview(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'update_shop_review',user_id:data.user_id,shop_id:data.shop_id,rate:data.rate,message:data.message}, httpOptions
      )
    }
    updateProductReview(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'update_product_review',user_id:data.user_id,product_id:data.product_id,rate:data.rate,message:data.message}, httpOptions
      )
    }

    getAllProductReview(product_id){
      return this.http.get<any>(`${this.domain}api/${product_id}?action=product_review`);
    }

    addProductReview(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'add_product_review',user_id:data.user_id,product_id:data.product_id,rate:data.rate,message:data.message}, httpOptions
      )
    }
}