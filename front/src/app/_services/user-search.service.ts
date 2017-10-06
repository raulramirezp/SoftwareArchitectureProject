import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';

@Injectable()
export class UserSearchService {
  private localhostaddress = 'http://localhost:3000/';
  private searchUrl =  this.localhostaddress.concat('users?search=');
  private currentUser: User;
  constructor(private http: Http) {}

  search(term: string): Observable<User[]> {
    return this.http
               .get(this.searchUrl+term)
               .map(response => response.json() as User[]);
  }
}
