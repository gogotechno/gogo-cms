import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJDepositRequest, JJWallet } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage extends SharedComponent implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  depositPage: Pagination;
  depositEnded: boolean;
  depositId: number;
  deposits: JJDepositRequest[][];
  updatedAt: Date;
  id: string;
  
  get dates(): string[] {
    if (!this.deposits) {
      return null;
    }
    return Object.keys(this.deposits);
  }

  constructor(private route: ActivatedRoute, private core: CoreService, private date: DatePipe) {
    super();
  }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.core.getWalletByNo(this.walletNo);
    this.depositPage = this.defaultPage;
    let deposits = await this.getDeposits();
    this.grouping(deposits);
    this.depositEnded = deposits.length < this.depositPage.itemsPerPage;
  }

  async getDeposits() {
    let deposits = await this.core.getDepositRequests(this.depositPage, {
      wallet_id: this.wallet.doc_id,
      wallet_id_type: '=',
    });
    this.updatedAt = new Date();
    return deposits;
  }

  grouping(deposits: JJDepositRequest[]) {
    if (!this.deposits) {
      this.deposits = [];
    }
    deposits.forEach((deposit) => {
      let date = this.date.transform(deposit.doc_createdDate, 'd/M/yyyy');
      let list = this.deposits[date];
      if (list === undefined) {
        list = [deposit];
      } else {
        list.push(deposit);
      }
      this.deposits[date] = list;
    });
  }

}
