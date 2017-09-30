import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

import { User } from '../_models/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {  }
  getById(user_id){
        //let body = {user_id: user_id, product_id: product_id}
        //let headers = new Headers({ 'Content-Type': 'application/json'});
        //let options = new RequestOptions({ headers:headers });

        return this.http.get('http://192.168.99.101:3000/users'+user_id, this.jwt()).map((response:Response) => { console.log(response.json());
        response.json();
        }); 
    }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}