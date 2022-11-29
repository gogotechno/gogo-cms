import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { JJContentPage } from 'src/app/jj/typings';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.page.html',
  styleUrls: ['./content-page.page.scss'],
})
export class ContentPagePage implements OnInit {
  contentPageId: number;
  contentPage: JJContentPage;

  constructor(private route: ActivatedRoute, private core: CoreService) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.contentPageId = params['id'];
    await this.loadData();
  }

  async loadData() {
    this.contentPage = await this.core.getContentPageById(this.contentPageId);
  }
}
