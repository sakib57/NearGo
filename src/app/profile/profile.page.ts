import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController,Events } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  base64img:string='';
  submitAttempt = false;
  form: FormGroup
  user_info = {
    id: '',
    name: '',
    email: '',
    balance: '',
    address: '',
    phone: '',
    image:''
  }
  img = '/assets/images/profile.png'
  constructor(
    public storage: Storage,
    public events: Events,
    public router: Router,
    public formBuilder: FormBuilder,
    public actionSheetCtrl:ActionSheetController,
    public camera: Camera,
    public authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController
  ) {
    this.form = formBuilder.group({
      name: ['',Validators.compose([Validators.required,])],
      //email: ['',Validators.compose([Validators.required, Validators.email])],
      //password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
      phone: ['',Validators.compose([Validators.required,Validators.minLength(11)])],
      address: ['',Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(v=>{
      if(v){
        console.log(v)
        this.user_info = v
        this.form.setValue({name: v.name,phone:v.phone,address:v.address})
        this.img = 'https://aptest.therssoftware.com/Near_Go/assets/images/uploads/profiles/'+v.image
        console.log(this.img)
      }
    })
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      buttons: [{
        text: 'Open Gallery',
        icon: 'image',
        handler: () => {
          this.imageCapturedGallery();
        }
      }, {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          this.imageCaptured();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  imageCaptured(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From camera",this.base64img);
   }),error=>{
     console.log(error);
   })
  }

  imageCapturedGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From Gallery",this.base64img);
    }),error=>{
      console.log(error);
    })
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
          id: this.user_info.id,
          name: this.form.value.name,
          //email: this.form.value.email,
          phone: this.form.value.phone,
          address: this.form.value.address,
          image: this.base64img,
        }
        this.updateProfile(info)
    }
  }


  updateProfile(data){
    this.authenticationService.updateProfile(data).subscribe(resData => {
      console.log(resData);
      //this.modalController.dismiss();
      this.user_info.name = data.name
      this.user_info.phone = data.phone
      this.user_info.address = data.address
      this.user_info.image = resData.image
      this.img = resData.image
      this.events.publish('user_info',this.user_info)
      this.storage.set('user_info',this.user_info)
      this.router.navigateByUrl('/tabs/tab4')
    })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Updating...',
      duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

}
