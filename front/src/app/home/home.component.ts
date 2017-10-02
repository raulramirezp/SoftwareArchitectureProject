import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { Router }            from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    profileUser: User;
    users: User[] = [];
    friends: User[] = [];
    usersRequests: User[] = [];
    
    createdEvents: Event[]= [];
    
    constructor(private userService: UserService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        console.log("test");
        this.loadAllUsers();
        this.loadCreatedEvents();
        this.loadRequests();
        this.loadFriends();
    }
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    private loadCreatedEvents() {
       // this.eventService.getCreatedEvents().subscribe(createdEvents => { this.createdEvents = createdEvents; });
    }
    private loadFriends() {
        console.log('this is a test 3');
        this.userService.getFriends().subscribe(friends => { this.friends = friends; });
    }
    private loadRequests() {
        this.userService.getRequests().subscribe(usersRequests => { this.usersRequests = usersRequests; });
    }
    private addFriend(user_id:string)
    {
        this.userService.addFriend(user_id).subscribe(() => { this.loadAllUsers() });
        this.router.navigate(['/home']);
    }
    private aceptFriend(user_id:string)
    {
        console.log("test 1");
        this.userService.aceptFriend(user_id).subscribe(() => { this.loadAllUsers() });
        this.router.navigate(['/home']);
    }
    private viewProfile(user_id:string)
    {
        console.log("test 1");
        
        this.userService.viewProfile(user_id).subscribe(profileUser => { localStorage.setItem('profileUser',JSON.stringify(profileUser)); });
//        this.profileComponent.setUser(this.profileUser)
        let link = ['/profile', user_id];
        this.router.navigate(link);
    }

}
