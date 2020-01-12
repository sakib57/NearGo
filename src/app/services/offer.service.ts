import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }
  get_all_offer(){
    return this.http.get<any>(`${this.domain}api?action=offer`);
  }
  get_cat_offer(cat_id){
    return this.http.get<any>(`${this.domain}api/${cat_id}?action=cat_offer`);
  }

  offer_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=offer`);
  }

  addWishList(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'add_offer_wish',user_id:data.user_id,offer_id:data.offer_id}, httpOptions
    )
  }

  checkWishList(data){
    return this.http.get<any>(`${this.domain}api/${data.user_id}?action=check_offer_wishlist&query_id=${data.offer_id}`);
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
      { action: 'rm_offer_wish',user_id:data.user_id,offer_id:data.offer_id}, httpOptions
    )
  }

  updateInterestedPeople(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'update_interested_people',people:data.people,offer_id:data.offer_id}, httpOptions
    )
  }
}