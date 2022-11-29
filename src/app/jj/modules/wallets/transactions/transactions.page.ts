import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, RefresherCustomEvent } from '@ionic/angular';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJWallet, JJWalletTransaction } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  providers: [DatePipe]
})
export class TransactionsPage implements OnInit {
  private _walletNo;
  wallet: JJWallet;
  transactions = [];
  updatedAt: Date;

  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 20
  }

  constructor(route: ActivatedRoute, private jj: JJLuckydrawService, private date: DatePipe) {
    this._walletNo = route.snapshot.params.walletNo;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(reload?: boolean, event?) {
    if (reload) {
      this.transactions = [];
    }
    this.updatedAt = undefined;
    this.wallet = await this.jj.getWalletByNo(this._walletNo);
    let transactions = await this.jj.getWalletTransactionsByWalletId(this.wallet.doc_id, this.pagination);
    // this.transactions.push(page);
    transactions.forEach(v => {
      let date = this.date.transform(v.doc_createdDate, 'd/M/yyyy');
      let list = this.transactions[date];
      if (list === undefined) {
        list = [v];
      } else {
        list.push(v);
      }
      this.transactions[date] = list;
    });
    this.updatedAt = new Date();

    //TODO: Don't know how to distinguish event
    if (event) {
      if (event.target) {
        (<InfiniteScrollCustomEvent>event).target.complete();
      } else {
        (<RefresherCustomEvent>event).detail.complete();
      }
    }
  }

  myHeaderFn(record, recordIndex, records) {
    if (recordIndex % 20 === 0) {
      return 'Header ' + recordIndex;
    }
    return null;
  }

  get dates(): string[] {
    return Object.keys(this.transactions);
  }

}
