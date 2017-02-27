import { Component, OnInit } from '@angular/core';
import {storage} from 'firebase';
import {UserService} from "../user.service";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
// import {Materialize} from "../signup/signup.component";
declare var Materialize: any;
@Component({
  selector: 'app-dp-upload',
  templateUrl: './dp-upload.component.html',
  styleUrls: ['./dp-upload.component.css']
})
export class DpUploadComponent implements OnInit {
  file;
  ext: string;
  ref;
  time:any= new Date();
  btn = false;
  loader = false;
  bool =true;
  constructor(private us: UserService, private af: AngularFire, private router: Router) {
    this.time = this.time.getTime();
  }

  ngOnInit() {
  }
  onChange(f:HTMLInputElement, e:HTMLImageElement){
  
    this.file = f.files[0];
    this.ext = this.file.name.split('.');
    this.ext = this.ext[this.ext.length-1];
    if(this.ext.toLowerCase() === 'png' || this.ext.toLowerCase() === 'jpg'){
    this.btn = true;
    this.file = f.files[0];
    this.ext = this.file.name.split('.');
    this.ext = this.ext[this.ext.length-1];
    this.ref = storage().ref(this.us.getUid() +'/images/'+this.us.getUid()+"_"+this.time+'.'+this.ext);
    // base64
       
            var fr = new FileReader();
            fr.onload = function(){
               e.src = fr.result;
            }
            if (this.file){
                fr.readAsDataURL(this.file)
            }
        
  }
  else{
    e.src = this.us.getUser().dp;
    this.btn = false;    
    f = null;
    this.file = undefined;
    this.ext = undefined;
    Materialize.toast('ERROR: Unsupported file. Only "PNG" and "JPG" format file supported', 4000, 'red');
  }

    // console.log(this.file);
    // console.log(this.ext);
    // console.log(this.ref);
  }
  onUpload(){
    this.btn = false;
    this.loader = true;
    let task = this.ref.put(this.file);
    task.on('state_changed',
      (snap)=>{
    },
      (err) =>{
        Materialize.toast(err,4000, 'red');
        this.btn = true;
        this.loader = false;
      },
      ()=>{
                this.us.updateNewUser(false);
        this.ref.getDownloadURL().then(url=>{
          console.log(url);
        });

        this.af.database.list('/users').update(this.us.getkey(), {dp: task.snapshot.downloadURL});
        this.router.navigate(['/index/profile/'+ this.us.getUid()]);

      }
    )
  }
}
