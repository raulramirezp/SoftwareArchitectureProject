import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event } from '../_models/event';
import { Category } from '../_models/category';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: Event;
  categories: Category[] = [];

  constructor(private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
  }

  private getEvent(event_id: string){
    this.eventService.getEvent(event_id).subscribe( event => { this.event });
  }

}
