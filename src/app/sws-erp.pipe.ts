import { Injector, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CmsService } from './cms.service';
import { SWS_ERP_COMPANY } from './sws-erp.type';

@Pipe({ name: 'erpImg' })
export class ErpImagePipe implements PipeTransform {
  companyCode: string;

  constructor(injector: Injector) {
    injector.get(SWS_ERP_COMPANY).subscribe((companyCode) => {
      this.companyCode = companyCode;
    });
  }

  transform(src: string, defaultImg?: string) {
    if (!src) {
      src = defaultImg || '/assets/image-placeholder.jpg';
    }
    if (this.uploaded(src)) {
      const imgUrl = this.transformImgUrl();
      src = `${imgUrl}${src}`;
    }
    return src;
  }

  private uploaded(src: string) {
    return src.startsWith(`/${this.companyCode}`);
  }

  private transformImgUrl() {
    return environment.swsErp.apiUrl;
    // let segment = environment.swsErp.apiUrl.split('/');
    // return segment.filter((s) => s != 'api').join('/');
  }
}

@Pipe({ name: 'erpTranslate' })
export class ErpTranslationPipe implements PipeTransform {
  constructor(private cms: CmsService) {}

  transform(value: string) {
    try {
      const obj = JSON.parse(value);
      const lang = this.cms.getCurrentLang();
      if (obj[lang]) {
        return obj[lang];
      }
      const defaultLang = this.cms.getDefaultLang();
      if (obj[defaultLang]) {
        return obj[defaultLang];
      }
      return value;
    } catch (err) {
      return value;
    }
  }
}
