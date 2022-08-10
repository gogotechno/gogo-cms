import { Pipe, PipeTransform } from "@angular/core";
import { CmsService } from "../cms.service";
import { CmsTranslation } from "../cms.type";
import { TranslateService } from '@ngx-translate/core'
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'cmsTranslate' })
export class CmsTranslatePipe implements PipeTransform {

    constructor(private cms: CmsService, private translate: TranslateService) { }

    transform(value: CmsTranslation): string {
        let lang = this.translate.currentLang;
        if (!lang) {
            lang = this.cms.SITE.defaultLanguage;
        }
        return value[lang];
    }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}