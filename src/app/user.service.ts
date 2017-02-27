import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
user:any = {dp :''} ;
uid;
key;
newUser = false;
  constructor(private af: AngularFire, private router: Router) {
    // this.user = ;
    this.af.auth.subscribe((d) => {
      if (d){
        this.uid = d.uid;
            this.af.database.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: d.uid,
        limitToFirst: 1
      }
    }).subscribe((v) => {
      this.user = v[0];
      this.key = v[0].$key;
      // console.log(this.user)
    });
      }
    });

}
getNewUser(){
  return this.newUser;
}
  updateNewUser(v){
    this.newUser = v;
  }
  getUid(){
    return this.uid;
  }
  updateUid(v){
    this.uid = v;
  }
  getUser(){
    return this.user;
  }
  updateKey(x){
    this.key = x;
  }
  login(u, url){
    // if(!this.newUser && !this.uid){
            // console.log("User Service");

          this.af.database.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: u,
        limitToFirst: 1
      }
    }).subscribe((v) => {
      this.user = v[0];
      this.uid = v[0].uid;
      this.key = v[0].$key;
      this.router.navigate([url]);

    });
    }

// }
  getkey(){
    return this.key;
  }
  updateUser(v){
    this.user = v;
  }
}
