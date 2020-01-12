import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
//import { ActionSheetController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  user = {
    id: null,
    name: '',
    email: '',
    balance:null
  }
  domain = environment.domain
  total_cart_price = 0
  total_shipping_price = 45
  grand_total = 0
  shipping_address = ''
  phone = ''
  checkout_cart_product:any=[];
  constructor(
    public storage: Storage,
    //public actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
    public router: Router,
    public authenticationService: AuthenticationService,
    public orderService: OrderService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.queryParamMap.subscribe(res=>{
      this.shipping_address=res.get('address')
    })
    this.route.queryParamMap.subscribe(res=>{
      this.phone=res.get('phone')
    })
    
    this.storage.get('user_info').then(res => {
      console.log(res)
      if (res) {
        this.user = res
        this.checkBalance()
      }
    })
    
    this.storage.get('checkout_cart_product').then(v=>{
      if(v){
        this.checkout_cart_product = v
        console.log(this.checkout_cart_product)
      }
    })
    this.storage.get('total_shipping_price').then(v=>{
      if(v){
        this.total_shipping_price = v
      }
    })
    this.storage.get('total_cart_price').then(v=>{
      if(v){
        this.total_cart_price = v
        this.grand_total = this.total_cart_price + this.total_shipping_price
        this.storage.set('grand_total',this.total_cart_price + this.total_shipping_price)
      }
    })
    
  }

  checkBalance(){
    return this.authenticationService.checkBalance(this.user.id).subscribe(res=>{
      this.user.balance = res.balance
      //this.storage.set('user_info',this.user)
    })
  }

  placeOrder(){
    if(this.total_cart_price > this.user.balance){
        console.log('Not Enough money')
        this.router.navigateByUrl('/recharge')
    }else{
      console.log('Ok');
      
      const data = {
        user_id : this.user.id,
        sub_total_amount: this.total_cart_price,
        shipping_amount: this.total_shipping_price,
        grand_total_amount: this.grand_total,
        shipping_address: this.shipping_address,
        phone: this.phone
      }
      this.orderService.placeOrder(data).subscribe(res=>{
        console.log(res)
        this.orderService.placeOrderProduct(res.order_id,this.checkout_cart_product).subscribe(resp=>{
          console.log(resp)
          const dd = {
            user_id : this.user.id,
            balance: this.user.balance - this.grand_total
          }
          this.authenticationService.updateBalance(dd).subscribe(val=>{
            console.log(val)
            this.user.balance = this.user.balance - this.grand_total
            this.storage.set('user_info',this.user)
            //this.router.navigateByUrl('/order-placed')
            this.router.navigate(['/order-placed',res.order_id], { queryParams: { orderdate: res.created_at } })
          })
          
        })
      })
     
      
      console.log(data)
    }
  }
  

}
