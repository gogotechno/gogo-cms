import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWithdrawRequest } from 'src/app/jj/typings';
import { WalletsService } from '../../../wallets/wallets.service';

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.page.html',
  styleUrls: ['./withdraw-request.page.scss'],
})
export class WithdrawRequestPage implements OnInit {
  backButtonText: string;
  refNo: string;
  withdraw: JJWithdrawRequest;

  get statusColor() {
    if (!this.withdraw) return;
    return this.walletsService.getStatusColor(this.withdraw.status);
  }

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
    private walletsService: WalletsService,
  ) {}

  async ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.refNo = params['refNo'];
    await this.loadData();
  }

  async loadData() {
    this.withdraw = await this.core.getWithdrawRequestByRefNo(this.refNo);
    console.log(this.withdraw);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onApprove() {}

  async onDecline() {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_DECLINE_DEPOSIT');
    if (!confirm) {
      return;
    }
    await this.core.updateWithdrawRequest(this.withdraw.doc_id, {
      status: 'DECLINED',
    });
    await this.loadData();
  }
}
