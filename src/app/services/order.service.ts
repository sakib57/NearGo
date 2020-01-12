import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  domain = environment.domain

  constructor(
    public http: HttpClient,
  ) { }
    

    placeOrder(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { 
            action: 'place_order',
            user_id:data.user_id,
            sub_total_amount:data.sub_total_amount,
            shipping_amount:data.shipping_amount,
            grand_total_amount:data.grand_total_amount,
            shipping_address: data.shipping_address,
            shipping_phone: data.phone
        }, httpOptions)
    }
    placeOrderProduct(order_id,data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { 
            action: 'place_order_product',
            order_id:order_id,
            data:data

        }, httpOptions)
    }

    myOrder(user_id){
      return this.http.get<any>(`${this.domain}api/${user_id}?action=myOrder`)
    }
}