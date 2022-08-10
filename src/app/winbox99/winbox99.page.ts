import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsNavigation } from '../cms.type';

@Component({
  selector: 'app-winbox99',
  templateUrl: './winbox99.page.html',
  styleUrls: ['./winbox99.page.scss'],
})
export class Winbox99Page implements OnInit {

  navigation: CmsNavigation;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.navigation = await this.cms.getNavigation('top-nav');
  }

}
