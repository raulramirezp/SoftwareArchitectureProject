import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { User } from '../_models/user';
import { Authentication } from '../_models/authentication';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private headers;
  private localhostaddress = 'http://localhost:3000/';
  private currentUser: User;
  private usersUrl = this.localhostaddress.concat('users/');
  private authenticationsUrl = this.localhostaddress.concat('authentications');
  private loginUrl = this.localhostaddress.concat('login.json');
  // URL to web api
  private inviteUrl = this.localhostaddress.concat('relationships/invite/');
  private requestsUrl = this.localhostaddress.concat('relationships/requests/');
  private aceptRequestUrl = this.localhostaddress.concat('relationships/acept/');
  private declineRequestUrl = this.localhostaddress.concat('relationships/decline/');
  private friendsUrl = this.localhostaddress.concat('friendships/friends/');
  private friendFriendsUrl = this.localhostaddress.concat('friendships/friends_of/');
  private removeFriendUrl = this.localhostaddress.concat('friendships/remove/');
  constructor(private http: Http, private router: Router) {
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //   this.headers= new Headers();
    //    this.headers.append('Content-Type', 'application/json');
    //    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));

  }
  authenticate(user_email: string, user_password: string) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    //    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http
      .post(this.loginUrl, JSON.stringify({ email: user_email, password: user_password }), { headers: this.headers }).map((response: Response) => {
        // res.json().data as User;
        let item = response.json();
        localStorage.setItem('currentUser', JSON.stringify(item));
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      })
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
  }
  getUser(user_id: number) {
    const userUrl = `${this.usersUrl}/${user_id}`;
    // return this.http.get(this.usersUrl)
    //   .toPromise()
    //   .then(response => response.json() as User)
    //   .catch(this.handleError)
    this.headers = new Headers();
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(userUrl, { headers: this.headers }).map((response: Response) => response.json()).catch(this.handleError);
  }
  getCurrtenUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
    // return this.http.get(url, { headers: this.headers }).map((response: Response) => response.json()).catch(this.handleError);
  }
  getFriends() {
    const url = this.friendsUrl;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.friendsUrl, { headers: this.headers }).map((response: Response) => response.json());
  }
  getFriendsOf(id: string) {
    const url = this.friendsUrl;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.friendFriendsUrl + id, { headers: this.headers }).map((response: Response) => response.json());
  }
  getProfileFriends() {
    const url = this.friendsUrl;
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.friendsUrl, { headers: this.headers }).map((response: Response) => response.json());
  }
  getAll() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.usersUrl, { headers: this.headers }).map((response: Response) => response.json());
  }
  getRequests() {
    this.headers = new Headers();
    //        this.headers.append('Content-Type', 'application/json');
    //        console.log("this is another test");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.requestsUrl, { headers: this.headers }).map((response: Response) => response.json());
  }
  addFriend(id: string) {
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.inviteUrl + id, { headers: this.headers }).map((response: Response) => response.json());
  }
  aceptFriend(id: string) {
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.aceptRequestUrl + id, { headers: this.headers }).map((response: Response) => response.json());
  }
  declineRequestFriend(id: string) {
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.declineRequestUrl + id, { headers: this.headers }).map((response: Response) => response.json());
  }
  removeFriend(id: string) {
    this.headers = new Headers();
    this.headers.append('currentUser', this.currentUser.id);
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.removeFriendUrl + id, { headers: this.headers }).map((response: Response) => response.json());
  }
  viewProfile(user_id: string) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.usersUrl + user_id, { headers: this.headers }).map((response: Response) => response.json());
  }
  getInvited(event_id: number){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Token token='.concat(this.currentUser.token));
    return this.http.get(this.localhostaddress + 'events/'.concat(event_id.toString()).concat('/inviteds'), { headers: this.headers }).map((response: Response) => response.json());
  }    
  createUser(firstName: string, lastName: string, email: string, nickname: string, birthdate: string): Promise<User> {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    console.log(this.usersUrl);
    return this.http
      .post(this.usersUrl, JSON.stringify({ name: firstName, lastname: lastName, nickname: nickname, birthdate: birthdate, email: email }), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }
  createAuthentication(user_id: string, password: string): Promise<Authentication> {
    return this.http.post(this.authenticationsUrl, JSON.stringify({ user_id: user_id, password_digest: password }), { headers: this.headers }).toPromise().then(res => res.json() as Authentication).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
