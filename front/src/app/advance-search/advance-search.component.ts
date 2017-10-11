import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { GeneralSearchService } from '../_services/generalSearch.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Event } from '../_models/event';
import { EventService } from '../_services/event.service';
import { Category } from '../_models/category';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  providers: [GeneralSearchService]
})
export class AdvanceSearchComponent implements OnInit {
  categories: Category[] = [];
  today: string;
  endDate: string;
  events: Event[];
  constructor(
    private generalSearchService: GeneralSearchService, private userService: UserService,
    private eventService: EventService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loadCategories();
  }
  search(name: string, category_id: string, isPrivate: string, beginAt: string, endAt: string ){
      console.log(name);   
      //let tempName=null;
      if(!name){
          console.log("name empty");   
      }
      else{
         // tempName=name;
      }
      console.log(name, category_id, isPrivate, beginAt, endAt);
      //this.eventService.getSpecificEvents(tempName, category_id, isPrivate, beginAt, endAt).subscribe(events => {this.events = events});
  }
  loadCategories() {
    this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
  }
  getValueFromSelect(value) {
    if(value=="null"){
        return null;
    }
    return value;
  }
  getActualDate() {
    console.log(typeof this.today);
    return this.today;
  }
  updateFinal(value){
    this.endDate = value;
  }
  consoleOut(value) {
    console.log(value)
  }    

}
