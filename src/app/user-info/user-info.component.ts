import { UserService } from '../user.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() dp;
  @Input() email;
  @Input() fname;
  @Input() lname;
  @Input() uid;
  constructor(private us: UserService) { }

  ngOnInit() {
    console.log(this.uid);
    console.log(this.us.user);
    
    // setTimeout(
    //   function(){
        
    //   },
    //   10000
    // )

  }

}
