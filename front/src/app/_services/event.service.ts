import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Event } from '../_models/event';

@Injectable()
export class EventService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private eventsUrl = 'http://192.168.99.101:3000/events'; 
    
    constructor(private http: Http) {  }
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
    create(firstName: string, lastName: string, email: string, password:string): Promise<Event> {
      return this.http
        .post(this.eventsUrl, JSON.stringify({firstName: firstName, lastName: lastName, email:email, password:password }), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Event)
        .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
