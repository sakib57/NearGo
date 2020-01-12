import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  domain = environment.domain
  hasData = true
  showToolbar = false;
  productInWishList = false
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

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
    service_name: "",
    shop_id: "",
    total_people_rated:"",
    total_rating: "",
    schedule : []
  }

  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
    public serviceService: ServiceService,
    public tostCtrl: ToastController,
    public storage: Storage,
    public events: Events,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    
    var id = this.route.snapshot.paramMap.get('id')
    this.serviceService.service_detail(id).subscribe(res=>{
      console.log(res)
      this.detail = res
      this.hasData = true
      this.storage.get('user_info').then(res=>{
        this.user = res
        this.checkWishList();
      })
    }) 
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 45;
    }
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

  book(){
    if(this.user){
      console.log('booked')
      this.router.navigate(['/service-booking',this.detail.id])
    }else{
      this.router.navigateByUrl('/tabs/tab4')
    }
    
  }

}
