import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CmsService } from '../cms.service';

@Injectable()
export class SiteGuard implements CanActivate {
    constructor(private cms: CmsService) { }

    canActivate(): boolean {
        if (this.cms.SITE) {
            return true;
        }
        return false;
    }
}
