import { Component, OnInit } from '@angular/core';
import { JJWallet } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.scss'],
})
export class WalletCardsComponent implements OnInit {
  wallets: JJWallet[];

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.wallets.subscribe((wallets) => {
      this.wallets = wallets;
    });
  }
}
