import { Component, OnInit } from '@angular/core';
//import { ToastController,Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  form: FormGroup
  shop_still_in_cart = false
  total_cart_product = 0
  total_cart_price = 0
  total_shipping = 0
  allChecked = false
  cart_product:any=[];
  checked_shop = []
  checkout_cart_product:any=[];
  temp:any=[]
  user={
    id: null,
    name: '',
    email: '',
    address: '',
    phone: ''
  }
  //hasData = false
  domain = environment.domain
  constructor(
    public productService: ProductService,
    // public route: ActivatedRoute,
    public router: Router,
    // public productService: ProductService,
    public tostCtrl: ToastController,
    public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      address: ['',Validators.compose([Validators.required])],
      phone: ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.total_cart_price = 0
    this.storage.get('user_info').then(res=>{
      console.log(res)
      this.user = res
    })
    this.storage.get('total_cart_product').then(v=>{
      if(v){
        this.total_cart_product = v
      }
    })
    // this.storage.get('total_cart_price').then(v=>{
    //   if(v){
    //     this.total_cart_price = v
    //   }
    // })
    this.storage.get('cart_product').then(val=>{
      //console.log(val)
      if(val != null){
        this.cart_product = val
      }
      console.log(this.cart_product)
    });
    this.storage.get('allchecked').then(val=>{
      console.log(val)
      if(val == 'true'){
        this.allChecked = true
      }else{
        this.allChecked = false
      }
    });
    this.checkout_cart_product = []
    
  }

  // updateCart(){
  //   console.log("Update Called")
  //   console.log('Main before qty update',this.cart_product_updated)
  //   //Update quantity
  //   for(let i = 0; i<this.cart_product_raw.length; i++){
  //     for(let j = 0; j<i; j++){
  //       if(this.cart_product_raw[i].id == this.cart_product_raw[j].id){
  //         this.cart_product_updated[i].qty =this.cart_product_raw[i].qty +1
  //       }
  //     }
  //   }
  //   //Reverse array
  //   for(let k = this.cart_product_updated.length-1; k>=0; k--){
  //     this.cart_product_reverse.push(this.cart_product_updated[k])
  //   }

  //   //console.log('reverse',this.cart_product_reverse)
  //   //Filter redundent
  //   this.cart_product_new = this.removeDuplicates(this.cart_product_reverse,'id')
  //   //console.log('new',this.cart_product_new)
  //   console.log('Raw',this.cart_product_raw)
  // }


  // removeDuplicates(array, key) {
  //   return array.filter((obj, index, self) =>
  //       index === self.findIndex((el) => (
  //           el[key] === obj[key]
  //       ))
  //   )
  // }

  addItem(id){
    for(let i = 0; i<this.cart_product.length; i++){
      for(let j = 0; j<i+1; j++){
        console.log('ccc',this.cart_product[i].id,id)
        if(this.cart_product[i].id == id){
          this.cart_product[i].qty += 1
          this.cart_product[i].total_price = +this.cart_product[i].total_price + +this.cart_product[i].price

          if(this.cart_product[i].checked){
            console.log(this.total_cart_price)
            console.log(+this.cart_product[i].price)
            this.total_cart_price += +this.cart_product[i].price
            console.log(this.total_cart_price)
          }

          break
        }
      }
    }
    for(let h=0;h<this.checkout_cart_product.length;h++){
      if(this.checkout_cart_product[h].id == id && !this.cart_product[h].checked){
        this.total_cart_price += +this.checkout_cart_product[h].price
        break
      }
    }
    this.total_cart_product +=1
    this.storage.set('total_cart_product',this.total_cart_product);
    this.storage.set('cart_product',this.cart_product);
  }
  removeItem(id,k){
    
    for(let i = 0; i<this.cart_product.length; i++){
      for(let j = 0; j<i+1; j++){
        //console.log('ccc',this.cart_product[i].id,id)
        if(this.cart_product[i].id == id){
          console.log('Id matched')
          this.cart_product[i].qty =this.cart_product[i].qty -1
          this.cart_product[i].total_price = +this.cart_product[i].total_price - +this.cart_product[i].price

          if(this.cart_product[i].checked){
            this.total_cart_price -= +this.cart_product[i].price
          }
          
          break
        }
      }
    }
    for(let h=0;h<this.checkout_cart_product.length;h++){
      if(this.checkout_cart_product[h].id == id && !this.cart_product[h].checked){
        this.total_cart_price -= +this.checkout_cart_product[h].price
        break
      }
    }
    this.total_cart_product -=1
    this.storage.set('total_cart_product',this.total_cart_product);
    this.storage.set('cart_product',this.cart_product);
  }

  cartForCheckout(event,id,name,image,price,qty,shop_name,shop_id,total_price,i,color,size,shipping_cost){
    const value = {
      id: id,
      name: name,
      shop_name: shop_name,
      shop_id: shop_id,
      qty: qty,
      image: image,
      price: price,
      total_price:total_price,
      checked:true,
      index: i,
      color: color,
      size: size
    }
    if ( event.target.checked ) {
      if(!this.allChecked){
        for(let i=0; i<this.cart_product.length;i++){
          if ( this.cart_product[i].id === id) {
            this.cart_product[i].checked =true
          }
        }
        this.storage.set('cart_product',this.cart_product);
        console.log('Checked',this.cart_product)
        this.checkout_cart_product.push(value)
        this.total_cart_price = +this.total_cart_price + +total_price

        
        if(this.checked_shop.indexOf(shop_id) !== -1) {
          console.log('artNr already exists!');
        }else{
          this.checked_shop.push(shop_id)
          this.total_shipping += +shipping_cost
        }
      }
      //==============================
    }else{
      this.allChecked = false
      console.log('UnChecked')
      console.log(i)
      for( let i = 0; i < this.checkout_cart_product.length; i++){
        console.log(this.checkout_cart_product[i].id,id)
        if ( this.checkout_cart_product[i].id === id) {
          this.checkout_cart_product.splice(i, 1);
          this.total_cart_price -= total_price
          break 
        }
     }
     for(let i=0; i<this.cart_product.length;i++){
      if ( this.cart_product[i].id === id) {
        this.cart_product[i].checked =false
      }
      
    }
    this.shop_still_in_cart = false
    for(let i=0;i<this.checkout_cart_product.length;i++){
      if(this.checkout_cart_product[i]['shop_id'] == shop_id) {
        console.log('artNr already exists!');
        this.shop_still_in_cart = true
        break
      }else{
        console.log('artNr does not exists!');
        // this.checked_shop.splice(this.checked_shop.indexOf(shop_id),1)
        // this.total_shipping -= +shipping_cost
        this.shop_still_in_cart = false
      }
    }
    if(!this.shop_still_in_cart){
      this.total_shipping -= +shipping_cost
      this.checked_shop.splice(this.checked_shop.indexOf(shop_id), 1);
    }
    console.log(this.checkout_cart_product)
    this.storage.set('cart_product',this.cart_product);
    }
    
    //console.log(this.checkout_cart_product)
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Delete!',
      message: 'Really want to delete these item from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteItems()
          }
        }
      ]
    });

    alert.present();
  }

  deleteItems(){
    if(!this.allChecked){
      for(let i = this.cart_product.length-1; i>=0; i--){
        for(let j = 0; j<this.checkout_cart_product.length; j++){
          if(this.cart_product[i].id == this.checkout_cart_product[j].id){
            this.cart_product.splice(i,1);
            console.log(this.total_cart_product)
            this.total_cart_product -= this.checkout_cart_product[j].qty
            this.total_cart_price = +this.total_cart_price - +this.checkout_cart_product[j].total_price
            break
          }
        }
      }
    }else{
      for(let j = 0; j<this.checkout_cart_product.length; j++){
          console.log(this.total_cart_product)
          this.total_cart_product -= this.checkout_cart_product[j].qty
          this.total_cart_price = +this.total_cart_price - +this.checkout_cart_product[j].total_price
          break
        
      }
    }
    
    this.events.publish('total_cart_product',this.total_cart_product)
    this.storage.set('cart_product',this.cart_product);
    this.storage.set('total_cart_product',this.total_cart_product);
  }

  checkAll(event){
    
    if ( event.target.checked ) {
      this.allChecked = true
      this.total_cart_price = 0
      for(let j=0;j<this.cart_product.length;j++){
        this.cart_product[j].checked = true
      }
      console.log(this.cart_product)
      this.checkout_cart_product = this.cart_product;
      console.log(this.cart_product)
      for(let i=0; i<this.checkout_cart_product.length;i++){
        this.total_cart_price = +this.total_cart_price + +this.checkout_cart_product[i].total_price
      }
      this.storage.set('allchecked','true');
      console.log('pppppp',this.checkout_cart_product)
    }else{
      this.allChecked = false
      for(let j=0;j<this.cart_product.length;j++){
        this.cart_product[j].checked = false
      }
      this.checkout_cart_product = []
      this.total_cart_price = 0
      for(let i=0; i<this.checkout_cart_product.length;i++){
        this.checkout_cart_product[i].checked = false
      }
      this.storage.set('allchecked','false');
      console.log(this.checkout_cart_product)
    }
    this.storage.set('cart_product',this.cart_product);
    
  }

  checkout(){
    if(!this.user){
      this.router.navigateByUrl('/tabs/tab4')
    }{
      if(this.checkout_cart_product != ''){
        console.log('cckk')
        this.storage.set('checkout_cart_product',this.checkout_cart_product);
        this.storage.set('total_cart_price',this.total_cart_price);
        this.storage.set('total_shipping_price',this.total_shipping);
        this.router.navigate(['/checkout'],{queryParams:{address:this.user.address,phone:this.user.phone}})
      }else{
        this.presentToast('Please Select a product at least')
      }
    }
    
  }

  async presentToast(msg) {
    const toast = await this.tostCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
