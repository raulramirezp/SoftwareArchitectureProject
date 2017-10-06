import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
