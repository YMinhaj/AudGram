import { AngularFire } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
s = true;
people = [];
posts = [];
tab = 'people'
  constructor(private us: UserService, private ar: ActivatedRoute, private af: AngularFire) { }
  onPeople(){
    this.tab = 'people';
  }
  onPosts(){
    this.tab = 'posts'
  }
  ngOnInit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          this.ar.queryParams.subscribe(p=>{
            this.posts,this.people = []
        if(p['query']){
    console.log("search component", decodeURIComponent(p['query']))
    //posts

          this.af.database.list('/search/', {
            query:{
              orderByChild: 'text',
              startAt : decodeURIComponent(p['query']),
              // endAt : decodeURIComponent(p['query'])
            }
          }).subscribe((v)=>{
            console.log(v)
            this.posts = v;
          })
          // peoples
          if(decodeURIComponent(p['query']).match(mailformat)){
            this.af.database.list('/users/', {
            query:{
              orderByChild: 'email',
              equalTo : decodeURIComponent(p['query']),
            }
          }).subscribe((v)=>{
            // console.log(v);
            this.people = v;
          })
        }
        else if(!decodeURIComponent(p['query']).match(mailformat)){
                    this.af.database.list('/users/', {
            query:{
              orderByChild: 'fullName',
              startAt : decodeURIComponent(p['query']),
              // endAt : decodeURIComponent(p['query'])
            }
          }).subscribe((v)=>{
            this.people = v;
            
          })
        }        
        }
      })
  }

}
