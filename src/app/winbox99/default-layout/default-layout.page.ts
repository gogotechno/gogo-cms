import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { CmsPage } from 'src/app/cms.type';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.page.html',
  styleUrls: ['./default-layout.page.scss'],
})
export class DefaultLayoutPage implements OnInit {

  pageId: string;
  page: CmsPage;

  constructor(private cms: CmsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageId = this.route.snapshot.params.page;
    this.loadData();
  }

  async loadData() {
    this.page = await this.cms.getPage(this.pageId);
  }

}
