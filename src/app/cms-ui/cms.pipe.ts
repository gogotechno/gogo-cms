import { Pipe, PipeTransform } from "@angular/core";
import { CmsService } from "../cms.service";
import { CmsTranslation } from "../cms.type";
import { TranslateService } from '@ngx-translate/core'
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { Timestamp } from "@angular/fire/firestore";

@Pipe({
    name: 'cmsTranslate',
    pure: false
})
export class CmsTranslatePipe implements PipeTransform {
    constructor(private cms: CmsService, private translate: TranslateService) { }
    transform(value: CmsTranslation): string {
        try {
            let lang = this.cms.getCurrentLang();
            if (value[lang]) {
                return value[lang] as string;
            }
            let defaultLang = this.cms.getDefaultLang();
            if (value[defaultLang]) {
                return value[defaultLang] as string;
            }
            return value as string;
        } catch (error) {
            return value as string;
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
        if (!value) {
            value = "/assets/image-placeholder.jpg";
        }
        return `url(${value})`;
    }
}

@Pipe({ name: 'firestoreDate' })
export class FirestoreDatePipe implements PipeTransform {
    constructor(private date: DatePipe) { }
    transform(value: Timestamp, format?: string) {
        return this.date.transform(value.toDate(), format);
    }
}