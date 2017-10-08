import { Injectable } from '@angular/core';
import { Http, Headers }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';

@Injectable()
export class UserSearchService {
  private localhostaddress = 'http://localhost:3000/';
  private searchUrl =  this.localhostaddress.concat('users/searchfriend?search=');
  private currentUser: User;
  private headers;
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
  }

  searchFriends(term: string): Observable<User[]> {
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http
               .get(this.searchUrl+term, {headers : this.headers})
               .map(response => response.json() as User[]);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
