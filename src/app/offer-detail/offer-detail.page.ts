import { Component, OnInit, ɵConsole } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { environment } from 'src/environments/environment';
import { OfferService } from '../services/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.page.html',
  styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {
  domain = environment.domain
  hasData = false
  showToolbar = false;

  detail = {
    id: "",
    name: "",
    shop_id:"",
    end_date: "",
    category_id: "",
    description: "",
    location: "",
    title: "",
    image: "",
    people_interested:"",
    category_name: ""
  }
  IamInterested = false
  user={
    id: null,
    name: '',
    email: ''
  }
  constructor(
    public route: ActivatedRoute,
    public offerService: OfferService,
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
    this.offerService.offer_detail(id).subscribe(res=>{
      console.log(res)
      this.detail = res
      this.storage.get('user_info').then(res=>{
        this.user = res
        this.checkWishList();
      })
      this.hasData = true
    })
  }

  interested(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'offer_id':this.detail.id
      }
      this.offerService.addWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          this.IamInterested = true
          console.log(+this.detail.people_interested + 1)
          this.detail.people_interested = (+this.detail.people_interested + 1).toString()
          const val={
            'offer_id':this.detail.id,
            'people': +this.detail.people_interested
          }
          this.offerService.updateInterestedPeople(val).subscribe(resp=>{
            console.log(resp)
          })
        }
      })
      
    }else{
      console.log('please Login')
      this.router.navigateByUrl('/tabs/tab4')
    }
    //this.IamGoing = true
  }

  notInterested(){
    const data = {
      'user_id' : this.user.id,
      'offer_id':this.detail.id
    }
    this.offerService.rmWishList(data).subscribe(res=>{
      if(res.code == 200){
        this.IamInterested = false
        this.detail.people_interested = (+this.detail.people_interested - 1).toString()
          const val={
            'offer_id':this.detail.id,
            'people': +this.detail.people_interested
          }
          this.offerService.updateInterestedPeople(val).subscribe(resp=>{
            console.log(resp)
          })
      }
    })
  }
 

  checkWishList(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'offer_id':this.detail.id
      }
      this.offerService.checkWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          if(this.detail.id == res.offer_id){
            this.IamInterested = true
          }
        }
      }) 
    }
  }

}
