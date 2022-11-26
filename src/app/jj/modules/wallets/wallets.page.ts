import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { UserType } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { JJWallet } from '../../typings';
import { Currency } from './wallets.types';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {

  displayCurrency: Currency = {
    code: 'MYR',
    displaySymbol: 'RM',
    precision: 2,
    symbolPosition: 'start'
  }
  wallets: JJWallet[] = [];
  totalAssetsBalance = 0;
  updatedAt;

  constructor(private jj: JJLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?) {
    let wallet = await this.jj.getMyWallet(UserType.CUSTOMER);
    this.wallets = [];
    this.totalAssetsBalance = 0;
    this.updatedAt = null;
    this.wallets.push(wallet);
    this.totalAssetsBalance = this.wallets.reduce((p, c) => p += c.walletBalance, 0);
    if (event) {
      (<RefresherCustomEvent>event).detail.complete();
    }
    this.updatedAt = new Date();
  }

}
