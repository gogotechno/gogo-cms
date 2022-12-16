import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/sws-erp.type';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWallet, JJWalletTransaction, UserType } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.page.html',
  styleUrls: ['./wallet-transactions.page.scss'],
})
export class WalletTransactionsPage implements OnInit {
  loaded: boolean;
  transactionPagination: Pagination;
  transactions: JJWalletTransaction[];
  noMoreTransactions: boolean;
  role: UserType;
  wallet: JJWallet;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreTransactions = false;
    this.role = this.auth.userRole;
    this.wallet = await this.lucky.getMyWallet(this.role);
    await this.loadTransactions();
    this.loaded = true;
  }

  resetPagination() {
    this.transactionPagination = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  async getTransactions() {
    return this.lucky.getWalletTransactionsByWalletId(this.wallet.doc_id, this.transactionPagination);
  }

  async loadTransactions() {
    this.resetPagination();
    this.transactions = await this.getTransactions();
    this.noMoreTransactions = this.transactions.length < this.transactionPagination.itemsPerPage;
  }

  async loadMoreTransactions(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.transactionPagination.currentPage += 1;
    const transactions = await this.getTransactions();
    this.transactions = [...this.transactions, ...transactions];
    this.noMoreTransactions = transactions.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresherEl = <HTMLIonRefresherElement>event.target;
    refresherEl.complete();
  }
}
