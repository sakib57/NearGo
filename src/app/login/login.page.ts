import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitAttempt = false;
  form: FormGroup

  constructor(
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public router:Router,
    public storage: Storage,
    public events: Events,
    public loadingController: LoadingController
  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
    })
  }

  ngOnInit() {
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
          const user_info = {
            id: res.id,
            name: res.name,
            email: res.email,
            balance: res.balance
          }
          this.events.publish('user_info',user_info)
          this.storage.set('user_info',user_info)
          this.loadingController.dismiss()
          this.router.navigateByUrl('/tabs/tab4')
          console.log(user_info)
        })
      
        
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

}
