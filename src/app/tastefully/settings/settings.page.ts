import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TastefullyService } from '../tastefully.service';
import { TastefullyLanguage } from '../tastefully.type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currentLang: string;
  languages: TastefullyLanguage[];

  constructor(private translate: TranslateService, private tastefully: TastefullyService) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    let languageAttr = this.tastefully.ATTRIBUTES.find((a) => a.code == "languages");
    this.languages = languageAttr ? languageAttr.options : [{ code: "en", label: { en: "English" } }];
  }

  async onLanguageChange() {
    await this.translate.use(this.currentLang).toPromise();
    // await this.translate.use("zh").toPromise();
  }

}
