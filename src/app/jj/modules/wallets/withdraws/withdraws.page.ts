import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, JJWithdrawRequest } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { WalletsService } from '../wallets.service';

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

  constructor(
    private route: ActivatedRoute,
    private date: DatePipe,
    private core: CoreService,
    private walletsService: WalletsService,
  ) {
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
    let withdraws = await this.core.getWithdrawRequests(this.withdrawsPage, {
      wallet_id: this.wallet.doc_id,
      wallet_id_type: '=',
    });
    this.updatedAt = new Date();
    return withdraws;
  }

  async loadMoreWithdraws(event: Event) {
    this.withdrawsPage.currentPage += 1;
    let incoming = await this.getWithdraws();
    this.grouping(incoming);
    this.withdrawsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  grouping(withdraws: JJWithdrawRequest[]) {
    if (!this.withdraws) {
      this.withdraws = [];
    }
    withdraws.forEach((withdraw) => {
      let date = this.date.transform(withdraw.doc_createdDate, 'd/M/yyyy');
      let list = this.withdraws[date];
      if (list === undefined) {
        list = [withdraw];
      } else {
        list.push(withdraw);
      }
      this.withdraws[date] = list;
    });
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  getStatusColor(request: JJWithdrawRequest) {
    return this.walletsService.getWithdrawStatusColor(request.status);
  }
}
