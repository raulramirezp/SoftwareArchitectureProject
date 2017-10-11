import { Component, OnInit } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { UserSearchService } from '../_services/user-search.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { EventService } from '../_services/event.service';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  providers: [UserSearchService]
})
export class UserSearchComponent implements OnInit {
  users: Observable<User[]>;
  guests: User[];
  confUs: User[];
  us: User[];
  friends: User[];
  bool: boolean;
  isEditing: boolean;
  haveFriend: boolean;
  visibilityAnswer: string;
  color: string;
  invitedUs: User[] = [];
  confirmedUs: User[] = [];
  confirmedUsers: User[] = [];
  previousInvitedUsers: User[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private userSearchService: UserSearchService, private userService: UserService, private eventService: EventService,
    private router: Router) {  }

  // Push a search term into the observable stream.
  search(value: string): void {
    this.searchTerms.next(value);
  }

  ngAfterViewInit(){
    // if (this.isEditing) {
    //   console.log(this.invitedUs,this.previousInvitedUsers)
    //   this.invitedUs = this.previousInvitedUsers.concat(this.invitedUs)
    //   // (<HTMLInputElement>document.getElementById('ev_name')).value = String(this.event.name);
    // }
  }

  ngOnInit(): void {
    this.editing();
    this.invitedUs = JSON.parse(localStorage.getItem('guestUsers'));
    if (this.isEditing) {
      this.loadInvitedsToEvent(JSON.parse(localStorage.getItem('eventToEdit')).id);
      this.loadConfirmedAssistants(JSON.parse(localStorage.getItem('eventToEdit')).id);
      // console.log(this.invitedUs,this.previousInvitedUsers)
      this.confirmedUsers = JSON.parse(localStorage.getItem('confirmUsers'));
      // (<HTMLInputElement>document.getElementById('ev_name')).value = String(this.event.name);
    }
    this.haveFriend = this.haveFriends();
    this.users = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.userSearchService.searchFriends(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<User[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<User[]>([]);
      });
    // console.log(this.addEventComponent.mAge)
    this.guests = [];
    this.confUs = [];
  }

  addToInvitation(user: User): void {
    // debugger;
    var title = 'guestUsers';
    if (this.isEditing && this.confirmedUsers.indexOf(user) > -1) {
      title = 'confirmUsers';
    }
    var pos = 0;
    this.bool = false;
    this.us = JSON.parse(localStorage.getItem(title));
    if (this.us != null) {
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].email == user.email) {
          this.bool = true;
          pos = i;
          break;
        }
      }
    }
    if (!this.bool) {
      if (this.isEditing) {
        this.guests = JSON.parse(localStorage.getItem(title));
      }
      this.guests.push(user);
      localStorage.setItem(title, JSON.stringify(this.guests));
    } else {
      this.us.splice(pos, 1)
      this.guests.splice(pos, 1)
      localStorage.removeItem(title)
      localStorage.setItem(title, JSON.stringify(this.us));
    }
    // this.color = this.selectedColor(user.email, this.bool)
    //this.router.navigate(link);
    this.invitedUs = JSON.parse(localStorage.getItem('guestUsers'));
  }

  removeFromInvitation(user: User): void {
    // debugger;
    var pos = 0;
    this.bool = false;
    this.us = JSON.parse(localStorage.getItem('guestUsers'));
    if (this.us != null) {
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].email == user.email) {
          // this.bool = true;
          pos = i;
          this.us.splice(pos, 1)
          this.guests.splice(pos, 1)
          localStorage.removeItem('guestUsers')
          localStorage.setItem('guestUsers', JSON.stringify(this.us));
          break;
        }
      }
    }
    this.invitedUs = JSON.parse(localStorage.getItem('guestUsers'));
  }

  removeFromConfirmed(user: User): void {
    // debugger;
    var pos = 0;
    this.bool = false;
    this.us = JSON.parse(localStorage.getItem('confirmUsers'));
    if (this.us != null) {
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].email == user.email) {
          this.bool = true;
          pos = i;
          break;
        }
      }
    }
    if (!this.bool) {
      this.confUs.push(user);
      localStorage.setItem('confirmUsers', JSON.stringify(this.confUs));
    } else {
      this.us.splice(pos, 1)
      this.confUs.splice(pos, 1)
      localStorage.removeItem('confirmUsers')
      localStorage.setItem('confirmUsers', JSON.stringify(this.us));
    }
    // this.color = this.selectedColor(user.email, this.bool)
    //this.router.navigate(link);
    // this.confirmedUs = JSON.parse(localStorage.getItem('confirmUsers'));
  }

  selectedColorConfirm(email): string {
    var t = JSON.parse(localStorage.getItem('confirmUsers'));
    if (t != null) {
      for (var i = 0; i < t.length; i++) {
        if (t[i].email == email) {
          return "#ffbb33";
        }
      }
    return "white"
    }
  }

  selectedColor(email): string {
    var t = JSON.parse(localStorage.getItem('guestUsers'));
    if (t != null) {
      for (var i = 0; i < t.length; i++) {
        if (t[i].email == email) {
          return "#e7908e";
        }
      }
    return "white"
    }
  }

  haveFriends(): boolean {
      if (localStorage.getItem('sizeFriends') == '0'){
        console.log("yes");
        return false;
      }
      return true;
  }

  logConsole(v){
    console.log(v)
  }

  loadLocalStorage(t){
    return localStorage.getItem(t);
  }

  editing():boolean{
    if (this.router.url == "/editevent") {
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }
    return this.isEditing;
  }
  findByAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] == value) {
          return i;
        }
    }
    return -1;
  }
  loadInvitedsToEvent(event_id: string) {
    this.eventService.getInvitedToEvent(event_id).subscribe(previousInvitedUsers => { this.previousInvitedUsers = previousInvitedUsers;
      localStorage.setItem('guestUsers', JSON.stringify(this.previousInvitedUsers));
      localStorage.setItem('previusGuest', JSON.stringify(this.previousInvitedUsers));
      this.previousInvitedUsers;
      this.invitedUs = this.previousInvitedUsers;
    });
  }
  loadConfirmedAssistants(event_id: string) {
    this.eventService.getConfirmedAssistantsToEvent(event_id).subscribe(confirmedUsers => { this.confirmedUsers = confirmedUsers;
      let indx = this.findByAttr(this.confirmedUsers, 'email', JSON.parse(localStorage.getItem('currentUser')).mail);
      if (indx > -1) {
        this.confirmedUsers.splice(indx, 1);
      };
    });

  }

}
