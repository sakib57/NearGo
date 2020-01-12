import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { OfferService } from '../services/offer.service';
import { EventService } from '../services/event.service';
import { ProductService } from '../services/product.service';
import { ServiceService } from '../services/service.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-wise',
  templateUrl: './category-wise.page.html',
  styleUrls: ['./category-wise.page.scss'],
})
export class CategoryWisePage implements OnInit {
 
  category_id = null
  domain = environment.domain
  hasData = false
  isLoading = false
  category_name = ''
  term = 'stores'
  stores = []
  offers = []
  events = []
  products = []
  services = []
  constructor(
    public route: ActivatedRoute,
    public storeService: StoreService,
    public offerService: OfferService,
    public eventService: EventService,
    public productService: ProductService,
    public serviceService: ServiceService,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  segmentChanged(event){
    this.term = event.detail.value
  }

  ionViewWillEnter(){
    this.category_id = this.route.snapshot.paramMap.get('id')
    console.log(this.category_id)
    this.categoryService.get_category_detail(this.category_id).subscribe(res=>{
      this.category_name = res.category_name
    })
    this.storeService.get_cat_shop(this.category_id).subscribe(res=>{
      console.log(res);
      this.stores = res
      this.hasData = true
      this.isLoading = false
    })

    this.offerService.get_cat_offer(this.category_id).subscribe(res=>{
      //console.log(res)
      this.offers = res
    })

    this.eventService.get_cat_event(this.category_id).subscribe(res=>{
      //console.log(res)
      this.events = res
    })

    this.productService.get_cat_product(this.category_id).subscribe(res=>{
      //console.log(res)
      this.products = res
    })

    this.serviceService.get_cat_service(this.category_id).subscribe(res=>{
      //console.log(res)
      this.services = res
    })
  }

}
