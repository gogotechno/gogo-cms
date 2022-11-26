import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CmsService } from './cms.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  pathName: string;

  constructor(
    private router: Router,
    private cms: CmsService,
    private translate: TranslateService,
    private storage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.pathName = window.location.pathname;

    this.initStorage();
    this.redirectToTemplate();
    this.translate.setDefaultLang('en');
  }

  async initStorage() {
    await this.storage.init();
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

    let found = this.router.url.split('/').find((s) => s == 'cms-admin');
    if (!found) {
      let commands = [`/${this.cms.SITE.template}`];
      if (this.pathName != '/') {
        let paths = this.pathName.split('/').filter((path) => path && path != this.cms.SITE.template);
        if (paths.length > 0) {
          commands.push(...paths);
        }
      }
      this.router.navigate(commands);
    }
  }
}
