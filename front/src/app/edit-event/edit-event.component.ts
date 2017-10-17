import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../_models/event';
import { Category } from '../_models/category';
import { User } from '../_models/user';
import { EventService } from '../_services/event.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  private events: Event[];
  private invitedUsers: User[];
  private previousInvitedUsers: User[];
  private removeConfirmedUsers: User[];
  private user: User;
  event: Event;
  tzoffset: number = (new Date()).getTimezoneOffset() * 60000;
  categories: Category[] = [];
  today: string;
  endDate: string;
  mAge: string;
  loadedCategory: string;
  loadedP1: boolean;
  loadedP2: boolean;
  constructor(private eventService: EventService,
    private router: Router) {
    this.today = new Date(Date.now() - this.tzoffset).toISOString().slice(0, 16);
  }

 ngAfterViewInit(){
  //  this.loadLocalStorage('minAge',(<HTMLInputElement>document.getElementById('ev_minAge')).value)
  (<HTMLInputElement>document.getElementById('ev_name')).value = String(this.event.name);
  this.loadedCategory = String(this.event.category_id);
  if (this.event.isPrivate) {
    this.loadedP1 = true;
    this.loadedP2 = false;
  } else {
    this.loadedP1 = false;
    this.loadedP2 = true;
  };
  (<HTMLInputElement>document.getElementById('ev_assistants')).value = String(this.event.assistants);
  (<HTMLInputElement>document.getElementById('ev_place')).value = String(this.event.place);
  let parsedBeginDate = String(this.event.beginAt).split(' ').join('T');
  (<HTMLInputElement>document.getElementById('ev_beginAt')).value = parsedBeginDate;
  (<HTMLInputElement>document.getElementById('ev_beginAt')).setAttribute('min',parsedBeginDate);
  let parsedEndDate = String(this.event.endAt).split(' ').join('T');
  (<HTMLInputElement>document.getElementById('ev_endAt')).value = parsedEndDate;
  (<HTMLInputElement>document.getElementById('ev_endAt')).setAttribute('min',parsedBeginDate);
  // (<HTMLInputElement>document.getElementById('ev_endAt')).value = String(this.event.endAt);
  // localStorage.removeItem('eventToEdit');

   this.loadLocalStorage('assistants',(<HTMLInputElement>document.getElementById('ev_assistants')).value);
 }
 ngOnInit() {
   this.loadCategories();
   this.event = JSON.parse(localStorage.getItem('eventToEdit'));
   // console.log(this.homeComp.getFriendsCount())
 }

  loadLocalStorage(t,v){
    localStorage.setItem(t,v)
  }

  private getEvent(event_id: string){
    this.eventService.getEvent(event_id).subscribe( event => { this.event });
  }

  findByAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] == value) {
          return i;
        }
    }
    return -1;
  }

  update(name: string, category_id: string, isPrivate: string, assistants: string, minAge: string, place: string, beginAt: string, endAt: string): void {
    // console.log(name, category_id, isPrivate, assistants, minAge, place, beginAt, endAt)
    name = name.trim();
    place = place.trim();
    minAge = minAge.trim();
    let d = new Date();
    // let beginAt = beginAtYear.concat('-').concat(beginAtMonth).concat('-').concat(beginAtDay).concat('T').concat(beginAtHour).concat(':').concat('00').concat(':').concat('00');

    // let endAt = endAtYear.concat('-').concat(endAtMonth).concat('-').concat(endAtDay).concat('T').concat(endAtHour).concat(':').concat('00').concat(':').concat('00');
    if (!name || !place || !minAge || !category_id) { return; }
    this.eventService.update(name, category_id, assistants, isPrivate, minAge, place, beginAt, endAt).then(event => {
            //this.events.push(event);
              // this.eventService.createEventDate(event.id,   beginAt, endAt);
              this.user=JSON.parse(localStorage.getItem('currentUser'));
              this.invitedUsers=JSON.parse(localStorage.getItem('guestUsers'));
              this.previousInvitedUsers = JSON.parse(localStorage.getItem('previusGuest'));
              for(var i=0;i<this.invitedUsers.length;i++){
                // console.log(this.findByAttr(this.previousInvitedUsers,'email',this.invitedUsers[i].email))
                if (this.findByAttr(this.previousInvitedUsers,'email',this.invitedUsers[i].email) == -1) {
                  this.eventService.sendInvitations(this.invitedUsers[i].id, event.id)
                }
              }
              for(var i=0;i<this.previousInvitedUsers.length;i++){
                // this.eventService.sendInvitations(this.invitedUsers[i].id, event.id)
                // console.log(this.findByAttr(this.invitedUsers,'email',this.previousInvitedUsers[i].email))
                if (this.findByAttr(this.invitedUsers,'email',this.previousInvitedUsers[i].email) == -1) {
                  this.eventService.removeInvitation(this.previousInvitedUsers[i].id, event.id)
                }
              }
              if (this.invitedUsers != null){
                for(var i=0;i<this.invitedUsers.length;i++){
                  // this.eventService.sendInvitations(this.invitedUsers[i].id, event.id)
                }
              }
              this.removeConfirmedUsers = JSON.parse(localStorage.getItem('confirmUsers'));
              if (this.removeConfirmedUsers != null) {
                for(var i=0;i<this.removeConfirmedUsers.length;i++){
                  this.eventService.removeConfirmed(this.removeConfirmedUsers[i].id, event.id)
                }
              }
              localStorage.removeItem('guestUsers');
              localStorage.removeItem('confirmUsers');
              localStorage.removeItem('assistants');
              localStorage.removeItem('eventToEdit');
              localStorage.removeItem('previusGuest');
              this.router.navigate(['/home'])
    }, error => {
      console.log(error);
      alert("No se pudo guardar los cambios.");
    });
  }

  clearLocalStorage(){
    localStorage.removeItem('guestUsers');
    localStorage.removeItem('confirmUsers');
    localStorage.removeItem('eventToEdit');
    localStorage.removeItem('assistants');
    localStorage.removeItem('previusGuest');
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
