import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsLanguage, CmsSiteAttributeOption } from 'src/app/cms.type';

const DEFAULT_LANG: CmsSiteAttributeOption = {
  code: 'en',
  label: { en: 'English', zh: 'English' },
  value: null,
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private cms: CmsService, private translate: TranslateService) {}

  async getSupportedLanguages(): Promise<CmsLanguage[]> {
    let attributes = await this.cms.getAttributes();
    let attribute = attributes.find((a) => a.code == 'languages');
    let options = attribute?.options.length ? attribute.options : [DEFAULT_LANG];
    return options.map((option) => ({
      ...option,
      selected: option.code == this.translate.currentLang,
    }));
  }
}
