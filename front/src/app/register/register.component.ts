import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    users: User[];
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
    
    add(firstName: string, lastName: string, email: string, nickname: string, day: string, month: string, year: string, password: string): void {
      firstName = firstName.trim();
      lastName = lastName.trim();
      email = email.trim(); 
      nickname= nickname.trim();
      password = password.trim();
      let birthdate = year.concat('-').concat(month).concat('-').concat(day);
      if (!firstName || !lastName || !email || !nickname || !password) { return; }
      this.userService.createUser(firstName, lastName, email, nickname, birthdate).then(user => {
        //this.users.push(user);
        this.userService.createAuthentication(user.id,   password);
      });
      
    }

}
