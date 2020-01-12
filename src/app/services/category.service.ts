import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  domain = environment.domain

  constructor(
    public http: HttpClient
  ) { }

  get_all_category(){
      return this.http.get<any>(`${this.domain}api?action=allCategory`);
  }
  get_category_detail(id){
    return this.http.get<any>(`${this.domain}api/${id}?action=categoryDetail`);
  }
}