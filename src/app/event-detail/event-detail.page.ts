import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  domain = environment.domain
  showToolbar = false;
  hasData = false

  detail = {
    id: "",
    name: "",
    shop_id:"",
    date_range: "",
    category_id: "",
    description: "",
    location: "",
    title: "",
    image: "",
    people_going:"",
    category_name: ""
  }
  user={
    id: null,
    name: '',
    email: ''
  }

  IamGoing = false
  constructor(
    public route: ActivatedRoute,
    public eventService: EventService,
    public storage: Storage,
    public router: Router
  ) { }

  ngOnInit() {
  }
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 45;
    }
  }

  ionViewWillEnter(){
    var id = this.route.snapshot.paramMap.get('id')
    this.eventService.event_detail(id).subscribe(res=>{
      console.log(res)
      this.detail = res
      this.storage.get('user_info').then(res=>{
        this.user = res
        this.checkWishList();
      })
      this.hasData = true
    })
  }

  going(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'event_id':this.detail.id
      }
      this.eventService.addWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          this.IamGoing = true
          this.detail.people_going = (+this.detail.people_going + 1).toString()
          const val={
            'event_id':this.detail.id,
            'people': +this.detail.people_going
          }
          this.eventService.updateGoingPeople(val).subscribe(resp=>{
            console.log(resp)
          })
        }
      })
      
    }else{
      console.log('please Login')
      this.router.navigateByUrl('/tabs/tab4')
    }
    //this.IamGoing = true
  }

  notGoing(){
    const data = {
      'user_id' : this.user.id,
      'event_id':this.detail.id
    }
    this.eventService.rmWishList(data).subscribe(res=>{
      if(res.code == 200){
        this.IamGoing = false
        this.detail.people_going = (+this.detail.people_going - 1).toString()
        const val={
          'event_id':this.detail.id,
          'people': +this.detail.people_going
        }
        this.eventService.updateGoingPeople(val).subscribe(resp=>{
          console.log(resp)
        })
      }
    })
  }
 

  checkWishList(){
    if(this.user){
      const data = {
        'user_id' : this.user.id,
        'event_id':this.detail.id
      }
      this.eventService.checkWishList(data).subscribe(res=>{
        console.log(res)
        if(res){
          if(this.detail.id == res.event_id){
            this.IamGoing = true
          }
        }
      }) 
    }
  }

  

}
