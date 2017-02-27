import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes.config";
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig, authConfig} from "./firebase.config";
import {MaterializeDirective,MaterializeModule} from "angular2-materialize";
import { HomeComponent } from './home/home.component';
import {UserService} from "./user.service";
import { DpUploadComponent } from './dp-upload/dp-upload.component';
import { ProfileComponent } from './profile/profile.component';
import {ComponentService} from "./component.service";
import { UserInfoComponent } from './user-info/user-info.component';
import {PostComponent, ReplaceLineBreaks} from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { LoginComponent } from './login/login.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { SearchComponent } from './search/search.component';
import { UserItemComponent } from './user-item/user-item.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
    DpUploadComponent,
    ProfileComponent,
    UserInfoComponent,
    PostComponent,
    CreatePostComponent,
    ReplaceLineBreaks,
    FriendsComponent,
    ProfileNavbarComponent,
    LoginComponent,
    NotificationItemComponent,
    SearchComponent,
    UserItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    MaterializeModule
  ],
  providers: [UserService, ComponentService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
