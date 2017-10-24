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


@Component({
  selector: 'app-general-search',
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.css'],
  providers: [GeneralSearchService]
})
export class GeneralSearchComponent implements OnInit {
    users: Observable<User[]>;
    events: Observable<Event[]>;
    typing;
    private searchTerms = new Subject<string>();
    constructor(
        private generalSearchService: GeneralSearchService, private userService: UserService,
        private eventService: EventService,
        private router: Router
        ) {
      this.typing = false;
     }
    search(value: string): void {
        this.searchTerms.next(value);
        if(value.length > 0)
          this.typing = true;
        else
          this.typing = false;
    }

    isTyping(): boolean{
      return this.typing;
    }

    ngOnInit(): void {
    this.users = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.generalSearchService.searchUsers(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<User[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<User[]>([]);
      });

    this.events = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.generalSearchService.searchEvents(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Event[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        console.log("error  events"); console.log(this.generalSearchService.testEvent);
        return Observable.of<Event[]>([]);
      });
        console.log('test get everything');
        this.typing = false;
  }


    goToUser(user: User): void{
       console.log("goto user test"); this.userService.viewProfile(user.id).subscribe(profileUser => {
           console.log(profileUser.name)
           localStorage.setItem('profileUser',JSON.stringify(profileUser));
            console.log('pretest');
            console.log(profileUser.email);
            let link = ['/profile', user.id];
       this.router.navigate(link);
     });
    }
    goToEvent(event: Event): void{
        console.log("goto event test"); this.eventService.getEvent(event.id.toString()).subscribe(eventDetail => {
           console.log(eventDetail.name)
           localStorage.setItem('eventDetail',JSON.stringify(eventDetail));
            console.log('pretest');
            console.log(eventDetail.email);
            let link = ['/eventDetail', event.id.toString()];
       this.router.navigate(link);
       });
    }

}
