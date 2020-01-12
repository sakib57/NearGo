import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OfferService } from '../services/offer.service';
import { EventService } from '../services/event.service';
import { ProductService } from '../services/product.service';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  domain = environment.domain
  hasData = false
  isLoading = true
  term = 'stores'
  stores = []
  offers = []
  events = []
  products = []
  services = []
  constructor(
    public storeService: StoreService,
    public offerService: OfferService,
    public eventService: EventService,
    public productService: ProductService,
    public serviceService: ServiceService,
    public network: Network,
    public alertCtrl: AlertController,
    public statusBar: StatusBar
  ) {
    this.network.onDisconnect().subscribe(() => {
      this.networkCheck()
    });
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.ionViewWillEnter()
    });
  }

  segmentChanged(event){
    this.term = event.detail.value
  }

  ionViewWillEnter(){
    this.statusBar.styleLightContent();
    //this.isLoading = true
    this.storeService.get_all_shop().subscribe(res=>{
      console.log(res);
      this.stores = res
      this.hasData = true
      this.isLoading = false
    })

    this.offerService.get_all_offer().subscribe(res=>{
      //console.log(res)
      this.offers = res
    })

    this.eventService.get_all_event().subscribe(res=>{
      //console.log(res)
      this.events = res
    })

    this.productService.get_all_product().subscribe(res=>{
      //console.log(res)
      this.products = res
    })

    this.serviceService.get_all_service().subscribe(res=>{
      //console.log(res)
      this.services = res
    })
    console.log(this.isLoading)
  }

  async networkCheck() {
    const alert = await this.alertCtrl.create({
      header: 'Oops..!',
      subHeader: 'Network Problem',
      message: 'Please check your network connection',
      buttons: ['OK']
    });

    await alert.present();
  }

}
