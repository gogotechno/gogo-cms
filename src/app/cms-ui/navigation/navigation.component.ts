import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { CmsNavigation } from 'src/app/cms.type';

@Component({
  selector: 'cms-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  navigation: CmsNavigation;

  constructor(private cms: CmsService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.navigation = await this.cms.getNavigation('top-nav');
  }

  isActive(path: string) {
    let activePath = this.router.url;
    return path === activePath;
  }

}
