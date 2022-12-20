import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWithdrawRequest } from 'src/app/jj/typings';
import { WalletsService } from '../wallets.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  backButtonText: string;
  whatsappLink: string;
  walletNo: string;
  refNo: string;
  withdraw: JJWithdrawRequest;

  get statusColor() {
    if (!this.withdraw) {
      return;
    }
    return this.walletsService.getDepositStatusColor(this.withdraw.status);
  }

  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private common: CommonService,
    private walletsService: WalletsService,
  ) {}

  async ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.refNo = params['refNo'];
    await this.loadData();
  }

  async loadData() {
    this.whatsappLink = await this.common.getWhatsapp();
    this.withdraw = await this.core.getWithdrawRequestByRefNo(this.refNo);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}
