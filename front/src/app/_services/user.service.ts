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
    private usersUrl = 'http://localhost:3000/users';
    private authenticationsUrl = 'http://localhost:3000/authentications';
    private loginUrl = 'http://localhost:3000/login.json';
    // URL to web api
    
    constructor(private http: Http) {  }
    authenticate(user_email:string, user_password:string){  
    return this.http
        .post(this.loginUrl, JSON.stringify({email:user_email , password:user_password }), {headers: this.headers})
        .toPromise()
        .then(res => { //res.json().data as User;
                     let user =res.json();
                     if(user){
                         localStorage.setItem('currentUser',JSON.stringify(user) )  
                     }})
        .catch(this.handleError);  
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    getUsers(user_id){
        return this.http.get(this.usersUrl)
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError)
    }
    getCurrtenUser(id: number): Promise<User> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }
    createUser(firstName: string, lastName: string, email: string, nickname: string, birthdate:string): Promise<User> {
        console.log('this is a test');
        console.log(this.usersUrl);
        return this.http
        .post(this.usersUrl, JSON.stringify({name: firstName, lastname: lastName, nickname:nickname, birthdate:birthdate, email:email }), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as User)
        .catch(this.handleError);
    }
    createAuthentication(user_id:string, password:string): Promise<Authentication> {
        return this.http.post(this.authenticationsUrl,JSON.stringify({user_id:user_id, password_digest: password}), {headers: this.headers}).toPromise().then(res => res.json() as Authentication).catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
