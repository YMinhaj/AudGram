import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {DpUploadComponent} from './dp-upload/dp-upload.component';
import {ProfileComponent} from './profile/profile.component';
/**
 * Created by devilu on 1/31/17.
 */
export const routes: Routes = [
  {path: '', component: WelcomeComponent, children: [
    {path: '', component : LoginComponent},
    {path: 'login', component : LoginComponent},
    {path: 'signup', component : SignupComponent},
    {path: 'register', component: SignupComponent}
  ]},
  {path: 'profile/:uid', redirectTo: 'index/profile/:uid', pathMatch: 'full'},
  {path: 'index', component: HomeComponent, children:
    [
      {path: 'search', component: SearchComponent},      
      {path: 'UploadProfilePicture', component: DpUploadComponent},
      {path: 'profile/:uid', component: ProfileComponent},
      // {path: 'profile', redirectTo:'profile/:uid', pathMatch:'full'},

    ]
  }
  ];
