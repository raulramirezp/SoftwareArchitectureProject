import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location }                 from '@angular/common';
 
import { User }        from '../_models/user';
import { UserService } from '../_services/user.service';
import { Event }        from '../_models/event';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  user: User;
  constructor(
    private userService: UserService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
   // this.userService.getUser('id')
     // .subscribe(user => this.user = user);
    this.event = JSON.parse(localStorage.getItem('eventDetail'));
  }
    goBack(): void {
      localStorage.removeItem('profileUser');
    this.location.back();
  }    

}
