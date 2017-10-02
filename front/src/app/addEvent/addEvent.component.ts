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
    add(name: string, category_id: string, visibility: string, eventType: string, minAge: string, place: string, beginAtDay: string, beginAtMonth: string, beginAtYear: string, beginAtHour: string, endAtDay: string, endAtMonth: string, endAtYear: string, endAtHour:string): void {
      name = name.trim();
      place = place.trim();
      minAge = minAge.trim();
      
      let d = new Date();
        
      let beginAt = beginAtYear.concat('-').concat(beginAtMonth).concat('-').concat(beginAtDay).concat('T').concat(beginAtHour).concat(':').concat('00').concat(':').concat('00');
        
      let endAt = endAtYear.concat('-').concat(endAtMonth).concat('-').concat(endAtDay).concat('T').concat(endAtHour).concat(':').concat('00').concat(':').concat('00');    
        
      if (!name || !place || !minAge ) { return; }
      this.eventService.create(name, category_id, visibility, eventType, minAge, place, beginAt, endAt).then(event => {
        //this.events.push(event);
          console.log(event);
          console.log("this is a test");
          console.log(event.name);  
          this.eventService.createEventDate(event.id,   beginAt, endAt);
          this.router.navigate(['/home'])
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
