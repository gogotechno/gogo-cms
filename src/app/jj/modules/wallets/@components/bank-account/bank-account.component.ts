import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { AppUtils } from 'src/app/cms.util';

@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent implements OnInit {
  @Input('bank') bankName: string;
  @Input('holder') holderName: string;
  @Input('accountNo') accountNo: string;

  constructor(private appUtils: AppUtils) {}

  ngOnInit() {}

  async copyAccountNo() {
    await Clipboard.write({
      string: this.accountNo,
    });
    await this.appUtils.presentAlert('jj._ACCOUNT_NO_COPIED');
  }
}
