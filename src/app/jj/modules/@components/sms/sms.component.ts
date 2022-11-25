import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
  @Input('template') template: SmsTemplateCode;
  @Input('receiver') receiver: string;
  @Input('body') body: string;
  @Input('data') data: { [key: string]: string };

  constructor(private platform: Platform) {}

  ngOnInit() {}

  setTemplate(template: SmsTemplateCode) {
    this.template = template;
  }

  setReceiver(phoneNumber: string) {
    this.receiver = phoneNumber;
  }

  setBody(body: string) {
    this.body = body;
  }

  setData(data: { [key: string]: string }) {
    this.data = data;
  }

  send() {
    this.populateBody();
    if (!this.body) {
      return;
    }
    const smsContent = `sms:${this.receiver}${this.platform.is('android') ? '?' : '&'}body=${this.body}`;
    let el = document.getElementById('sms-trigger');
    el.setAttribute('href', smsContent);
    el.click();
  }

  populateBody() {
    switch (this.template) {
      case SmsTemplateCode.CUSTOMER_NEW_PASSWORD:
        this.body = this.data
          ? `Thank you for your registration to LUCKY-DRAW.%0A` +
            `Please login to our website %0A${this.getPathUrl('jj/membership/login')} ` +
            `using given login detail -> %0A%0AUsername: ${this.data.phone} %0APassword: ${this.data.password}`
          : null;
        break;
      case SmsTemplateCode.CUSTOMER_RESET_PASSWORD:
        this.body = this.data
          ? `We have received your reset password request.%0A` +
            `Please login to our website %0A${this.getPathUrl('jj/membership/login')} ` +
            `using given login detail -> %0A%0AUsername: ${this.data.phone} %0APassword: ${this.data.password}`
          : null;
        break;
      case SmsTemplateCode.CAPTURE_PAYMENT:
        this.body = this.data
          ? `Thank you for using LUCKY-DRAW.%0A%0ABelow is your payment details:%0A` +
            `Ref no: ${this.data.refNo}%0A` +
            `Used Points: ${this.data.amount}%0A` +
            `Current Balance: ${this.data.currentBalance}`
          : null;
        break;
      case SmsTemplateCode.TICKET_DISTRIBUTION:
        this.body = this.data
          ? `Thank you for using LUCKY-DRAW.%0A%0ABelow is your distribution details:%0A` +
            `Total of tickets: ${this.data.ticketCount}%0A` +
            `Free Points: ${this.data.freePoints}%0A` +
            `Free S&W Tickets: ${this.data.freeSnwTickets}`
          : null;
        break;
      default:
        this.body = this.body;
        break;
    }
  }

  getPathUrl(url: string) {
    return `${window.location.href.split('jj')[0]}${url}`;
  }
}

export enum SmsTemplateCode {
  CUSTOMER_NEW_PASSWORD = 'CUSTOMER_NEW_PASSWORD',
  CUSTOMER_RESET_PASSWORD = 'CUSTOMER_RESET_PASSWORD',
  CAPTURE_PAYMENT = 'CAPTURE_PAYMENT',
  TICKET_DISTRIBUTION = 'TICKET_DISTRIBUTION',
}
