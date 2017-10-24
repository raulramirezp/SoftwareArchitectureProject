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
    logedBool: boolean;
  constructor(private userService: UserService, private router: Router) {
       NavbarComponent.updateUserStatus.subscribe(res => {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   })
    //  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.isLogged();
  }
  // ngAfterViewInit(){
  //   this.isLogged();
  // }
    private isLogged(){
        if(this.currentUser==null){
          // this.logedBool = false;
            return false;
        }
        else{
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // this.logedBool = true;
            return true;
        }
        // console.log(this.logedBool)
    }
    logout(){
        this.userService.logout();
        window.location.reload();
    }

    clearStorage(){
      if (this.router.url == '/addevent'){
        localStorage.removeItem('guestUsers')
        localStorage.removeItem('assistants')
      }
      if (this.router.url == '/editevent'){
        localStorage.removeItem('guestUsers')
        localStorage.removeItem('assistants')
        localStorage.removeItem('eventToEdit')
        localStorage.removeItem('previusGuest')
      }
    }

}
