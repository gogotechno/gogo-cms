import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
  @Input() template: TemplateCode;

  body: string;
  value: CustomerPassword;

  constructor() { }

  set _body(value: CustomerPassword) {
    this.value = value;
  }

  get _body() {
    return this.value;
  }

  ngOnInit() { }


  send() {
    this.setBody();
    let el = document.getElementById('sms-trigger');
    el.setAttribute('href', this.body);
    el.click();
  }

  setBody() {

    if (!this.value) return;

    switch (this.template) {
      case TemplateCode.CUSTOMER_PASSWORD:
        this.body = `sms:${this.value.phone}&body=Your password is ${this.value.password}`;
        break;
    }

  }

}

enum TemplateCode {
  CUSTOMER_PASSWORD = 'CUSTOMER_PASSWORD'
}

interface CustomerPassword {
  phone: string,
  password: string
}
