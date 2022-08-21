import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsPage } from 'src/app/cms.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page: CmsPage;
  sellingPointList: CmsList;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    this.page = await this.cms.getPage('home');
    this.sellingPointList = await this.cms.getList('selling-points');
  }

}
