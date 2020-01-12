import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  domain = environment.domain

  constructor(
    public http: HttpClient,
  ) { }

//   get_all_category(){
//       return this.http.get<any>(`${this.domain}api/get?action=allCategory`);
//   }

    register(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'register',name:data.name,email:data.email,phone:data.phone,password:data.password,otp:data.otp,image:''}, httpOptions
      )
    }


    login(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'login',email:data.email,password:data.password}, httpOptions
      )
    }

    checkBalance(user_id){
      return this.http.get<any>(`${this.domain}api/${user_id}?action=checkBalance`)
    }

    updateBalance(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'update_balance',user_id:data.user_id,balance:data.balance}, httpOptions
      )
    }

    updateProfile(data){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `${this.domain}api`,
        { action: 'update_profile',
          user_id:data.id,
          name:data.name,
          phone:data.phone,
          address:data.address,
          image: data.image
        }, httpOptions
      )
    }
}