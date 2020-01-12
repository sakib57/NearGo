import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }
  get_all_service(){
    return this.http.get<any>(`${this.domain}api?action=service`);
  }
  get_cat_service(cat_id){
    return this.http.get<any>(`${this.domain}api/${cat_id}?action=cat_service`);
  }

  service_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=service`);
  }
  service_schedule(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=service_schedule`);
  }

  addServiceBooking(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.domain}api`,
      { action: 'add_service_booking',user_id:data.user_id,service_id:data.service_id}, httpOptions
    )
  }
}