import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CmsService } from './cms.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cms: CmsService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.redirectToTemplate();
    this.translate.setDefaultLang('en')
  }

  async redirectToTemplate() {
    this.cms.SITE = await this.cms.getSite();
    this.router.navigate([`/${this.cms.SITE.template}`], { skipLocationChange: true })
  }
}
