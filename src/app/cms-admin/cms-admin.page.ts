import { Component, OnInit } from '@angular/core';
import { CmsAdminChildPage } from '../cms.type';

@Component({
  selector: 'app-cms-admin',
  templateUrl: './cms-admin.page.html',
  styleUrls: ['./cms-admin.page.scss'],
})
export class CmsAdminPage implements OnInit {

  title = "Gogo CMS";

  constructor() { }

  ngOnInit() {
  }

  componentActivated(component) {
    console.log(component)
    if (component.title) {
      console.log('Is CMS admin child, change title')
      this.title = component.title;
    }
  }

}
