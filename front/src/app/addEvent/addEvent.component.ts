import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../_models/event';
import { Category } from '../_models/category';
import { User } from '../_models/user';
import { EventService } from '../_services/event.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.css']
})

export class AddEventComponent implements OnInit {
  private events: Event[];
  event: Event;
  tzoffset: number = (new Date()).getTimezoneOffset() * 60000;
  categories: Category[] = [];
  today: string;
  endDate: string;
  mAge: string;
  ESBResponse: string;
  currentUser: User;
  constructor(private eventService: EventService,
    private router: Router) {
    this.today = new Date(Date.now() - this.tzoffset).toISOString().slice(0, 16);
  }

 ngAfterViewInit(){
  //  this.loadLocalStorage('minAge',(<HTMLInputElement>document.getElementById('ev_minAge')).value)
   this.loadLocalStorage('assistants',(<HTMLInputElement>document.getElementById('ev_assistants')).value)
 }

 loadLocalStorage(t,v){
   localStorage.setItem(t,v)
 }

  ngOnInit() {
    this.loadCategories();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.homeComp.getFriendsCount())
  }
  add(name: string, category_id: string, isPrivate: string, assistants: string, minAge: string, place: string, beginAt: string, endAt: string): void {
    console.log(name, category_id, isPrivate, assistants, minAge, place, beginAt, endAt)
    name = name.trim();
    place = place.trim();
    minAge = minAge.trim();
    let d = new Date();
    // let beginAt = beginAtYear.concat('-').concat(beginAtMonth).concat('-').concat(beginAtDay).concat('T').concat(beginAtHour).concat(':').concat('00').concat(':').concat('00');

    // let endAt = endAtYear.concat('-').concat(endAtMonth).concat('-').concat(endAtDay).concat('T').concat(endAtHour).concat(':').concat('00').concat(':').concat('00');
    if (!name || !place || !minAge || !category_id) { return; }
    let category='';
    console.log(this.categories);
    for(let i=0;i<this.categories.length;i++)
    {
      console.log(category_id,i)
      if(category_id==(i+1).toString()){
        category=this.categories[i].description;
        break;
      }
    }
    this.eventService.postESB(category, this.currentUser.id).subscribe(ESBResponse => {
      this.ESBResponse = ESBResponse;
      console.log("ESBResponse")
      console.log(ESBResponse);
      console.log(ESBResponse.bes_operation_response.response_ad_list);
      console.log(JSON.parse(ESBResponse.bes_operation_response.response_user_l_ist));

      this.eventService.create(name, category_id, assistants, isPrivate, minAge, place, beginAt, endAt, ESBResponse.bes_operation_response.response_ad_list).then(event => {
          this.event = event;
          localStorage.setItem('newEvent',JSON.stringify(event));
          let friendsList = JSON.parse(ESBResponse.bes_operation_response.response_user_l_ist);
          // Interoperar aqui
          if (friendsList.length > 0){
            for(var i=0;i<friendsList.length;i++){
              this.eventService.sendInvitations(friendsList[i], event.id.toString())
              // console.log(this.event[0]);
            }
          }
          this.clearLocalStorage();

          this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        alert("No se pudo crear el evento");
      });
    });

  }

  clearLocalStorage(){
    // localStorage.removeItem('minAge');
    localStorage.removeItem('guestUsers');
    localStorage.removeItem('assistants');
  }
  postESB(category_id){


  }
  loadCategories() {
    this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
  }
  getValueFromSelect(value) {
    return value;
  }
  getActualDate() {
    console.log(typeof this.today);
    return this.today;
  }
  updateFinal(value){
    this.endDate = value;
  }
  consoleOut(value) {
    console.log(value)
  }
}
