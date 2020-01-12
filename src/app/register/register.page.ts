import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ModalController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userId = '';
  base64img:string='';
  otp = null
  submitAttempt = false
  paswordMatch = false
  form: FormGroup
  constructor(
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public router:Router,
    // public camera: Camera,
    public storage: Storage,
    public events: Events,
  ) {
    this.form = formBuilder.group({
      name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      phone: ['',Validators.compose([Validators.required,Validators.minLength(11)])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
      conf_password: ['',Validators.compose([Validators.required])]
  },{validators: this.password.bind(this)});
  }

  ngOnInit() {
    // initialize Account Kit with CSRF protection
    // AccountKit_OnInteractive = function(){
    //   AccountKit.init(
    //     {
    //       appId:"{{2399347473639024}}", 
    //       state:"{{csrf}}", 
    //       version:"{{ACCOUNT_KIT_API_VERSION}}",
    //       fbAppEventsEnabled:true,
    //       redirect:"{{REDIRECT_URL}}"
    //     }
    //   );
    // };


  }



  // login callback
  loginCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
      var code = response.code;
      var csrf = response.state;
      // Send code to server to exchange for access token
    }
    else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
    }
    else if (response.status === "BAD_PARAMS") {
      // handle bad parameters
    }
  }


  
  // phone form submission handler
  smsLogin() {
    // var countryCode = document.getElementById("country_code").value;
    // var phoneNumber = document.getElementById("phone_number").value;
    // AccountKit.login(
    //   'PHONE', 
    //   {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
    //   loginCallback
    // );
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
          name: this.form.value.name,
          email: this.form.value.email,
          phone: this.form.value.phone,
          password: this.form.value.password,
          otp: Math.floor(Math.random() * (9999 - 1000)) + 1000
        }
        // this.otp = Math.floor(Math.random() * (9999 - 1000)) + 1000
        // setTimeout( () => {
        //   this.otp = null
        // }, 5000);
        this.authenticationService.register(info).subscribe(res=>{
          console.log(res)
          const user_info = {
            id: res.id,
            name: res.name,
            email: res.email,
            balance: res.balance,
            address: res.address
          }

          this.events.publish('user_info',user_info)
          this.storage.set('user_info',user_info)
          this.loadingController.dismiss()
          this.router.navigateByUrl('/tabs/tab4')
          //console.log(user_info)
        })
      
        
    }
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
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
  //   const options:CameraOptions={
  //     quality:70,
  //     destinationType:this.camera.DestinationType.DATA_URL,
  //     encodingType:this.camera.EncodingType.JPEG,
  //     mediaType:this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((ImageData=>{
  //     this.base64img="data:image/jpeg;base64,"+ImageData;
  //     console.log("From camera",this.base64img);
  //  }),error=>{
  //    console.log(error);
  //  })
  }

  imageCapturedGallery(){
    // const options:CameraOptions={
    //   quality:70,
    //   destinationType:this.camera.DestinationType.DATA_URL,
    //   sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum:false
    // }

    // this.camera.getPicture(options).then((ImageData=>{
    //   this.base64img="data:image/jpeg;base64,"+ImageData;
    //   console.log("From Gallery",this.base64img);
    // }),error=>{
    //   console.log(error);
    // })
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('conf_password');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registering...',
      duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  

}
