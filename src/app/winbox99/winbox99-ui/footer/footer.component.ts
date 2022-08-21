import { Component, OnInit } from '@angular/core';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsNavigation } from 'src/app/cms.type';

@Component({
  selector: 'winbox99-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends CmsComponent implements OnInit {

  list: CmsList;
  navigation: CmsNavigation;

  constructor(private cms: CmsService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.list = await this.cms.getList('footers');
    this.navigation = await this.cms.getNavigation('top-nav');
  }

}
