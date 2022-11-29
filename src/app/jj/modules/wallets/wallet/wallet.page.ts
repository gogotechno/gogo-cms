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
      nameKey: 'jj._DEPOSIT',
      icon: 'enter-outline',
      active: true
    },
    {
      type: 'modal',
      nameKey: 'jj._WITHDRAW',
      icon: 'exit-outline',
      active: true
    },
    {
      type: 'modal',
      nameKey: 'jj._TRANSFER',
      icon: 'arrow-redo-outline',
      active: true
    },
    {
      type: 'modal',
      nameKey: 'jj._STATEMENT',
      icon: 'document-text-outline',
      active: true
    },
    {
      type: 'modal',
      nameKey: 'jj._PIN',
      icon: 'keypad-outline',
      active: true
    },
    {
      type: 'modal',
      nameKey: 'jj._QR_CODE',
      icon: 'qr-code-outline',
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
