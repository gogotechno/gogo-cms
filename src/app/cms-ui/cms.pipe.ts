import { Pipe, PipeTransform } from "@angular/core";
import { CmsService } from "../cms.service";
import { CmsTranslation } from "../cms.type";
import { TranslateService } from '@ngx-translate/core'
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { Timestamp } from "@angular/fire/firestore";

@Pipe({ name: 'cmsTranslate' })
export class CmsTranslatePipe implements PipeTransform {
    constructor(private cms: CmsService, private translate: TranslateService) { }
    transform(value: CmsTranslation): string {
        try {
            let lang = this.translate.currentLang;
            if (!lang) {
                lang = this.cms.SITE.defaultLanguage;
            }
            return value[lang] || value;
        } catch (error) {
            return <string>value;
        }
    }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Pipe({ name: 'cssUrl' })
export class CssUrlPipe implements PipeTransform {
    constructor() { }
    transform(value: string) {
        if (!value) value = "./assets/image-placeholder.jpg";
        return `url(${value})`;
    }
}

@Pipe({ name: 'firestoreDate' })
export class FirestoreDatePipe implements PipeTransform {
    constructor(private date: DatePipe) { }
    transform(value: Timestamp) {
        return this.date.transform(value.toDate());
    }
}