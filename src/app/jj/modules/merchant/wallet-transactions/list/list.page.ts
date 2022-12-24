import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, JJWalletTransaction, WalletType } from 'src/app/jj/typings';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  walletId: number;
  wallet: JJWallet;
  transactionsPage: Pagination;
  transactionsEnded: boolean;
  transactions: JJWalletTransaction[];

  constructor(private auth: AuthService, private core: CoreService, route: ActivatedRoute, private erp: SwsErpService) {
    super();
    const walletId = route.snapshot.queryParams.walletId;
    if (walletId) {
      this.walletId = walletId;
      console.log(this.walletId)
    }
  }

  async ngOnInit() {
    if (!this.walletId) {
      const wallets = await this.auth.findMyWallets();
      const wallet = wallets.find((wallet) => wallet.type == 'MERCHANT');
      this.walletId = wallet.doc_id;
    }

    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.erp.getDoc('Wallet', this.walletId);

    this.transactionsEnded = false;
    this.transactionsPage = this.defaultPage;
    this.transactions = await this.getTransactions();
    this.transactionsEnded = this.transactions.length < this.transactionsPage.itemsPerPage;
  }

  async getTransactions() {
    const transactions = await this.core.getWalletTransactionsByWalletId(this.walletId, this.transactionsPage);
    return transactions;
  }

  async loadMoreTransactions(event: Event) {
    this.transactionsPage.currentPage += 1;
    const incoming = await this.getTransactions();
    this.transactions = [...this.transactions, ...incoming];
    this.transactionsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
