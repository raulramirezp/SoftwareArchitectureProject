import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Router }            from '@angular/router';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public static updateUserStatus: Subject<boolean> = new Subject();
    currentUser: User;
  constructor(private userService: UserService, private router: Router) {
       NavbarComponent.updateUserStatus.subscribe(res => {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   })
    //  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit() {
  }
    private isLogged(){
        if(this.currentUser==null){
            return false;
        }
        else{
            return true;
        }
    }
    logout(){
        this.userService.logout();
    }

    clearStorage(){
      if (this.router.url == '/addevent'){
        localStorage.removeItem('guestUsers')
      }
    }

}
