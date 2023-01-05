import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, JJWalletTransaction } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  providers: [DatePipe],
})
export class TransactionsPage extends SharedComponent implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  transactionsPage: Pagination;
  transactionsEnded: boolean;
  transactions: JJWalletTransaction[][];
  updatedAt: Date;

  get dates(): string[] {
    if (!this.transactions) return null;
    return Object.keys(this.transactions);
  }

  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private date: DatePipe,
    private router: Router,
  ) {
    super();
  }

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.core.getWalletByNo(this.walletNo);
    this.transactions = [];
    this.transactionsPage = this.defaultPage;
    const transactions = await this.getTransactions();
    this.grouping(transactions);
    this.transactionsEnded = transactions.length < this.transactionsPage.itemsPerPage;
  }

  async getTransactions() {
    const transactions = await this.core.getWalletTransactionsByWalletId(this.wallet.doc_id, this.transactionsPage);
    this.updatedAt = new Date();
    return transactions;
  }

  async loadMoreTransactions(event: Event) {
    this.transactionsPage.currentPage += 1;
    const incoming = await this.getTransactions();
    this.grouping(incoming);
    this.transactionsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  grouping(transactions: JJWalletTransaction[]) {
    if (!this.transactions) {
      this.transactions = [];
    }
    transactions.forEach((transaction) => {
      const date = this.date.transform(transaction.doc_createdDate, 'd/M/yyyy');
      let list = this.transactions[date];
      if (list === undefined) {
        list = [transaction];
      } else {
        list.push(transaction);
      }
      this.transactions[date] = list;
    });
  }

  async openDetails(identifier: string) {
    let basePath = `/jj/wallets`;
    let arr = identifier.split('-');
    let start = arr[0];
    switch (start) {
      case 'TR':
        this.router.navigate([`${basePath}/transfer-receipt/${identifier}`]);
        break;
      case 'DR':
        this.router.navigate([`${basePath}/${this.walletNo}/deposits/${identifier}`]);
        break;
      case 'WR':
        this.router.navigate([`${basePath}/${this.walletNo}/withdraws/${identifier}`]);
        break;
      default:
        break;
    }
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
