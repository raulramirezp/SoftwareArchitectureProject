import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router }            from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User;
  constructor(private userService: UserService, private router: Router) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit() {
  }

}
