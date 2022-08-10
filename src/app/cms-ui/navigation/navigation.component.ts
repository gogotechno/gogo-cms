import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsNavigation } from 'src/app/cms.type';

@Component({
  selector: 'cms-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  navigation: CmsNavigation;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.navigation = await this.cms.getNavigation('top-nav');
  }

}
