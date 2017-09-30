import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { UserService } from '../_services/user.service';

import { Authentication } from '../_models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authentication: Authentication;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
    
    authenticate(user_email: string, user_password: string): void {
        user_email.trim();
        user_password.trim();
        if (!user_email || !user_password ) { return; }
        this.userService.authenticate(user_email, user_password).then(authentication => {
        this.authentication=authentication;
      });
    }

}