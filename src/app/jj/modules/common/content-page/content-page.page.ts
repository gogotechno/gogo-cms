import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJContentPage } from 'src/app/jj/typings';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.page.html',
  styleUrls: ['./content-page.page.scss'],
})
export class ContentPagePage implements OnInit {
  backButtonText: string;
  contentPageId: number;
  contentPage: JJContentPage;

  constructor(private route: ActivatedRoute, private core: CoreService, private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.contentPageId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.contentPage = await this.core.getContentPageById(this.contentPageId);
  }
}
