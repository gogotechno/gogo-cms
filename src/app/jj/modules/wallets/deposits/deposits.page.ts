import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { JJDepositRequest, JJWallet } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
})
export class DepositsPage implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  depositsPage: Pagination;
  depositsEnded: boolean;
  deposits: JJDepositRequest[][];
  updatedAt: Date;

  constructor(private route: ActivatedRoute, private core: CoreService) {}

  async ngOnInit() {}

  async getDeposits() {
    const deposits = await this.core.getDepositRequests(this.depositsPage, {
      wallet_id: this.wallet.doc_id,
      wallet_id_type: '=',
    });
    this.updatedAt = new Date();
    return deposits;
  }
}
