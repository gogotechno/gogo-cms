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
  value: {
    phone: string;
    password: string;
  };

  constructor(private platform: Platform) {}

  set _body(value: { phone: string; password: string }) {
    this.value = value;
  }

  get _body() {
    return this.value;
  }

  ngOnInit() {}

  send() {
    this.setBody();
    let el = document.getElementById('sms-trigger');
    el.setAttribute('href', this.body);
    el.click();
  }

  setBody() {
    if (!this.value) return;

    switch (this.template) {
      case SmsTemplateCode.CUSTOMER_PASSWORD:
        // prettier-ignore
        this.body = `sms:${this.value.phone}${this.platform.is('android')?'?':'&'}body=Your password is ${this.value.password}`;
        break;
    }
  }
}

export enum SmsTemplateCode {
  CUSTOMER_PASSWORD = 'CUSTOMER_PASSWORD',
}
