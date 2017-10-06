import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service'
import { Event } from '../_models/event';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
  events: Event[] = [];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadMyEvents();
  }

  private loadMyEvents() {
      this.eventService.getMyEvents().subscribe(events => { this.events = events; });
  }

}
