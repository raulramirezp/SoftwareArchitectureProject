import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { User } from '../_models/user';
import { Authentication } from '../_models/authentication';

@Injectable()
export class UserService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private usersUrl = 'http://192.168.99.101:3000/users';
    private authenticationsUrl = 'http://192.168.99.101:3000/authentication';
    // URL to web api
    constructor(private http: Http) {  }
    authenticate(user_email, user_password){
      return this.http
        .post(this.authenticationsUrl, JSON.stringify({user_email:user_email , user_password:user_password }), {headers: this.headers})
        .toPromise()
        .then(res => { //res.json().data as Authentication;
                     let user =res.json().data;
                     if(user){
                         localStorage.setItem('currentUser',JSON.stringify(user) )  
                     }})
        .catch(this.handleError);  
    }
    
    getUsers(user_id){
        return this.http.get(this.usersUrl)
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError)
    }
    getUser(id: number): Promise<User> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }
    create(firstName: string, lastName: string, email: string, password:string): Promise<User> {
      return this.http
        .post(this.usersUrl, JSON.stringify({firstName: firstName, lastName: lastName, email:email, password:password }), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as User)
        .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
