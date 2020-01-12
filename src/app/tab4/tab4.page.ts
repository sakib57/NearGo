import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, LoadingController, AlertController } from '@ionic/angular';

import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  submitAttempt = false
  domain = environment.domain
  form: FormGroup
  isLogged = false
  user = {
    id: null,
    name: '',
    email: '',
    balance:null,
    image: ''
  }

  tempImg = '/assets/images/profile.png'
  constructor(
    public storage: Storage,
    public events: Events,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
    })
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.events.subscribe('user_info',res=>{
      console.log(res)
      if(res){
        if(res.image){
          this.user = res
        }else{
          this.user = res
          this.user.image = '/assets/images/profile.png'
        }
        console.log(this.user)
        this.isLogged = true
        this.checkBalance()
      }
      
    })


    this.storage.get('user_info').then(res=>{
      console.log(res)
      if(res){
        if(res.image){
          this.user = res
        }else{
          this.user = res
          this.user.image = '/assets/images/profile.png'
        }
        console.log(this.user)
        this.isLogged = true
        this.checkBalance()
      }
    })
  }

  logout(){
    this.presentLoading()
    let that = this
    setTimeout(function(){
      that.isLogged = false
      that.storage.set('user_info',null)
    }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging out...',
      duration: 2000
    });
    await loading.present()
    console.log('Loading dismissed!');
  }

  onSubmit(){
    
    this.submitAttempt = true;
    if(!this.form.valid){
      return
    }
    else {
      this.presentLoading()
        console.log("success!")
        const info = {
          email: this.form.value.email,
          password: this.form.value.password,
        }
        this.authenticationService.login(info).subscribe(res=>{
          console.log(res)
          if(res){
            const user_info = {
              id: res.id,
              name: res.name,
              email: res.email,
              balance: res.balance,
              address: res.address,
              phone: res.phone,
              image: res.image,
            }
            this.events.publish('user_info',user_info)
            this.storage.set('user_info',user_info)
            this.loadingController.dismiss()
          }else{
            this.loadingController.dismiss()
            this.LoginError()
            setTimeout(() => {
              this.alertController.dismiss()
            }, 2500);
          }
          
          this.router.navigateByUrl('/tabs/tab4')
        })
      
        
    }
  }
  checkBalance(){
    return this.authenticationService.checkBalance(this.user.id).subscribe(res=>{
      this.user.balance = res.balance
    })
  }

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     message: 'Logging in...',
  //     duration: 2000
  //   });
  //   await loading.present();
  //   console.log('Loading dismissed!');
  // }

  async LoginError() {
    const alert = await this.alertController.create({
      header: 'Opps',
      message: 'Email or password does not match',
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    });

    await alert.present();
  }

}
