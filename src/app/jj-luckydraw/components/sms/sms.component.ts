import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
  @Input() template: SmsTemplateCode;

  body: string;
  text: string;
  value: {
    phone: string;
    password: string;
  };

  constructor(private platform: Platform) { }

  set _body(value: { phone: string; password: string }) {
    this.value = value;
  }

  get _body() {
    return this.value;
  }

  ngOnInit() { }

  send() {
    this.setBody();
    const smsContent = `sms:${this.value.phone}${this.platform.is('android') ? '?' : '&'}body=${this.body}`;
    let el = document.getElementById('sms-trigger');
    el.setAttribute('href', smsContent);
    el.click();
  }

  setBody() {
    if (!this.value) return;

    switch (this.template) {
      case SmsTemplateCode.CUSTOMER_NEW_PASSWORD:
        // prettier-ignore
        this.body = `Thank you for your registration to LUCKY-DRAW. Please login to our website ${this.getPathUrl('jj-luckydraw/sign-in')} using given login detail -> Username: ${this.value.phone} Password: ${this.value.password}`;
        break;
      case SmsTemplateCode.CUSTOMER_RESET_PASSWORD:
        // prettier-ignore
        this.body = `We have received your reset password request. Please login to our website ${this.getPathUrl('jj-luckydraw/sign-in')} using given login detail -> Username: ${this.value.phone} Password: ${this.value.password}`;
        break;
    }
  }

  getPathUrl (url: string){
    return `${window.location.href.split('jj-luckydraw')[0]}${url}`;
  }
}

export enum SmsTemplateCode {
  CUSTOMER_NEW_PASSWORD = 'CUSTOMER_NEW_PASSWORD',
  CUSTOMER_RESET_PASSWORD = 'CUSTOMER_RESET_PASSWORD',
}
