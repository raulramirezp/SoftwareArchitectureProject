import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  user2: User;
  friends: User[] = [];
  friendFriends: User[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.userService.getUser('id')
    // .subscribe(user => this.user = user);
    this.user = JSON.parse(localStorage.getItem('profileUser'));
    this.loadFriends();
  }

  goBack(): void {
    localStorage.removeItem('profileUser');
    this.location.back();
  }
  private loadFriends() {
    console.log('this is a test 3');
    this.userService.getFriends().subscribe(friends => { this.friends = friends; });
  }
  private loadFriendFriends() {
    this.userService.getFriends().subscribe(friendFriends => { this.friendFriends = friendFriends; console.log(this.friendFriends)});
  }
}
