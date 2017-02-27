import { Route, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFire } from 'angularfire2';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
  @Input() notification;
  user;
  constructor(private af: AngularFire, private us: UserService, private router: Router) { }

  ngOnInit() {
    this.af.database.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: this.notification.by,
        limitToFirst: 1
      }
  }).subscribe(v=>{
    this.user = v[0];
  })

}
onRead(){
  this.af.database.object(`/notifications/${this.us.getUid()}/${this.notification.$key}`).update({state: 'read'});
}
onNavigateNotification(){
    this.af.database.object(`/notifications/${this.us.getUid()}/${this.notification.$key}`).update({state: 'read'}).then(()=>{
      this.router.navigate(['/index/profile/'+this.us.getUid()+'/'], {queryParams: {postId: this.notification.post}})
  })
}
}