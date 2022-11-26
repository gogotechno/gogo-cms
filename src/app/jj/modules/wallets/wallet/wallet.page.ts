import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJWallet } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { Currency } from '../wallets.types';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  displayCurrency: Currency = {
    code: 'MYR',
    displaySymbol: 'RM',
    precision: 2,
    symbolPosition: 'start'
  }
  actions = [
    {
      type: 'modal',
      nameKey: '_DEPOSIT',
      icon: 'sign-in',
      active: true
    },
    {
      type: 'modal',
      nameKey: '_WITHDRAW',
      icon: 'sign-out',
      active: true
    },
    {
      type: 'modal',
      nameKey: '_TRANSFER',
      icon: 'qr-code',
      active: true
    },
    {
      type: 'modal',
      nameKey: '_STATEMENT',
      icon: 'document-text',
      active: true
    },
    {
      type: 'modal',
      nameKey: '_PIN',
      icon: 'keypad',
      active: true
    },
    {
      type: 'modal',
      nameKey: '_QR_CODE',
      icon: 'qr-code',
      active: true
    },
  ];
  private _walletNo;
  wallet: JJWallet;

  constructor(route: ActivatedRoute, private jj: JJLuckydrawService) {
    this._walletNo = route.snapshot.params.walletNo;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?) {
    this.wallet = await this.jj.getWalletByNo(this._walletNo);
  }

}
