import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, JJWithdrawRequest } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.page.html',
  styleUrls: ['./withdraws.page.scss'],
  providers: [DatePipe],
})
export class WithdrawsPage extends SharedComponent implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  withdrawsPage: Pagination;
  withdrawsEnded: boolean;
  withdraws: JJWithdrawRequest[][];
  updatedAt: Date;

  get dates(): string[] {
    if (!this.withdraws) {
      return null;
    }
    return Object.keys(this.withdraws);
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
    this.withdrawsPage = this.defaultPage;
    let withdraws = await this.getWithdraws();
    this.grouping(withdraws);
    this.withdrawsEnded = withdraws.length < this.withdrawsPage.itemsPerPage;
  }

  async getWithdraws() {
    let withdraws = await this.core.getWithdrawRequests(this.wallet.doc_id, this.withdrawsPage);
    this.updatedAt = new Date();
    return withdraws;
  }

}
