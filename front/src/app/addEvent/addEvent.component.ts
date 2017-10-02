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
    add(name: string, category_id: string, visibility: string, eventType: string, minAge: string, place: string, beginAt: string, endAt: string, category: string): void {
      name = name.trim();
      place = place.trim();
      minAge = minAge.trim();
      if (!name || !place || !minAge ) { return; }
      this.eventService.create(name, category_id, visibility, eventType, minAge, place, beginAt, endAt, category).then(event => {
        this.events.push(event);
      });
    }

}
//Event
//t.string :name
//      t.integer :assistants
//      t.references :category, foreign_key: true
//      t.references :user, foreign_key: true
//      t.string :visibility
//      t.string :eventType
//      t.integer :minAge
//      t.string :place
//EventDate      
//      t.datetime :beginAt
//      t.datetime :endAt
//      t.references :event, foreign_key: true
//Category
//t.string :description
//      t.string :imagen
