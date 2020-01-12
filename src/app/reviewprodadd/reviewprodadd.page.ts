import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-reviewprodadd',
  templateUrl: './reviewprodadd.page.html',
  styleUrls: ['./reviewprodadd.page.scss'],
})
export class ReviewprodaddPage implements OnInit {

  domain = environment.domain
  rate = 0
  product_id = null
  productImage = ''
  total_rate = 0
  people_rated = null
  user_id = null

  form: FormGroup
  constructor(
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public reviewService:ReviewService,
    public productService: ProductService,
    public storage: Storage,
    public router: Router,
    public alertCtrl: AlertController
  ) {
    this.form = formBuilder.group({
      message: ['',Validators.compose([Validators.required,Validators.maxLength(140)])],
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.product_id = this.route.snapshot.paramMap.get('id')
    this.storage.get('user_info').then(res=>{
      //console.log(res)
      this.user_id = res.id
    })
    this.productService.product_detail(this.product_id).subscribe(val=>{
      //console.log(val)
      this.productImage = val.image
      this.people_rated = val.total_people_rated
    })
    this.reviewService.getAllProductReview(this.product_id).subscribe(res=>{
      //console.log(res)
      for(let i = 0; i<res.length;i++){
        this.total_rate += +res[i].rating
      }
    })
  }
  
  one(){
    console.log('one')
    this.rate = 1
  }
  two(){
    console.log('two')
    this.rate = 2
  }
  three(){
    console.log('three')
    this.rate = 3
  }
  four(){
    console.log('four')
    this.rate = 4
  }
  five(){
    console.log('five')
    this.rate = 5
  }

  
  onSubmit(){
    if(this.rate < 1){
      this.presentAlert()
    }else{
      const data={
        user_id: this.user_id,
        product_id: this.product_id,
        rate: this.rate,
        message: this.form.value.message
      }
      console.log(this.total_rate,'+',this.rate, '/',+this.people_rated+1)
      const rating = ((this.total_rate+this.rate) / (+this.people_rated+1))
      const ratingData = {
        total_rating : rating,
        product_id: this.product_id,
        total_people_rated: +this.people_rated+1
      }
      console.log('rating',rating)
      this.reviewService.checkUserAlreadyReviewdProd(this.user_id,this.product_id).subscribe(rr=>{
        //console.log('yyyyyyyyyyyy',rr.rating)
        

        if(!rr){
          this.reviewService.addProductReview(data).subscribe(res=>{
            //console.log(res)
            if(res.code == 200){
              this.productService.updateRating(ratingData).subscribe(val=>{
                //console.log(val)
                if(val.code == 200){
                  this.presentAlertConfirm()
                }
              })
            }
          })
        }else{
          const prev_rating = rr.rating
          const rating2 = ((this.total_rate+this.rate - prev_rating) / +this.people_rated)
          const ratingData2 = {
            total_rating : rating2,
            product_id: this.product_id,
            total_people_rated: +this.people_rated
          }
          this.reviewService.updateProductReview(data).subscribe(asd=>{
            if(asd.code == 200){
              this.productService.updateRating(ratingData2).subscribe(val=>{
                console.log(val)
                if(val.code == 200){
                  this.presentAlertConfirm()
                }
              })
            }
          })
        }
      })
      
      
    }
    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Please rate this first',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Thank you!',
      message: 'We are glad that you rate us',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/reviewprodall',this.product_id])
          }
        }
      ]
    });
    await alert.present();
  }


}
