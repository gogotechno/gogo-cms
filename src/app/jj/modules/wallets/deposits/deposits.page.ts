import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJDepositRequest, JJWallet } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { WalletsService } from '../wallets.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
  providers: [DatePipe],
})
export class DepositsPage extends SharedComponent implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  depositsPage: Pagination;
  depositsEnded: boolean;
  deposits: JJDepositRequest[][];
  updatedAt: Date;

  get dates(): string[] {
    if (!this.deposits) return null;
    return Object.keys(this.deposits);
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
    this.depositsPage = this.defaultPage;
    this.deposits = [];
    let deposits = await this.getDeposits();
    this.grouping(deposits);
    this.depositsEnded = deposits.length < this.depositsPage.itemsPerPage;
  }

  async getDeposits() {
    const deposits = await this.core.getDepositRequests(this.depositsPage, {
      wallet_id: this.wallet.doc_id,
      wallet_id_type: '=',
    });
    this.updatedAt = new Date();
    return deposits;
  }

  async loadMoreDeposits(event: Event) {
    this.depositsPage.currentPage += 1;
    let incoming = await this.getDeposits();
    this.grouping(incoming);
    this.depositsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
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

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  getStatusColor(request: JJDepositRequest) {
    return this.walletsService.getStatusColor(request.status);
  }
}
