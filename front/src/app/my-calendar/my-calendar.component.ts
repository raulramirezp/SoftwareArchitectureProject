import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service'
import { Event } from '../_models/event';
import { Category } from '../_models/category';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
  events: Event[] = [];
  categories: Category[] = [];
  constructor(private eventService: EventService, private homeComponent: HomeComponent) { }

  ngOnInit() {
    this.loadMyEvents();
    this.loadCategories();
    console.log(this.events)
    console.log(this.categories)
  }

  private loadMyEvents() {
      this.eventService.getMyEvents().subscribe(events => { this.events = events; });
  }

  loadCategories() {
    this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
  }

  loadHaveFriend(){
    console.log(localStorage.setItem('sizeFriends',JSON.stringify(this.homeComponent.friends.length)))
  }

}
