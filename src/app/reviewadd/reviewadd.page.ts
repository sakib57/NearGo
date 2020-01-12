import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { StoreService } from '../services/store.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reviewadd',
  templateUrl: './reviewadd.page.html',
  styleUrls: ['./reviewadd.page.scss'],
})
export class ReviewaddPage implements OnInit {
  domain = environment.domain
  rate = 0
  shop_id = null
  shopImage = ''
  total_rate = 0
  people_rated = null
  user_id = null

  form: FormGroup
  constructor(
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public reviewService:ReviewService,
    public storeService: StoreService,
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
    this.shop_id = this.route.snapshot.paramMap.get('id')
    this.storage.get('user_info').then(res=>{
      //console.log(res)
      this.user_id = res.id
    })
    this.storeService.shop_detail(this.shop_id).subscribe(val=>{
      //console.log(val)
      this.shopImage = val.image
      this.people_rated = val.total_people_rated
    })
    this.reviewService.getAllReview(this.shop_id).subscribe(res=>{
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
        shop_id: this.shop_id,
        rate: this.rate,
        message: this.form.value.message
      }
      console.log(this.total_rate,'+',this.rate, '/',+this.people_rated+1)
      const rating = ((this.total_rate+this.rate) / (+this.people_rated+1))
      const ratingData = {
        total_rating : rating,
        shop_id: this.shop_id,
        total_people_rated: +this.people_rated+1
      }
      console.log('rating',rating)
      this.reviewService.checkUserAlreadyReviewd(this.user_id,this.shop_id).subscribe(rr=>{
        //console.log('yyyyyyyyyyyy',rr.rating)
        

        if(!rr){
          this.reviewService.addShopReview(data).subscribe(res=>{
            //console.log(res)
            if(res.code == 200){
              this.storeService.updateRating(ratingData).subscribe(val=>{
                //console.log(res)
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
            shop_id: this.shop_id,
            total_people_rated: +this.people_rated
          }
          this.reviewService.updateShopReview(data).subscribe(asd=>{
            if(asd.code == 200){
              this.storeService.updateRating(ratingData2).subscribe(val=>{
                //console.log(res)
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
            this.router.navigate(['/reviewall',this.shop_id])
          }
        }
      ]
    });
    await alert.present();
  }

}
