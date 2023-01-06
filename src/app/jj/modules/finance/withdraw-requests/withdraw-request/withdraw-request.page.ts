import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsFile } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWithdrawRequest } from 'src/app/jj/typings';
import { WalletsService } from '../../../wallets/wallets.service';
import { FinanceService } from '../../finance.service';
import { UploadAttachmentsComponent } from './@components/upload-attachments/upload-attachments.component';

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
    if (!this.withdraw) {
      return;
    }
    return this.walletsService.getStatusColor(this.withdraw.status);
  }

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
    private walletsService: WalletsService,
    private financeService: FinanceService,
  ) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.refNo = params['refNo'];
    await this.loadData();
  }

  async loadData() {
    this.withdraw = await this.core.getWithdrawRequestByRefNo(this.refNo);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onApprove() {
    if (this.withdraw.withdrawMethod.code == 'BANK_TRANSFER') {
      let attachments = await this.openUploadAttachment();
      if (!attachments) {
        return;
      }
      await this.approveRequest(attachments);
    } else {
      await this.approveRequest();
    }
  }

  async approveRequest(attachments?: CmsFile[]) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_APPROVE_DEPOSIT');
    if (!confirm) {
      return;
    }
    await this.core.approveWithdrawRequest(this.withdraw.doc_id, attachments);
    this.financeService.withdrawChange.next(true);
    await this.loadData();
  }

  async onDecline() {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_DECLINE_DEPOSIT');
    if (!confirm) {
      return;
    }
    await this.core.declineWithdrawRequest(this.withdraw.doc_id);
    this.financeService.withdrawChange.next(true);
    await this.loadData();
  }

  async openUploadAttachment() {
    const modal = await this.modalCtrl.create({
      component: UploadAttachmentsComponent,
      componentProps: {
        withdrawId: this.withdraw.doc_id,
        withdraw: this.withdraw,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.attachments;
  }
}
