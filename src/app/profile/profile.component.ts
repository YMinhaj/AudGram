import { FirebaseObjectObservable } from 'angularfire2/database';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {ComponentService} from "../component.service";
import {storage} from 'firebase'
import {UserService} from "../user.service";
import "rxjs/add/operator/map";
declare var Materialize;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  uid;
  btn = false;
  user: any = {dp: '', dob: '', fname:'', lname:'', gender: '', email: '', $key: '', uid:''};
  // user;
  file;ext;ref;loader;key;
  posts:any[];
  sPost: any;
  cp;
  sp;
  bool = false;
  constructor(private ar: ActivatedRoute, private af: AngularFire, private cs: ComponentService, private us:UserService) {
    this.cs.updateFooter(false);

  }
  ngOnInit() {   
      this.ar.params.subscribe((p)=>{
      this.uid = p['uid'];
      this.af.database.list('/users',{
        query: {
          orderByChild: 'uid',
          equalTo: p['uid'],
          limitToFirst: 1
        }
      }).subscribe((v)=>{
        this.user = v[0];
        this.key = this.user.$key;
        // console.log(this.user.$exists())
      });
      // this.af.database.list(`/posts/${this.uid}`)
      //   .map((a)=> a.reverse())
      //   .subscribe(a=> {this.posts = a;});
      this.ar.queryParams.subscribe(p=>{
        if(p['postId']){
          this.cp = false;
          console.log(p['postId']);
        this.af.database.object(`/posts/${this.uid}/${p['postId']}`)
        .subscribe((v)=>{
          this.sPost = v;
          console.log(v);
          this.sp = true;
        })    
        }
        else{
          this.cp = true;          
        this.af.database.list(`/posts/${this.uid}`)
        .map((a)=> a.reverse())
        .subscribe(a=> {this.posts = a;});
          this.sp = false;        
        }
      })
    });

  }
  ngOnDestroy(){
  }
}
