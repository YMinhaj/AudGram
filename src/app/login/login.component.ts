import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var Materialize: any; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  btn = true;
  constructor( private fb: FormBuilder, private af: AngularFire, private us: UserService, private router: Router) {
        this.form = fb.group({
      'email': [''],
      'password': ['']
    })
   }
   onLogin(x){
     this.btn = false;
     this.af.auth.login(x).then((d) => {
       this.us.login(d.uid, '/index/profile/' + d.uid);
     }).catch((err) => {
       this.btn = true;
       Materialize.toast(err, 2000, 'red');
     });
   }
  ngOnInit() {
    if(this.us.getUid()){
      // alert('login');
      this.router.navigate(["/index/profile/"+this.us.getUid()]);

    }
  }

}
