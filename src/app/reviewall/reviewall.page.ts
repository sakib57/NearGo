import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { StoreService } from '../services/store.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-reviewall',
  templateUrl: './reviewall.page.html',
  styleUrls: ['./reviewall.page.scss'],
})
export class ReviewallPage implements OnInit {
  domain = environment.domain
  shop_id = null
  review = []
  isLoading = false
  shop={
    name: '',
    category:'',
    image: '',
    total_rating:0,
    total_people_rated:0
  }
  constructor(
    public route: ActivatedRoute,
    public reviewService:ReviewService,
    public storeService: StoreService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.shop_id = this.route.snapshot.paramMap.get('id')
    //console.log(shop_id)
    this.storeService.shop_detail(this.shop_id).subscribe(val=>{
      console.log(val)
      this.shop.name = val.name
      this.shop.category = val.category_name
      this.shop.image = val.image
      this.shop.total_rating = val.total_rateing
      this.shop.total_people_rated = val.total_people_rated
    })
    this.reviewService.getAllReview(this.shop_id).subscribe(res=>{
      //console.log(res)
      this.review = res
      this.isLoading = false
    })
  }

}
