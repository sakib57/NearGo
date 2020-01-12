import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {

  domain = environment.domain
  isLoading = false
  hasData = true
  term = 'products'
  stores = []
  products = []

  user={
    id: null,
    name: '',
    email: ''
  }

  constructor(
    public storage: Storage,
    public productService: ProductService,
    public shopService: StoreService
  ) { }

  ngOnInit() {
  }

  segmentChanged(event){
    this.term = event.detail.value
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.storage.get('user_info').then(res=>{
      this.user = res
      console.log(res)
      this.productService.getMyProducts(this.user.id).subscribe(val=>{
        console.log(val)
        this.products = val
        this.isLoading = false
      })
      this.shopService.getMyShops(this.user.id).subscribe(asd=>{
        console.log(asd)
        this.stores = asd
        this.isLoading = false
      })
    })
  }

}
