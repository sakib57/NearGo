import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';
import { ToastController,Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  total_cart_product = 0
  product_already_in_cart = false
  cart_product:any=[];
  showToolbar = false;
  hasData = false
  domain = environment.domain
  selected_color = ''
  selected_size = '' 
  user={
    id: null,
    name: '',
    email: ''
  }
  detail = {
    category_id: "",
    category_name: "",
    description: "",
    id: "",
    image: "",
    location: "",
    name: "",
    price: "",
    product_name: "",
    shop_id: "",
    total_people_rated:"",
    total_rating: "",
    shipping_cost: "",
    color:[],
    size:[],
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
//===================================
  productInWishList = false
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
    public tostCtrl: ToastController,
    public storage: Storage,
    public events: Events,
    public router: Router
    
  ) { }

  ngOnInit() {
    //this.slide();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 45;
    }
  }

  ionViewWillEnter(){
    
    var id = this.route.snapshot.paramMap.get('id')
    this.productService.product_detail(id).subscribe(res=>{
      console.log(res)
      this.detail = res
      this.hasData = true
      this.storage.get('user_info').then(res=>{
        this.user = res
        this.checkWishList();
      })
    })
    //===========================================
    this.events.subscribe('total_cart_product',rrr=>{
      if(rrr){
        this.total_cart_product = rrr
      }
    })
    this.storage.get('total_cart_product').then(v=>{
      if(v){
        this.total_cart_product = v
      }
    })
    this.storage.get('cart_product').then(val=>{
      console.log(val)
      if(val != null){
        this.cart_product = val
      }
      console.log(this.cart_product)
    });
    //===========================================
    
    
  }

  size_select(size){
    this.selected_size = size
  }
  color_select(color){
    this.selected_color = color
  }
  addToCart(id,shop_name,price,product_name,image,shop_id,shipping_cost){
    this.storage.get('user_info').then(res=>{
      if(!res){
        this.router.navigateByUrl('/tabs/tab4')
      }else{

        if(this.detail.size.length > 0 && this.selected_size == ''){
          this.presentToast('Please select a size first')
        }else if(this.detail.color.length > 0 && this.selected_color == ''){
          this.presentToast('Please select a color first')
        }
        else{
          var value = {
            id: id,
            name: product_name,
            shop_name: shop_name,
            shop_id: shop_id,
            qty: 1,
            image: image,
            price: price,
            total_price: price,
            color: this.selected_color,
            size: this.selected_size,
            shipping_cost: shipping_cost,
            checked:false
          }
          console.log(this.cart_product.length)
          for(let i = 0; i<this.cart_product.length; i++){
            for(let j = 0; j<i+1; j++){
              console.log('ccc',this.cart_product[i].id,id)
              if(this.cart_product[i].id == id){
                this.cart_product[i].qty =this.cart_product[i].qty +1
                this.cart_product[i].total_price = +this.cart_product[i].total_price + +this.cart_product[i].price
                this.product_already_in_cart = true
                break
              }
            }
          }
          if(!this.product_already_in_cart){
            this.cart_product.push(value)
          }
          this.total_cart_product +=1
          this.storage.set('total_cart_product',this.total_cart_product);
          this.storage.set('cart_product',this.cart_product);
          console.log(this.cart_product)
          this.presentToast('Added to cart successfully!')
        }
      }
    })
    
  }

  async presentToast(text) {
    const toast = await this.tostCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  addWishList(){
    if(this.user){
      console.log('user_id',this.user.id)
      console.log('product_id',this.detail.id)

      const data = {
        'user_id' : this.user.id,
        'product_id':this.detail.id
      }
      this.productService.addWishList(data).subscribe(res=>{
        console.log(res)
      })
      this.productInWishList = true
    }else{
      console.log('please Login')
      this.router.navigateByUrl('/tabs/tab4')
    }
    
  }

  checkWishList(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'product_id':this.detail.id
      }
      this.productService.checkWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          if(this.detail.id == res.product_id){
            this.productInWishList = true
          }
        }
        
      })

      //console.log( this.productService.checkWishList(data))
      
    }
  }

  rmWishList(){
    const data = {
      'user_id' : this.user.id,
      'product_id':this.detail.id
    }
    this.productService.rmWishList(data).subscribe(res=>{
      if(res.code == 200){
        this.productInWishList = false
      }
    })
    
  }


}
