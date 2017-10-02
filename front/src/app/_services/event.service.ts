import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Event } from '../_models/event';
import { EventDate } from '../_models/eventDate';
import { User } from '../_models/user';

@Injectable()
export class EventService {
    private eventsUrl = 'http://localhost:3000/events';
    private eventDatesUrl = 'http://localhost:3000/eventdates'; 
    private currentUser: User;
    private headers;
    constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers= new Headers();
    this.headers.append('Content-Type', 'application/json');
     this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    }
    
    getEvents(event_id){
        return this.http.get(this.eventsUrl)
        .toPromise()
        .then(response => response.json().data as Event[])
        .catch(this.handleError)
    }
    getEvent(id: number): Promise<Event> {
      const url = `${this.eventsUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Event)
        .catch(this.handleError);
    }
    create(name: string, category_id: string, visibility: string, eventType: string, minAge: string, place: string, beginAt: string, endAt: string): Promise<Event> {
        console.log(this.currentUser.token);
      return this.http
        .post(this.eventsUrl, JSON.stringify({name: name, assistants:"0", category_id:category_id, user_id: this.currentUser.id, visibility: visibility, eventType: eventType, minAge: minAge, place: place}), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Event)
        .catch(this.handleError);
    }
    createEventDate(event_id: string, beginAt: string, endAt: string): Promise<EventDate> {
      return this.http
        .post(this.eventDatesUrl, JSON.stringify({ beginAt:beginAt, endAt: endAt, event_id: event_id}), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as EventDate)
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}