import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.page.html',
  styleUrls: ['./service-booking.page.scss'],
})
export class ServiceBookingPage implements OnInit {

  service_id = null
  user = {
    id: null,
    name: '',
    email: '',
    balance:null,
    address: ''
  }
  
  schedule : []
  
  form: FormGroup
  domain = environment.domain
  constructor(
    public storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public serviceService: ServiceService,
    public formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      service_id: ['',Validators.compose([Validators.required])],
      
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.service_id = this.route.snapshot.paramMap.get('id')
    this.storage.get('user_info').then(res => {
      console.log(res)
      if (res) {
        this.user = res
        //this.checkBalance()
      }
    })
    this.serviceService.service_schedule(this.service_id).subscribe(res=>{
      console.log(res)
      //this.detail = res
    })

  }
  confirm(){
    console.log(this.form.value)
    const data={
      user_id: this.user.id,
      service_id:this.form.value.service_id,
    }
    this.serviceService.addServiceBooking(data).subscribe(res=>{
      console.log(res)
      if(res.code == 200){
        this.router.navigateByUrl('/tabs/tab1')
      }
    })
  }

}
