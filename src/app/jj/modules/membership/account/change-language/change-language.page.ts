import { Component, OnInit } from '@angular/core';
import { CmsLanguage } from 'src/app/cms.type';
import { CommonService } from 'src/app/jj/services';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {
  backButtonText: string;
  currentLangCode: string;
  languages: CmsLanguage[];

  constructor(private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    this.currentLangCode = this.common.getCurrentLanguage();
    this.languages = await this.common.getSupportedLanguages();
  }

  async onLanguageChange(event: Event) {
    await this.common.setCurrentLanguage(this.currentLangCode);
    window.location.reload();
  }
}
