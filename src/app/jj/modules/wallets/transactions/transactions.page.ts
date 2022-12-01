import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJWallet, JJWalletTransaction } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { SharedComponent } from 'src/app/jj/shared';
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
    if (!this.transactions) {
      return null;
    }
    return Object.keys(this.transactions);
  }

  constructor(private route: ActivatedRoute, private jj: JJLuckydrawService, private date: DatePipe) {
    super();
  }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.jj.getWalletByNo(this.walletNo);
    this.transactions = [];
    this.transactionsPage = this.defaultPage;
    let transactions = await this.getTransactions();
    this.grouping(transactions);
    this.transactionsEnded = transactions.length < this.transactionsPage.itemsPerPage;
  }

  async getTransactions() {
    let transactions = await this.jj.getWalletTransactionsByWalletId(this.wallet.doc_id, this.transactionsPage);
    this.updatedAt = new Date();
    return transactions;
  }

  async loadMoreTransactions(event: Event) {
    this.transactionsPage.currentPage += 1;
    let incoming = await this.getTransactions();
    this.grouping(incoming);
    this.transactionsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  grouping(transactions: JJWalletTransaction[]) {
    transactions.forEach((transaction) => {
      let date = this.date.transform(transaction.doc_createdDate, 'd/M/yyyy');
      let list = this.transactions[date];
      if (list === undefined) {
        list = [transaction];
      } else {
        list.push(transaction);
      }
      this.transactions[date] = list;
    });
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
