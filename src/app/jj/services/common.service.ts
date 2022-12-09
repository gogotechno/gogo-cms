import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsLanguage, CmsSiteAttributeOption } from 'src/app/cms.type';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { JJFab, LANGUAGE_STORAGE_KEY, LiteralObject, SmsTemplateCode } from '../typings';

const DEFAULT_LANG: CmsSiteAttributeOption = {
  code: 'en',
  label: {
    en: 'English',
    zh: 'English',
    ms: 'English',
  },
  value: null,
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService,
    private storage: LocalStorageService,
    private cms: CmsService,
    private swsErp: SwsErpService,
  ) {}

  getByUrl(url: string) {
    return this.http.get(url).toPromise();
  }

  async getSupportedLanguages(): Promise<CmsLanguage[]> {
    let attributes = await this.cms.getAttributes();
    let attribute = attributes.find((a) => a.code == 'languages');
    let options = attribute?.options.length ? attribute.options : [DEFAULT_LANG];
    return options.map((option) => ({
      ...option,
      selected: option.code == this.translate.currentLang,
    }));
  }

  async setCurrentLanguage(langCode: string) {
    await this.translate.use(langCode).toPromise();
    await this.storage.set(LANGUAGE_STORAGE_KEY, langCode);
  }

  getCurrentLanguage() {
    return this.swsErp.language;
  }

  async getWhatsapp() {
    let attributes = await this.cms.getAttributes();
    let attribute = attributes.find((a) => a.code == 'whatsapp');
    return attribute.value;
  }

  sendSms(receiver: string, template: SmsTemplateCode, data: LiteralObject) {
    let body = this.getSmsBody(template, data);
    let anchor = document.createElement('a');
    anchor.setAttribute('id', 'sms-trigger');
    anchor.setAttribute('href', `sms:${receiver}${this.platform.is('android') ? '?' : '&'}body=${body}`);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private getSmsBody(template: SmsTemplateCode, data: LiteralObject) {
    switch (template) {
      case 'CUSTOMER_NEW_PASSWORD':
        return (
          `Thank you for your registration to LUCKY-DRAW.%0A%0A` +
          `Please login to our website using given login detail:%0A` +
          `Website: ${window.location.origin}/jj/login%0A` +
          `Username: ${data.phone} %0A` +
          `Password: ${data.password}`
        );
      case 'CUSTOMER_RESET_PASSWORD':
        return (
          `We have received your reset password request.%0A%0A` +
          `Please login to our website using given login detail:%0A` +
          `Website: ${window.location.origin}/jj/login%0A` +
          `Username: ${data.phone} %0A` +
          `Password: ${data.password}`
        );
      case 'CAPTURE_PAYMENT':
        return (
          `Thank you for using LUCKY-DRAW.%0A%0A` +
          `Below is your payment details:%0A` +
          `Ref no: ${data.refNo}%0A` +
          `Used Points: ${data.amount}%0A` +
          `Current Balance: ${data.currentBalance}`
        );
      case 'TICKET_DISTRIBUTION':
        return (
          `Thank you for using LUCKY-DRAW.%0A%0A` +
          `Below is your distribution details:%0A` +
          `Total of tickets: ${data.ticketCount}%0A` +
          `Free Points: ${data.freePoints}%0A` +
          `Free S%26W Tickets: ${data.freeSnwTickets}`
        );
      default:
        return '';
    }
  }

  async searchGoogleMap(query: string) {
    query = query.replace('&', '%26');
    let encoded = encodeURI(query);
    let url = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
    await Browser.open({ url: url });
  }

  async getCurrentPosition() {
    try {
      let position = await Geolocation.getCurrentPosition();
      return position;
    } catch (err) {
      console.error('Error getting location: ', err);
      return null;
    }
  }

  async getCurrentCoords() {
    let lat: number = null;
    let lng: number = null;
    let position = await this.getCurrentPosition();
    if (position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    }
    return {
      latitude: lat,
      longitude: lng,
    };
  }

  async navigateCustomUrl(url: string) {
    if (!url) {
      return;
    }
    if (url.startsWith('http')) {
      await Browser.open({ url: url });
      return;
    }
    await this.router.navigateByUrl(url);
  }
}
