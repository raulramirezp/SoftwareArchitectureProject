import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { EventService } from '../_services/event.service';
// import { ProfileComponent } from '../profile/profile.component';
import { Router }            from '@angular/router';
import { Category } from '../_models/category';

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
    myEvents: Event[] = [];
    invitedEvents: Event[] = [];
    createdEvents: Event[]= [];
    categories: Category[] = [];

    constructor(private userService: UserService, private router: Router, private eventService: EventService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        console.log("test");
        this.loadAllUsers();
        this.loadMyCreatedEvents();
        this.loadRequests();
        this.loadFriends();
        this.loadEventsInvitations();
        this.loadCategories();

    }
    private loadAllUsers() {
      var us = [];
        this.userService.getAll().subscribe(users => {
          // Evita que el usuario mostrado sea el mismo
          for (var i = 0; i < users.length; i++){
            if (users[i].id == this.currentUser.id){
              users.splice(i,1);
              break;
            }
          }
          //
          this.users = users; });
    }
    private loadMyCreatedEvents() {
       this.eventService.getMyCreatedEvents().subscribe(myEvents => { this.myEvents = myEvents; });
    }
    private loadFriends() {
        this.userService.getFriends().subscribe(friends => { this.friends = friends; });
    }
    getFriendsCount(): number{
      console.log(this.friends)
      if (this.friends == null){
        return 0;
      }
      return this.friends.length;
    }
    private loadRequests() {
        this.userService.getRequests().subscribe(usersRequests => { this.usersRequests = usersRequests; });
    }
    private loadEventsInvitations() {
        this.eventService.getInvitations().subscribe(invitedEvents => { this.invitedEvents = invitedEvents; });
    }
    private addFriend(user_id:string)
    {
        this.userService.addFriend(user_id).subscribe(() => { this.loadAllUsers() });
        this.router.navigate(['/home']);
    }
    private aceptFriend(user_id:string)
    {
        this.userService.aceptFriend(user_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    declineFriendRequest(user_id: string){
        this.userService.declineRequestFriend(user_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    removeFriend(user_id: string){
        this.userService.removeFriend(user_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    private aceptEvent(event_id:string)
    {
        this.eventService.aceptEvent(event_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    private declineEvent(event_id:string)
    {
        this.eventService.declineEvent(event_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    private removeEvent(event_id:string)
    {
        this.eventService.removeEvent(event_id).subscribe(() => { this.router.navigate(['/home']); });
    }
    loadCategories() {
      this.eventService.getCategories().subscribe(categories => { this.categories = categories; });
    }
    private viewProfile(user_id:string)
    {
        console.log("test 1");
        console.log(user_id)
       this.userService.viewProfile(user_id).subscribe(profileUser => {
           console.log(profileUser.name)
           localStorage.setItem('profileUser',JSON.stringify(profileUser));
            this.profileUser=JSON.parse(localStorage.getItem('profileUser'));
            console.log('pretest');
            console.log(this.profileUser.email);
            let link = ['/profile', user_id];
       this.router.navigate(link);
       });

        //       this.profileComponent.setUser(this.profileUser)

    }
    private logout(){
        this.userService.logout();
        this.router.navigate(['/login']);
    }

}
