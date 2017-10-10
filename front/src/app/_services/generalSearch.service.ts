import { Injectable } from '@angular/core';
import { Http, Headers, Response }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { Event } from '../_models/event';

@Injectable()
export class GeneralSearchService { 
  testEvent: Event[];    
  private localhostaddress = 'http://localhost:3000/';
  private usersSearchUrl =  this.localhostaddress.concat('users?search=');
  private eventsSearchUrl =  this.localhostaddress.concat('events?search=');
  private currentUser: User;
  private headers;
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
  }

  searchUsers(term: string): Observable<User[]> {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    console.log(this.usersSearchUrl+term);
      return this.http.get(this.usersSearchUrl+term, {headers : this.headers}).map(response => response.json() as User[]);
  }
   searchEvents(term: string): Observable<Event[]> {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    console.log(this.eventsSearchUrl+term);
    console.log(this.currentUser.token);
    console.log(this.headers);
    
    return this.http.get(this.eventsSearchUrl+term, {headers : this.headers}).map((response:Response )=> 
        response.json() as Event[]);   
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


