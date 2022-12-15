import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { AuthService } from '../../services';
import { JJWallet } from '../../typings';
import { Currency } from './wallets.types';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  wallets: JJWallet[] = [];
  totalAssetsBalance = 0;
  updatedAt: Date;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    this.wallets = await this.auth.findMyWallets();
    this.totalAssetsBalance = 0;
    this.updatedAt = null;
    this.totalAssetsBalance = this.wallets.reduce((p, c) => (p += Number(c.walletBalance)), 0);
    if (event) {
      (<RefresherCustomEvent>event).detail.complete();
    }
    this.updatedAt = new Date();
  }
}
