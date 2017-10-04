import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import { User } from '../_models/user';
 
@Injectable()
export class UserSearchService {
  private searchUrl =  'http://localhost:3000/users?search='
  constructor(private http: Http) {}
  
  search(term: string): Observable<User[]> {
    return this.http
               .get(this.searchUrl+term)
               .map(response => response.json() as User[]);
  }
}