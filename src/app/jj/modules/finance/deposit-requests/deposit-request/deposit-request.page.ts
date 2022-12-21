import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJDepositRequest } from 'src/app/jj/typings';
import { WalletsService } from '../../../wallets/wallets.service';

@Component({
  selector: 'app-deposit-request',
  templateUrl: './deposit-request.page.html',
  styleUrls: ['./deposit-request.page.scss'],
})
export class DepositRequestPage implements OnInit {
  backButtonText: string;
  refNo: string;
  deposit: JJDepositRequest;

  get statusColor() {
    if (!this.deposit) return;
    return this.walletsService.getStatusColor(this.deposit.status);
  }

  constructor(
    private route: ActivatedRoute,
    private appUtils: AppUtils,
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
    this.deposit = await this.core.getDepositRequestByRefNo(this.refNo);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onApprove() {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_APPROVE_DEPOSIT');
    if (!confirm) {
      return;
    }
    await this.core.updateDepositRequest(this.deposit.doc_id, {
      status: 'APPROVED',
    });
    await this.loadData();
  }

  async onDecline() {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_DECLINE_DEPOSIT');
    if (!confirm) {
      return;
    }
    await this.core.updateDepositRequest(this.deposit.doc_id, {
      status: 'DECLINED',
    });
    await this.loadData();
  }
}
