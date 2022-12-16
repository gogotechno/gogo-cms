import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { CapturePaymentRequestExtras, JJCapturePaymentRequest, JJWallet } from 'src/app/jj/typings';

@Component({
  selector: 'app-capture-payment',
  templateUrl: './capture-payment.component.html',
  styleUrls: ['./capture-payment.component.scss'],
})
export class CapturePaymentComponent implements OnInit {
  form = form;
  success: boolean;
  wallet: JJWallet;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
  ) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss({
      success: this.success,
    });
  }

  async onSendRequest(request: JJCapturePaymentRequest) {
    const confirmMessage = await this.translate.get('jj._CONFIRM_TO_MAKE_PAYMENT').toPromise();
    const confirm = await this.appUtils.presentConfirm(confirmMessage);
    if (confirm) {
      const customerWallet = await this.core.getWalletByNo(request.fromWalletNo);
      delete request.fromWalletNo;
      request.fromWallet = customerWallet.doc_id;
      request.toWallet = this.wallet.doc_id;
      request.refNo = '';
      const response = await this.core.createCapturePaymentRequest(request);
      await this.appUtils.presentAlert('jj._PAYMENT_MADE', '_SUCCESS');
      const extras: CapturePaymentRequestExtras = response.data;
      this.common.sendSms(extras.customerInfo.customer.phone, 'CAPTURE_PAYMENT', {
        refNo: extras.customerInfo.transaction.refNo,
        amount: String(extras.request.amount),
        currentBalance: String(extras.customerInfo.currentBalance),
      });
      this.success = true;
      await this.onDismiss();
    }
  }
}

const form: CmsForm = {
  code: 'capture-payment',
  labelPosition: 'stacked',
  submitButtonText: 'jj._PAY',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'fromWalletNo',
      label: {
        en: 'Wallet No.',
        zh: '钱包账号',
        ms: 'No. Dompet',
      },
      type: 'barcode-scanner',
      required: true,
    },
    {
      code: 'amount',
      label: {
        en: 'Amount',
        zh: '金额',
        ms: 'Jumlah',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'description',
      label: {
        en: 'Description',
        zh: '详情',
        ms: 'Penerangan',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'reference1',
      label: {
        en: 'Reference 1',
        zh: '参考 1',
        ms: 'Rujukan 1',
      },
      type: 'text',
    },
    {
      code: 'reference2',
      label: {
        en: 'Reference 2',
        zh: '参考 2',
        ms: 'Rujukan 2',
      },
      type: 'text',
    },
    {
      code: 'reference3',
      label: {
        en: 'Reference 3',
        zh: '参考 3',
        ms: 'Rujukan 3',
      },
      type: 'text',
    },
  ],
};
