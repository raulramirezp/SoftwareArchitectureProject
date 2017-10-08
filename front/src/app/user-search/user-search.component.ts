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

import { UserSearchService } from '../_services/user-search.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  providers: [UserSearchService]
})
export class UserSearchComponent implements OnInit {
  users: Observable<User[]>;
  guests: User[];
  us: User[];
  friends: User[];
  bool: boolean;
  haveFriend: boolean;
  visibilityAnswer: string;
  color: string;
  private searchTerms = new Subject<string>();

  constructor(
    private userSearchService: UserSearchService, private userService: UserService,
    private router: Router) {  }

  // Push a search term into the observable stream.
  search(value: string): void {
    this.searchTerms.next(value);
  }

  ngOnInit(): void {
    this.haveFriend = this.haveFriends()
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
    this.guests = [];
  }

  addToInvitation(user: User): void {
    // debugger;
    var pos = 0;
    this.bool = false;
    console.log(user.email)
    this.us = JSON.parse(localStorage.getItem('guestUsers'));
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
      this.guests.push(user);
      localStorage.setItem('guestUsers', JSON.stringify(this.guests));
    } else {
      this.us.splice(pos, 1)
      this.guests.splice(pos, 1)
      localStorage.removeItem('guestUsers')
      localStorage.setItem('guestUsers', JSON.stringify(this.us));
    }
    // this.color = this.selectedColor(user.email, this.bool)
    console.log(JSON.parse(localStorage.getItem('guestUsers')))
    //this.router.navigate(link);
  }

  // inviteFriend(user: User): void {
  //   console.log(user)
  //   this.guests.push(user);
  //   localStorage.setItem('guestUsers',JSON.stringify(this.guests));
  //   //this.router.navigate(link);
  // }

  setVisibility() {
    if (this.bool) {
      this.visibilityAnswer = "white";
    } else {
      this.visibilityAnswer = "green";
    }
  }

  selectedColor(email): string {
    var t = JSON.parse(localStorage.getItem('guestUsers'));
    if (t != null) {
      for (var i = 0; i < t.length; i++) {
        if (t[i].email == email) {
          return "#9dd49d";
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

}
