import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event } from '../_models/event';
import { EventService } from '../_services/event.service';
@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.css']
})
export class AddEventComponent implements OnInit {
    events: Event[];
  constructor(private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
  }
    add(name: string, place: string, isPrivate: boolean, minAge: number, category: number , beginAt: string, endAt: string): void {
      name = name.trim();
      place = place.trim();
      if (!name || !place || !minAge ) { return; }
      this.eventService.create(name, place, isPrivate, minAge, category, beginAt, endAt).then(event => {
        this.events.push(event);
      });
    }

}
