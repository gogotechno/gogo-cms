import { Pipe, PipeTransform } from '@angular/core';
import { CmsService } from '../cms.service';
import { CmsTranslation } from '../cms.type';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'cmsTranslate',
  pure: false,
})
export class CmsTranslatePipe implements PipeTransform {
  constructor(private cms: CmsService, private translate: TranslateService) {}
  transform(value: CmsTranslation | string) {
    try {
      let lang = this.cms.getCurrentLang();
      if (value[lang]) {
        return value[lang];
      }
      let defaultLang = this.cms.getDefaultLang();
      if (value[defaultLang]) {
        return value[defaultLang];
      }
      return value;
    } catch (error) {
      return value;
    }
  }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'cssUrl' })
export class CssUrlPipe implements PipeTransform {
  constructor() {}
  transform(src: string) {
    if (!src) {
      src = '/assets/image-placeholder.jpg';
    }
    return `url("${src}")`;
  }
}

@Pipe({ name: 'firestoreDate' })
export class FirestoreDatePipe implements PipeTransform {
  constructor(private date: DatePipe) {}
  transform(timestamp: Timestamp, format?: string) {
    return this.date.transform(timestamp.toDate(), format);
  }
}

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  constructor() {}
  transform(firstName: string, lastName: string, separator?: string) {
    if (!firstName && !lastName) {
      return '-';
    }
    let arr = [firstName];
    arr.unshift(lastName || '');
    return arr.join(separator || ' ');
  }
}

@Pipe({ name: 'hideText' })
export class HideTextPipe implements PipeTransform {
  constructor() {}
  transform(text: string, replaceString: string = '*', digitLeft: number = 4) {
    if (!text) {
      return '-';
    }
    let toBeReplaced = text.substring(0, text.length - digitLeft);
    return `${replaceString.repeat(toBeReplaced.length)}${text.substring(toBeReplaced.length)}`;
  }
}
