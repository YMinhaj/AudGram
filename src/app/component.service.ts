import { Injectable } from '@angular/core';

@Injectable()
export class ComponentService {
  footer;
  constructor() {
    this.footer = true;
  }
  updateFooter(b){
    this.footer = b;
  }
  getFooter(){
    return this.footer;
  }

}
