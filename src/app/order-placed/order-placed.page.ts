import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
})
export class OrderPlacedPage implements OnInit {

  total_shipping_price = ''
  orderInfo={
    order_id : '',
    date: '',
    t_qty: null,
    total: null,
    payment_method: 'Cash on delivery'
  }

  subtotal = 0
  totalqty = 0
  orderProducts = []
  constructor(
    public route: ActivatedRoute,
    public storage: Storage,
    public router: Router,
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter(){
   this.orderInfo.order_id = this.route.snapshot.paramMap.get('id')
   this.orderInfo.date = this.route.snapshot.queryParamMap.get('orderdate')
    let that = this
   this.storage.get('checkout_cart_product').then(v=>{
    if(v){
      console.log(v)
      this.orderProducts = v
      for(let i = 0;i<this.orderProducts.length;i++){
        this.subtotal += +this.orderProducts[i].total_price
        this.totalqty += this.orderProducts[i].qty
      }
    }
  })
  this.storage.get('total_shipping_price').then(v=>{
    if(v){
      this.total_shipping_price = v
    }
  })
  this.storage.get('grand_total').then(v=>{
    if(v){
      console.log('eeeeeeeeeee',v)
     this.orderInfo.total = v
    }
  })
  }

}
