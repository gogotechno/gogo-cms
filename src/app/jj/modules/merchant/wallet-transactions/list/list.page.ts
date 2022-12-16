import { Component, OnInit } from '@angular/core';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWalletTransaction, WalletType } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  walletId: number;
  transactionsPage: Pagination;
  transactionsEnded: boolean;
  transactions: JJWalletTransaction[];

  constructor(private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    const wallets = await this.auth.findMyWallets();
    const wallet = wallets.find((wallet) => wallet.type == 'MERCHANT');
    this.walletId = wallet.doc_id;

    await this.loadData();
  }

  async loadData() {
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
