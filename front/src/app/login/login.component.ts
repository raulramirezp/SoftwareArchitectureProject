import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Authentication } from '../_models/authentication';
import { User } from '../_models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.logout();
  }

  authenticate(user_email: string, user_password: string): string {
    user_email.trim();
    user_password.trim();
    if (!user_email || !user_password) { return "Algun o algunos campos estan vacios"; }
    this.userService.authenticate(user_email, user_password).subscribe(
      data => {
        NavbarComponent.updateUserStatus.next(true);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        alert(error._body);
      });

  }

}
