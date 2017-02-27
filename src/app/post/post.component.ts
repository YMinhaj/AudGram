import { storage } from 'firebase';
import { Data, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize/dist';
import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import "rxjs/add/operator/map";
@Pipe({name: 'replaceLineBreaks'})
export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\n/g, '<br/>');
    return `${newValue}`;
  }
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  user;
  @Input() post;
 fname;
 lname;
  @Input() uid;
  dp;
  editMode = false;
  audio ;
  playing = false;
  isLiked;
  likeLength;
  comment = false;
  isFav = false;
  comments;
  loader= false;
  sc;
  moreCommentBtn = true;
  @Input() singlePost;
  removeKey = '';
  constructor(private af:AngularFire, private us: UserService, private ar: ActivatedRoute) {
    this.user = this.us.getUser();
  
  }
  onPlay(){
    this.audio.play();
    this.playing = true;
        this.audio.onended = ()=>{
    this.playing = false;
      
    }
  }
  onPause(){
    this.audio.pause();
    this.playing = false;    
  }
  onStop(){
    this.audio.pause();    
    this.audio.currentTime = 0;
    this.playing = false;    
    

  }
  onLike(){
    let date = new Date();
    let time = date.getTime();
    this.af.database.object(`/likes/${this.uid}/${this.post.$key}/${this.us.getUid()+'_'+time}`).set({name: this.us.getUser().fname + " " + this.us.getUser().lname, uid: this.us.getUser().uid, id : `${this.us.getUid()+'_'+time}`})
    .then(()=>{
      if(this.uid != this.us.getUid()){
        this.af.database.object(`/notifications/${this.uid}/${this.us.getUid()+'_'+time}`).set({type: 'Like', by : this.us.getUid(), post: this.post.$key, state: 'unread'})  ;        
      }
    })
  }
  onUnLike(){
    // this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).remove(this.isLiked.$key)
    // .then(()=>{
    //     if(this.uid != this.us.getUid()){
    //     this.af.database.list(`/notifications/${this.uid}`,{
    //       query:{
    //         orderByChild: 'by',
    //         equalTo: this.us.getUid(),
    //         limitToFirst: 1
    //       }
    //     }).subscribe((v)=>{
    //        this.af.database.list(`/notifications/${this.uid}`).remove(v[0].$key);
    //     })
    //   }
    // })

      if(this.uid != this.us.getUid()){
    this.af.database.list(`/notifications/${this.uid}`).remove(this.isLiked.id).then(()=>{
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}`).remove(this.isLiked.id);
      
    })   
      }    
      else{
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}`).remove(this.isLiked.id);
        
      }
  }
  onCommentButton(){
      this.comment = true;
    if(!this.singlePost){
          this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`, {
      query:{
        limitToLast : 3
      }
    })
    .subscribe((v)=>{
      this.comments = v;

      this.comments.reverse();
    });
  }
  // else{

  //       this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`)
  //   .subscribe((v)=>{
  //     this.comments = v;
  //     console.log(v);
  //     this.comments.reverse();
  //   });
  // }

    
  }
  onComment(comment){
    let date = new Date;
    let time = date.getTime();
    if(comment.value){      
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).push({uid: this.us.getUid(), dp: this.us.getUser().dp, name: this.us.getUser().fname+" "+this.us.getUser().lname, comment: comment.value, time: date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(), id: this.us.getUid()+'_'+time})
    .then((d)=>{
      comment.value = "";
      if(this.uid != this.us.getUid()){
        // this.af.database.list(`/notifications/${this.uid}`).push({type: 'Comment', by : this.us.getUid(), post: this.post.$key, state: 'unread', commentId: this.us.getUid()+'_'+time})  ;        
        this.af.database.object(`/notifications/${this.uid}/${this.us.getUid()+'_'+time}`).set({type: 'Comment', by : this.us.getUid(), post: this.post.$key, state: 'unread', commentId: this.us.getUid()+'_'+time})
    }
    })
    }
  }
  onCommentDelete(comment){
    //   if(this.uid == this.us.getUid()){
    //   this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove(comment.$key);        
        
    // }    
    // else{
    // this.af.database.list(`/notifications/${this.uid}`, {
    //   query:{
    //     orderByChild : 'commentId',
    //     equalTo: comment.id,
    //     limitToFirst: 1
    //   }
    // }).subscribe((v)=>{
    //   // this.removeKey = v[0].$key;
    //   this.af.database.list(`/notifications/${this.uid}`).remove(v[0].$key).then(()=>{
    //   this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove(comment.$key);        
    //   });
    // })
    // }
      if(this.uid == this.us.getUid()){
      this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove(comment.$key);        
        
      }
      else{
        this.af.database.list(`/notifications/${this.uid}`).remove(comment.id).then(()=>{
      this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove(comment.$key);                          
        });
      }
    
  }
  // onEditMode(){
  //   this.editMode = true;
  // }
  //   onEditModeDisable(){
  //   this.editMode = false;
  // }
  onRemovePost(key){
    this.af.database.list(`/posts/${this.uid}`).remove(key);
    this.af.database.list(`/search/`).remove(key);
    this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`).remove()
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).remove()
    this.af.database.list('/notifications/'+this.uid+ '/', {
      query:{
        orderByChild: 'post',
        equalTo : key
      }
    }).subscribe(v=>{
      v.map((val)=>{
        console.log(val);
        this.af.database.list('notifications/'+this.uid).remove(val.$key);
      })
    })
    let filename = decodeURIComponent(this.post.audio).split('/')[9].split('?')[0];
    // storage().ref(``).child(`${this.uid}/posts`).delete(filename)
    let ref = storage().ref();
    ref.child(this.uid + '/posts/'+ filename).delete()
    console.log(decodeURIComponent(this.post.audio).split('/')[9].split('?')[0])
  }
  // onUpdate(key,ta){
  //   console.log(ta);
  //   // this.af.database.list(`/posts/${this.uid}`).update(key,{text: ta.value})
  // }


  ngOnInit() {
    if(this.uid){
      this.af.database.list('/users/',{
        query: {
          orderByChild : 'uid',
          equalTo : this.uid
        }
      }).subscribe((v)=>{
        this.fname = v[0].fname;
        this.lname = v[0].lname;
        this.dp = v[0].dp
        console.log(v[0], this.dp)
      })
    }
        this.ar.queryParams.subscribe(p=>{
        if(p['postId']){
          this.moreCommentBtn = false
        }
        })
    this.audio = new Audio(this.post.audio);
     this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`,{
       query:{
         orderByChild: 'uid',
         equalTo: this.us.getUid(),
         limitToFirst: 1
       }
     }).subscribe((v)=>{
       this.isLiked = v[0];
     });
    this.af.database.list(`/likes/${this.uid}/${this.post.$key}/`).subscribe((v)=>{
      this.likeLength = v.length;
    });
    if(this.singlePost){
      this.comment = true;
              this.af.database.list(`/comments/${this.uid}/${this.post.$key}/`)
    .subscribe((v)=>{
      this.comments = v;
      this.comments.reverse();
    })
  }
  }
}
