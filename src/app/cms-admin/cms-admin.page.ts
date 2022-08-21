import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsAdminChildPage, CmsSite } from '../cms.type';
import { CmsAdminService } from './cms-admin.service';

@Component({
  selector: 'app-cms-admin',
  templateUrl: './cms-admin.page.html',
  styleUrls: ['./cms-admin.page.scss'],
})
export class CmsAdminPage implements OnInit {

  title = "Gogo CMS";
  ownedSites: Array<string> = [];
  selectedSite: string;

  constructor(private admin: CmsAdminService, private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.admin.user) {
      let user = await this.admin.getCmsUser();
      this.ownedSites = user.ownedSites;
      return;
    }
    this.ownedSites = this.admin.user.ownedSites;
    // this.selectedSite = this.cms.SITE.code;
  }

  componentActivated(component) {
    console.log(component)
    if (component.title) {
      console.log('Is CMS admin child, change title')
      this.title = component.title;
    }
  }

  async signOut(event?: Event) {
    await this.admin.signOut();
  }

}
