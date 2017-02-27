import {Component, OnInit, Input} from '@angular/core';
import { Data } from '@angular/router';
import {ComponentService} from '../component.service';
import {UserService} from '../user.service';
import {AngularFire} from 'angularfire2';
import {storage} from 'firebase';
export declare var Materialize: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  percentage;
  @Input() uid;
  btn = false;
  @Input() dp;
  file;ext;ref;loader;
  @Input() key;
  constructor( private af: AngularFire, private cs: ComponentService, private us: UserService) {
    // console.log(this.uid, this.key, this.dp)
  }
  onFileChange(f){
    this.file = f.files[0];
    this.ext = this.file.name.split('.');
    this.ext = this.ext[this.ext.length - 1];
    if (this.ext.toLowerCase() === 'mp3'){
    this.btn = true;

    let date = new Date();
    let time = date.getTime();
    this.ref = storage().ref(this.uid +'/posts/'+this.uid + '_' + time + '.' + this.ext);

  }
  else{
    this.btn = false;
    this.file = undefined;
    this.ext = undefined;
    Materialize.toast('ERROR: Unsupported file. Only "MP3" format file supported', 4000, 'red');
  }

  }
  onPost(ta, f, fp){
    this.btn = false;
    this.loader = true;
    let date = new Date();

    if (this.file){
      let task = this.ref.put(this.file);
      task.on('state_changed',
        (snap) => { // snap
          this.percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (err) => {
          this.btn = true;
          Materialize.toast(err, 4000, 'red');
        },
        () => {
          this.ref.getDownloadURL().then((url) => {
            let text = ta.value;
            // console.log(url);
            let date = new Date;
            let time = date.getTime();
            this.af.database.object('/posts/' + this.uid+ '/'+ time)
            .set({
                text: text,
                audio: url,
                time: date.getHours() + ':' + date.getMinutes() + ' ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear(),
                key: time
              })
            .then(() => {
              this.loader = false;
              ta.value = '';
              ta.style.padding = '0';
              this.file = '';
              fp.value = '';
              //query node
              // this.af.database.list('/search').push({key: a.$key, text: ta.value, user: this.uid});
              this.af.database.object('/search/'+time).set({
                text: text,
                audio: url,
                time: date.getHours() + ':' + date.getMinutes() + ' ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear(),
                key: time,
                user: this.uid})
            });
          });
        }
      );
    }
    else {
      this.af.database.list('/posts/' + this.uid).push({text: ta.value}).then(() => {
        this.loader = false;
        ta.value = '';
        ta.style.height = '20.6px';
        this.file = '';
      });
    }
  }
  ngOnInit() {

  }

}
