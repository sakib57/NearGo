import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {

  domain = environment.domain
  showToolbar = false;
  hasData = false
  detail = {
    id: "",
    name: "",
    category_id: "",
    description: "",
    location: "",
    lat: "",
    lng: "",
    opening_time: "",
    closing_time: "",
    phone: "",
    image: "",
    c_id: "",
    category_name: "",
    total_rateing: "",
    total_people_rated: ""
  }
  user={
    id: null,
    name: '',
    email: ''
  }

  //=========================
  shopInWishList = false
  constructor(
    public storeService: StoreService,
    public route: ActivatedRoute,
    public storage: Storage,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 45;
    }
  }

  ionViewWillEnter(){
    var id = this.route.snapshot.paramMap.get('id')
    this.storeService.shop_detail(id).subscribe(res=>{
      console.log(res)
      this.detail = res
      this.storage.get('user_info').then(res=>{
        this.user = res
        this.checkWishList();
      })
      this.hasData = true
    })
  }

  addWishList(){
    //this.shopInWishList = true
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'shop_id':this.detail.id
      }
      this.storeService.addWishList(data).subscribe(res=>{
        console.log(res)
      })
      this.shopInWishList = true
    }else{
      console.log('please Login')
      this.router.navigateByUrl('/tabs/tab4')
    }
    
  }

  checkWishList(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'shop_id':this.detail.id
      }
      console.log(data)
      this.storeService.checkWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          if(this.detail.id == res.shop_id){
            this.shopInWishList = true
          }
        }
        
      })      
     }
  }

  rmWishList(){
    this.shopInWishList = false
    const data = {
      'user_id' : this.user.id,
      'shop_id':this.detail.id
    }
    this.storeService.rmWishList(data).subscribe(res=>{
      if(res.code == 200){
        this.shopInWishList = false
      }
    })
    
  }


}
