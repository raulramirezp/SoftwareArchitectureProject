import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location }                 from '@angular/common';
 
import { User }        from '../_models/user';
import { UserService } from '../_services/user.service';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
 
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  ngOnInit(): void {
   // this.userService.getUser('id')
     // .subscribe(user => this.user = user);
  this.user = JSON.parse(localStorage.getItem('profileUser'));
  }
 
  goBack(): void {
    this.location.back();
  }
}