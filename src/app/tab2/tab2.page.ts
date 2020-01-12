import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  hasData = false
  domain = environment.domain
  categories = []
  constructor(
    public categoryService: CategoryService
  ) {}

  ionViewWillEnter(){
    this.categoryService.get_all_category().subscribe(res=>{
      //console.log(res);
      this.categories = res
      this.hasData = true
    })
  }

}
