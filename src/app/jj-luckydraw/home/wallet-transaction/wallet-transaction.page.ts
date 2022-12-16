import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWalletTransaction } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-transaction.page.html',
  styleUrls: ['./wallet-transaction.page.scss'],
})
export class WalletTransactionPage implements OnInit {
  loaded: boolean;
  transactionId: number;
  transaction: JJWalletTransaction;

  constructor(private route: ActivatedRoute, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.transactionId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.transaction = await this.lucky.getWalletTransactionById(this.transactionId);
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresherEl = <HTMLIonRefresherElement>event.target;
    refresherEl.complete();
  }
}
