import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { User } from '../_models/user';
import { Authentication } from '../_models/authentication';
import { Router }            from '@angular/router';

@Injectable()
export class UserService {
    private headers;
    private currentUser: User;
    private usersUrl = 'http://localhost:3000/users/';
    private authenticationsUrl = 'http://localhost:3000/authentications';
    private loginUrl = 'http://localhost:3000/login.json';
    // URL to web api
    private inviteUrl = 'http://localhost:3000/relationships/invite/';
    private requestsUrl = 'http://localhost:3000/relationships/requests/';
    private aceptRequestUrl = 'http://localhost:3000/relationships/acept/';
    private friendsUrl = 'http://localhost:3000/friendships/friends/';
    constructor(private http: Http, private router: Router) {
   //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     //   this.headers= new Headers();
    //    this.headers.append('Content-Type', 'application/json');
    //    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    
    }
    authenticate(user_email:string, user_password:string){
        this.headers= new Headers();
        this.headers.append('Content-Type', 'application/json');
    //    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http
        .post(this.loginUrl, JSON.stringify({email:user_email , password:user_password }), {headers: this.headers}).map((response: Response) => {
        // res.json().data as User;
            let item =response.json();
          localStorage.setItem('currentUser',JSON.stringify(item));
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        })
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
    }
    getUser(user_id:number){
        const url = `${this.usersUrl}/${user_id}`;
        return this.http.get(this.usersUrl)
        .toPromise()
        .then(response => response.json() as User)
        .catch(this.handleError)
    }
    getCurrtenUser(id: number): Promise<User> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }
    getFriends() {
      const url = this.friendsUrl;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        
        this.headers= new Headers();
        this.headers.append('currentUser', this.currentUser.id);
        console.log("this is another test");
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
       return this.http.get(this.friendsUrl, {headers: this.headers}).map((response: Response) => response.json());
    }
    getProfileFriends() {
      const url = this.friendsUrl;
        this.headers= new Headers();
        this.headers.append('currentUser', this.currentUser.id);
        console.log("this is another test");
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
       return this.http.get(this.friendsUrl, {headers: this.headers}).map((response: Response) => response.json());
    }
    getAll(){
        this.headers= new Headers();
        this.headers.append('Content-Type', 'application/json');
        console.log("this is another test");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
        console.log("test defiitive");
        return this.http.get(this.usersUrl, {headers: this.headers}).map((response: Response) => response.json());
    }
    getRequests(){
        this.headers= new Headers();
//        this.headers.append('Content-Type', 'application/json');
//        console.log("this is another test");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers.append('currentUser', this.currentUser.id);
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
        console.log("test");
        return this.http.get(this.requestsUrl, {headers: this.headers}).map((response: Response) => response.json());
    }
    addFriend(id: string)
    {
        console.log("this is another test")
        this.headers= new Headers();
        this.headers.append('currentUser', this.currentUser.id);
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
        return this.http.get(this.inviteUrl+id, {headers: this.headers}).map((response: Response) => response.json());
    }
    aceptFriend(id: string)
    {
        console.log("this is another test 1")
        this.headers= new Headers();
        this.headers.append('currentUser', this.currentUser.id);
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
        return this.http.get(this.aceptRequestUrl+id, {headers: this.headers}).map((response: Response) => response.json());
    }
    viewProfile(user_id:string)
    {
        console.log("test 5");
        this.headers= new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
        return this.http.get(this.usersUrl+user_id, {headers: this.headers}).map((response: Response) => response.json());
    }
    createUser(firstName: string, lastName: string, email: string, nickname: string, birthdate:string): Promise<User> {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers= new Headers();
        this.headers.append('Content-Type', 'application/json');
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
