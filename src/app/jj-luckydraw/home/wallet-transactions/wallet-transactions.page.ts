import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/sws-erp.type';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWalletTransaction, UserType } from '../../jj-luckydraw.type';

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
  merchantId: number;
  customerId: number;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreTransactions = false;
    this.merchantId = await this.lucky.getMyMerchantId();
    this.customerId = (await this.auth.findMe()).doc_id;
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
    switch (this.auth.userRole) {
      case UserType.MERCHANT:
        return this.lucky.getWalletTransactionByMerchantId(this.merchantId, this.transactionPagination);
      case UserType.CUSTOMER:
        return this.lucky.getWalletTransactionByCustomerId(this.customerId, this.transactionPagination);
    }
  }

  async loadTransactions() {
    this.resetPagination();
    this.transactions = await this.getTransactions();
    this.noMoreTransactions = this.transactions.length < this.transactionPagination.itemsPerPage;
  }

  async loadMoreTransactions(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.transactionPagination.currentPage += 1;
    let transactions = await this.getTransactions();
    this.transactions = [...this.transactions, ...transactions];
    this.noMoreTransactions = transactions.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresherEl = <HTMLIonRefresherElement>event.target;
    refresherEl.complete();
  }
}
