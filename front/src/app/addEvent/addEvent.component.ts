import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Event } from '../_models/event';
import { User } from '../_models/user';
import { EventService } from '../_services/event.service';
@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.css']
})
export class AddEventComponent implements OnInit {
    private events: Event[];
    private invitedUsers: User[];
    private user: User;
  constructor(private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
  }
    add(name: string, category_id: string, isPrivate: string, minAge: string, place: string, beginAtDay: string, beginAtMonth: string, beginAtYear: string, beginAtHour: string, endAtDay: string, endAtMonth: string, endAtYear: string, endAtHour:string): void {
      name = name.trim();
      place = place.trim();
      minAge = minAge.trim();
      
      let d = new Date();
        
      let beginAt = beginAtYear.concat('-').concat(beginAtMonth).concat('-').concat(beginAtDay).concat('T').concat(beginAtHour).concat(':').concat('00').concat(':').concat('00');
        
      let endAt = endAtYear.concat('-').concat(endAtMonth).concat('-').concat(endAtDay).concat('T').concat(endAtHour).concat(':').concat('00').concat(':').concat('00');    
        
      if (!name || !place || !minAge ) { return; }
      this.eventService.create(name, category_id, isPrivate, minAge, place, beginAt, endAt).then(event => {
        //this.events.push(event);
          console.log(event);
          console.log("this is a test");
          console.log(event.name);  
          this.eventService.createEventDate(event.id,   beginAt, endAt);
          this.user=JSON.parse(localStorage.getItem('currentUser'));
          this.invitedUsers=JSON.parse(localStorage.getItem('guestUsers'));
          for(var i=0;i<this.invitedUsers.length;i++){
            this.eventService.sendInvitations(this.invitedUsers[i].id, event.id)
          }
          localStorage.removeItem('currentUser');
          this.router.navigate(['/home'])
      });   
    }

}
