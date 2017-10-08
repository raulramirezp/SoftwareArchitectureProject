import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    users: User[];
    today: string;
    tzoffset: number = (new Date()).getTimezoneOffset() * 60000;
    now: number;
  constructor(private userService: UserService,
    private router: Router) {
      this.now = Date.now()
      this.today = new Date(Date.now() - this.tzoffset).toISOString().slice(0, 10);
      console.log(this.today)
    }

  ngOnInit() {
  }

    add(firstName: string, lastName: string, email: string, nickname: string, password: string, alldate: string): void {
      firstName = firstName.trim();
      lastName = lastName.trim();
      email = email.trim();
      nickname= nickname.trim();
      // password = password.trim();
      // let birthdate = year.concat('-').concat(month).concat('-').concat(day);
      if (!firstName || !lastName || !email || !nickname || !password) { return console.log("Revise uno o mas campos"); }
      this.userService.getUser
      this.userService.createUser(firstName, lastName, email, nickname, alldate).then(user => {
        //this.users.push(user);
        this.userService.createAuthentication(user.id,password);
        console.log(12345)
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        alert(error._body);
      });

    }

}
