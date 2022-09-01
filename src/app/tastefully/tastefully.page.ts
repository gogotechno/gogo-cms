import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CmsService } from '../cms.service';
import { AppUtils } from '../cms.util';

@Component({
  selector: 'app-tastefully',
  templateUrl: './tastefully.page.html',
  styleUrls: ['./tastefully.page.scss'],
})
export class TastefullyPage implements OnInit {

  constructor(private title: Title, private cms: CmsService, private app: AppUtils) { }

  ngOnInit() {
    this.title.setTitle('Tastefully');
    this.app.loadTemplateTheme(this.cms.SITE.template);
  }

}
