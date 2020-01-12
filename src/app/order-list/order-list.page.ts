import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OrderService } from '../services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  //user_id = null
  domain = environment.domain
  order = []
  constructor(
    public storage: Storage,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.storage.get('user_info').then(val=>{
      //this.user_id = val.id
      //console.log(this.user_id)
      this.orderService.myOrder(val.id).subscribe(res=>{
        console.log(res);
        this.order = res
      })
    })
  }

}
