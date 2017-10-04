import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { DetailComponent } from './detail/detail.component';
import { AddEventComponent } from './addEvent/addEvent.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { UserService } from './_services/user.service';
import { EventService } from './_services/event.service';

import { AppRoutingModule }     from './app-routing.module';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './_guards/auth.guard';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    EventsComponent,
    DetailComponent,
    AddEventComponent,
    EditEventComponent,
    MyCalendarComponent,
    ProfileComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, EventService, AuthGuard],
  bootstrap: [AppComponent]
})  
export class AppModule { }
