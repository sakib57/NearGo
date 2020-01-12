import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviewprodall',
  templateUrl: './reviewprodall.page.html',
  styleUrls: ['./reviewprodall.page.scss'],
})
export class ReviewprodallPage implements OnInit {

  domain = environment.domain
  //hasData = false
  product_id = null
  review = []
  isLoading = false
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
    total_rating:"0",
    total_people_rated:"0"
  }
  // user={
  //   id: null,
  //   name: '',
  //   email: ''
  // }
  constructor(
    public route: ActivatedRoute,
    public productService: ProductService,
    public reviewService: ReviewService,
    public storage: Storage,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.product_id = this.route.snapshot.paramMap.get('id')
    this.productService.product_detail(this.product_id).subscribe(res=>{
      console.log(res)
      this.detail = res
    })
    this.reviewService.getAllProductReview(this.product_id).subscribe(res=>{
      //console.log(res)
      this.review = res
      this.isLoading = false
    })
  }

}
