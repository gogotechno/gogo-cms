import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJDepositRequest } from 'src/app/jj/typings';
import { UploadAttachmentsComponent } from './@components/upload-attachments/upload-attachments.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  backButtonText: string;
  whatsappLink: string;
  walletNo: string;
  refNo: string;
  deposit: JJDepositRequest;
  form = form;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private core: CoreService,
    private common: CommonService,
  ) {}

  async ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    this.refNo = params['refNo'];
    await this.loadData();
  }

  async loadData() {
    this.whatsappLink = await this.common.getWhatsapp();
    this.deposit = await this.core.getDepositRequestByRefNo(this.refNo);
  }

  async openUploadAttachment() {
    const modal = await this.modalCtrl.create({
      component: UploadAttachmentsComponent,
      componentProps: {
        depositId: this.deposit.doc_id,
        bankAccount: this.deposit.bankAccount,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      await this.loadData();
    }
  }

  async onRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

const form: CmsForm = {
  code: 'view-deposit',
  labelPosition: 'stacked',
  submitButtonId: 'view-deposit-btn',
  items: [
    {
      code: 'attachments',
      label: {
        en: 'Attachments',
        zh: '附件',
        ms: '',
      },
      type: 'files',
    },
  ],
};
