import {Component, OnInit, trigger, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {storage} from  'firebase';
declare let Materialize:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  btn = true;
  user;

  constructor(fb: FormBuilder, private af: AngularFire, private router:Router, private us:UserService) {
    this.form = fb.group({
      'fname': [''],
      'lname': [''],
      'email': [''],
      'password': ['']
    })
  }

  ngOnInit() {
        if(this.us.getUid()){
      // alert('login');
      this.router.navigate(["/index/profile/"+this.us.getUid()]);

    }


  }

  onRegister(x){
    if(!x.fname){
           Materialize.toast("Error: Please Enter Your First Name", 1000, 'red');

           return;
    }
    if(!x.lname){
           Materialize.toast("Error: Please Enter Your Last Name", 1000, 'red');
           return;
    }
    this.btn = false;
    this.af.auth.createUser({email:x.email, password: x.password}).then(()=>{
      this.af.auth.login({email:x.email, password: x.password}).then((d)=>{
        this.us.updateNewUser(true);
        console.log(this.us.getNewUser());
       this.af.database.list('/users').push({email: x.email, fname: x.fname,lname: x.lname, uid: d.uid, dp: `../../images/dp.png`, fullName: x.fname + ' '+ x.lname}).then(()=>{
        this.us.login(d.uid,'/index/UploadProfilePicture');
       });
      })
    })
      .catch(err=>{
        this.btn = true;
        Materialize.toast(err, 1000, 'red');
      })

  }
}
