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
    this.translate.setDefaultLang('en');
  }

  async redirectToTemplate() {
    this.cms.SITE = await this.cms.getSite();
    this.translate.addLangs(this.cms.SITE.supportedLanguages);
    this.translate.setDefaultLang(this.cms.SITE.defaultLanguage);
    let browserLangauge = this.translate.getBrowserLang();
    let used = await this.translate.use(browserLangauge).toPromise();
    if (!used) {
      await this.translate.use(this.cms.SITE.defaultLanguage).toPromise();
    }
    let found = this.router.url.split('/').find(s => s == 'cms-admin' || s == 'teckguan');
    if (!found) {
      this.router.navigate([`/${this.cms.SITE.template}`], { skipLocationChange: true })
    }
  }
}
