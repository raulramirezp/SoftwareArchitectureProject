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
    
    add(firstName: string, lastName: string, email: string, password: string): void {
      firstName = firstName.trim();
      lastName = lastName.trim();
      email = lastName.trim();
      password = lastName.trim();
      if (!firstName || !lastName || !email || !password) { return; }
      this.userService.create(firstName, lastName, email, password).then(user => {
        this.users.push(user);
      });
    }

}
