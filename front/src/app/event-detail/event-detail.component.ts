import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location }                 from '@angular/common';

import { Category } from '../_models/category';
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
  categories: Category[] = [];
  admin: User;
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
    this.loadAdmin();
    this.loadCategories();
      
    //alert(this.event.id)
  }
    goBack(): void {
      localStorage.removeItem('profileUser');
    this.location.back();
  }
  loadCategories() {
    this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
  }
    loadAdmin(){
        this.userService.getUser(this.event.user_id).subscribe(admin => { this.admin = admin; console.log(admin)});
    }
    categorieOfEvent(){
        for(let category of this.categories){
            console.log(category);
            if(this.event.category_id.toString() == category.id){
                return category.description;
        }
    }
    }
    adminOfEvent(){
        console.log(this.admin)
        let fullname = this.admin.name.concat(" ").concat(this.admin.lastname)
        return fullname;
    }    

}

