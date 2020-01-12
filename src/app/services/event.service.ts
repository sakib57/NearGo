import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }

  get_all_event(){
    return this.http.get<any>(`${this.domain}api?action=event`);
  }
  get_cat_event(cat_id){
    return this.http.get<any>(`${this.domain}api/${cat_id}?action=cat_event`);
  }

  event_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=event`);
  }


  addWishList(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'add_event_wish',user_id:data.user_id,event_id:data.event_id}, httpOptions
    )
  }

  checkWishList(data){
    return this.http.get<any>(`${this.domain}api/${data.user_id}?action=check_event_wishlist&query_id=${data.event_id}`);
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
      { action: 'rm_event_wish',user_id:data.user_id,event_id:data.event_id}, httpOptions
    )
  }

  updateGoingPeople(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'update_going_people',people:data.people,event_id:data.event_id}, httpOptions
    )
  }
}