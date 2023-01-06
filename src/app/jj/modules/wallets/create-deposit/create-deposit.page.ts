import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJDepositMethod, JJDepositRequest, JJWallet } from 'src/app/jj/typings';
import { UploadAttachmentsComponent } from './@components/upload-attachments/upload-attachments.component';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.page.html',
  styleUrls: ['./create-deposit.page.scss'],
})
export class CreateDepositPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  form = form;
  value: Partial<JJDepositRequest>;
  methods: JJDepositMethod[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    await this.loadData();
  }

  async loadData() {
    this.methods = await this.core.getDepositMethods();
    const methodField = this.form.items.find((item) => item.code == 'deposit_method_id');
    methodField.options = this.methods.map((method) => ({
      code: String(method.doc_id),
      label: method.name,
      disabled: !method.isActive,
    }));
    this.value = {
      walletNo: this.walletNo,
      amount: null,
      description: null,
      deposit_method_id: null,
    };
  }

  async onConfirm(data: JJDepositRequest) {
    let method = this.methods.find((m) => m.doc_id == data.deposit_method_id);
    if (method.code == 'BANK_TRANSFER') {
      let attachments = await this.openUploadAttachment(data.walletNo, data.amount);
      if (!attachments) {
        return;
      }
      data.attachments = attachments;
    }
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_DEPOSIT');
    if (!confirm) {
      return;
    }
    let response = await this.core.createDepositRequest({ refNo: '', ...data });
    await this.router.navigate(['../deposits', response.data.refNo], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  async openUploadAttachment(walletNo: string, amount: number) {
    const modal = await this.modalCtrl.create({
      component: UploadAttachmentsComponent,
      componentProps: {
        walletNo: walletNo,
        amount: amount,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.attachments;
  }
}

const form: CmsForm = {
  code: 'create-deposit',
  labelPosition: 'stacked',
  submitButtonId: 'create-deposit-btn',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'walletNo',
      label: 'jj._WALLET_NO',
      type: 'text',
      required: true,
      readonly: true,
    },
    {
      code: 'amount',
      label: 'jj._AMOUNT',
      placeholder: '0.00',
      type: 'number',
      precision: 2,
      required: true,
    },
    {
      code: 'description',
      label: 'jj._DESCRIPTION',
      type: 'textarea',
      required: true,
    },
    {
      code: 'deposit_method_id',
      label: 'jj._METHODS',
      type: 'radio',
      required: true,
      direction: 'vertical',
    },
  ],
};
