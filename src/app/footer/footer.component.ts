import { Component, OnInit } from '@angular/core';
import {ComponentService} from "../component.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer;
  constructor(private cs: ComponentService) {
    this.footer = this.cs.getFooter();
  }

  ngOnInit() {

  }

}
