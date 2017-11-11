import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service'
import { Event } from '../_models/event';
import { Category } from '../_models/category';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { HomeComponent } from '../home/home.component';
import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html'
})
export class MyCalendarComponent implements OnInit {
  isReady: boolean = false;
  events: Event[] = [];
  categories: Category[] = [];
  calendarOptions:Object = {
        height: '100%',
        fixedWeekCount : false,
        defaultDate: Date.now(),
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: [
        ]
      };

  constructor(private eventService: EventService, private homeComponent: HomeComponent,
  private router: Router) { }

  ngOnInit() {

    this.loadMyEvents();
    // this.loadCategories();
  }
//  setCalendarOptions(){
//      console.log(this.events.length)
//      for(var i =0;i<this.events.length;i++)
//                  {
//                      this.calendarOptions['events'].push({
//                          title: this.events[i].name,
//                          start: this.events[i].beginAt.substring(0,10).concat('T').concat(this.events[i].beginAt.substring(11,this.events[i].beginAt.length)),
//                          end: this.events[i].endAt.substring(0,10).concat('T').concat(this.events[i].endAt.substring(11,this.events[i].endAt.length))
//                      });
//                  }
//                  console.log('show events test')
//                  console.log(this.calendarOptions['events']);
//      return this.calendarOptions;
//
//  }
  private loadMyEvents() {
      this.eventService.getMyEvents().subscribe(events => { this.events = events; this.loadCategories();
              for(var i =0;i<this.events.length;i++)
                  {
                      this.calendarOptions['events'].push({
                          title: this.events[i].name,
                          start: this.events[i].beginAt.substring(0,10).concat('T').concat(this.events[i].beginAt.substring(11,this.events[i].beginAt.length)),
                          end: this.events[i].endAt.substring(0,10).concat('T').concat(this.events[i].endAt.substring(11,this.events[i].endAt.length)),
                          url: '/eventDetail/'.concat(this.events[i].id.toString())
                          //url: '/eventDetail/'.concat(this.events[i].id.toString())
                      });

                  }
                  console.log('show events test')
                  console.log(this.calendarOptions['events']);
                  this.isReady = true;
                                                          });
  }
  goToEvent(event: Event): void{
        console.log("goto event test"); this.eventService.getEvent(event.id.toString()).subscribe(eventDetail => {
           console.log(eventDetail.name)
           localStorage.setItem('eventDetail',JSON.stringify(eventDetail));
            console.log('pretest');
            console.log(eventDetail.email);
            let link = ['/eventDetail', event.id.toString()];
            this.router.navigate(link);
       });
    }

  loadCategories() {
    this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
  }

  loadHaveFriend(){
    console.log(localStorage.setItem('sizeFriends',JSON.stringify(this.homeComponent.friends.length)))
  }


}
