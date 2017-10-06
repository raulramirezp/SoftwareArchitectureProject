import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Event } from '../_models/event';
import { EventDate } from '../_models/eventDate';
import { User } from '../_models/user';
import { Category } from '../_models/category';

@Injectable()
export class EventService {
  private localhostaddress = 'http://localhost:3000/';
  private eventsUrl = this.localhostaddress.concat('events');
  private eventDatesUrl = this.localhostaddress.concat('eventdates');
  private categoriesUrl = this.localhostaddress.concat('categories');
  private invitationsUrl = this.localhostaddress.concat('invitations');
  private currentUser: User;
  private headers;
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
  }
  //    getCreatedEvents(){
  //        this.headers= new Headers();
  //        this.headers.append('Content-Type', 'application/json');
  //        console.log("this is another test");
  //        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
  //        console.log("test");
  //        return this.http.get(this.usersUrl, {headers: this.headers}).map((response: Response) => response.json());
  //    }
  // getEvents(event_id) {
  //   return this.http.get(this.eventsUrl)
  //     .toPromise()
  //     .then(response => response.json().data as Event[])
  //     .catch(this.handleError)
  // }
  getEvent(id: string){
    const url = `${this.eventsUrl}/${id}`;
    this.headers= new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(url, {headers: this.headers}).map((response: Response) => response.json());
    }
  //    getCreatedEvents(){
  //        this.headers= new Headers();
  //        this.headers.append('Content-Type', 'application/json');
  //        console.log("this is another test");
  //        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
  //        console.log("test");
  //        return this.http.get(this.usersUrl, {headers: this.headers}).map((response: Response) => response.json());
  //    }
  getEvents(event_id) {
    return this.http.get(this.eventsUrl)
      .toPromise()
      .then(response => response.json().data as Event[])
      .catch(this.handleError)
  }
  // getEvent(id: string): Promise<Event> {
  //   const url = `${this.eventsUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Event)
  //     .catch(this.handleError);
  // }
  create(name: string, category_id: string, assistants: string, isPrivate: string, minAge: string, place: string, beginAt: string, endAt: string): Promise<Event> {
    let privat = false;
    if (isPrivate == 'true') {
      privat = true;
    }
    else {
      privat = false;
    }

    console.log(this.currentUser.token);
    return this.http
      .post(this.eventsUrl, JSON.stringify({ name: name, assistants: assistants, category_id: category_id, user_id: String(this.currentUser.id), isPrivate: privat, minAge: minAge, place: place }), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Event)
      .catch(this.handleError);
  }

  createEventDate(event_id: string, beginAt: string, endAt: string): Promise<EventDate> {
    return this.http
      .post(this.eventDatesUrl, JSON.stringify({ beginAt: beginAt, endAt: endAt, event_id: event_id }), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as EventDate)
      .catch(this.handleError);
  }
  sendInvitations(invited_id: string, event_id: string) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    console.log("this is another test");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http
      .post(this.invitationsUrl, JSON.stringify({ user_id: this.currentUser.id, invited_id: invited_id, event_id: event_id }), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as EventDate)
      .catch(this.handleError);
  }
  getCategories() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.token)
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.categoriesUrl, { headers: this.headers }).map((response: Response) => response.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
