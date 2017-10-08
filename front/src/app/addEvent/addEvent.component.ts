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
  private invitedUsers: User[];
  private user: User;
  event: Event;
  tzoffset: number = (new Date()).getTimezoneOffset() * 60000;
  categories: Category[] = [];
  today: string;
  endDate: string;
  constructor(private eventService: EventService,
    private router: Router) {
    this.today = new Date(Date.now() - this.tzoffset).toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.loadCategories();
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
    this.eventService.create(name, category_id, assistants, isPrivate, minAge, place, beginAt, endAt).then(event => {
            //this.events.push(event);
              console.log(event);
              console.log("this is a test");
              console.log(event.name);
              // this.eventService.createEventDate(event.id,   beginAt, endAt);
              this.user=JSON.parse(localStorage.getItem('currentUser'));
              this.invitedUsers=JSON.parse(localStorage.getItem('guestUsers'));
              if (this.invitedUsers != null){
                for(var i=0;i<this.invitedUsers.length;i++){
                  this.eventService.sendInvitations(this.invitedUsers[i].id, event.id)
                }
              }
              localStorage.removeItem('guestUsers');
              this.router.navigate(['/home'])
    }, error => {
      console.log(error);
      alert("No se pudo crear el evento");
    });
  }

  clearInvitations(){
    localStorage.removeItem('guestUsers');
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
