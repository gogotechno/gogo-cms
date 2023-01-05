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

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private erp: SwsErpService,
  ) {
    super();
  }

  async ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.walletId = queryParams['walletId'];
    await this.loadData();
  }

  async loadData() {
    if (this.walletId) {
      this.wallet = await this.erp.getDoc('Wallet', this.walletId);
    } else {
      let wallets = await this.auth.findMyWallets();
      this.wallet = wallets.find((wallet) => wallet.type == 'CASH');
      this.walletId = this.wallet.doc_id;
    }
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
