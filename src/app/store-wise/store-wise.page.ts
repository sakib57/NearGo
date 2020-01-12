import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-wise',
  templateUrl: './store-wise.page.html',
  styleUrls: ['./store-wise.page.scss'],
})
export class StoreWisePage implements OnInit {
  domain = environment.domain
  shop_id = null
  isLoading = false
  products = []
  store_name = ''
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.isLoading = true
    this.shop_id = this.route.snapshot.paramMap.get('id')
    console.log(this.shop_id)
    this.productService.get_shopwise_product(this.shop_id).subscribe(res=>{
      console.log(res)
      if(res.length > 0){
        this.products = res
        this.store_name = res[0]['name']
        
      }
      this.isLoading = false
    })
  }


}
