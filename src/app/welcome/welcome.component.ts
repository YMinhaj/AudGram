import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  show = true;
  constructor(private af: AngularFire, private us: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.us.getUid()){
      // console.log("welcome COmponent");
          this.af.auth.subscribe((d) => {
      if (d){
        this.show = false;
        this.us.updateUid(d.uid);
            this.af.database.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: d.uid,
        limitToFirst: 1
      }
    }).subscribe((v) => {
      this.us.updateUser(v[0]);
      this.us.updateKey(v[0].$key);
      console.log(v[0].$key)
      // if(this.us.get)
      if(this.us.getUser().dp !== '../../images/dp.png'){
      this.router.navigate(['/index/profile/'+this.us.getUid()]);        
    }
    // else{
    //   this.router.navigate(['/index/UploadProfilePicture']);         
          
      
    // }
    });
      }
    });
    }

  }
}
