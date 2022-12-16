import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { SmsComponent, SmsTemplateCode } from '../../jj-luckydraw-ui/sms/sms.component';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { CapturePaymentRequestExtras, JJCapturePaymentRequest, JJWallet } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-capture-payment',
  templateUrl: './capture-payment.page.html',
  styleUrls: ['./capture-payment.page.scss'],
})
export class CapturePaymentPage implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;
  @ViewChild(SmsComponent) smsComponent: SmsComponent;
  readonly SmsTemplateCode = SmsTemplateCode;
  loaded: boolean;
  form = form;
  merchantId: number;
  merchantWallet: JJWallet;

  constructor(private translate: TranslateService, private app: AppUtils, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.merchantId = await this.lucky.getMyMerchantId();
    this.merchantWallet = await this.lucky.getWalletByMerchantId(this.merchantId);
    this.loaded = true;
  }

  async onSendRequest(request: JJCapturePaymentRequest) {
    const validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    const confirmMessage = await this.translate.get('jj-luckydraw._CONFIRM_TO_MAKE_PAYMENT').toPromise();
    const confirm = await this.app.presentConfirm(confirmMessage);
    if (confirm) {
      const customerWalletNo = request.customerWalletNo;
      const customerWallet = await this.lucky.getWalletByNo(customerWalletNo);
      delete request.customerWalletNo;
      request.fromWallet = customerWallet.doc_id;
      request.toWallet = this.merchantWallet.doc_id;
      request.refNo = '';
      const response = await this.lucky.createCapturePaymentRequest(this.cmsForm.removeUnusedKeys('swserp', request));
      await this.app.presentAlert('jj-luckydraw._PAYMENT_MADE', '_SUCCESS');
      const extras: CapturePaymentRequestExtras = response.data;
      this.smsComponent.setReceiver(extras.customerInfo.customer.phone);
      this.smsComponent.setData({
        refNo: extras.customerInfo.transaction.refNo,
        amount: String(extras.request.amount),
        currentBalance: String(extras.customerInfo.customer.phone),
      });
      this.smsComponent.send();
      this.cmsForm.resetForm();
    }
  }
}

const form: CmsForm = {
  code: 'capture-payment',
  labelPosition: 'stacked',
  submitButtonText: 'jj-luckydraw._PAY',
  items: [
    {
      code: 'customerWalletNo',
      label: {
        en: 'Wallet No',
        zh: '钱包账号',
      },
      type: 'barcode-scanner',
      required: true,
    },
    {
      code: 'amount',
      label: {
        en: 'Amount',
        zh: '金额',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'description',
      label: {
        en: 'Description',
        zh: '详情',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'reference1',
      label: {
        en: 'Reference 1',
        zh: '参考 1',
      },
      type: 'text',
    },
    {
      code: 'reference2',
      label: {
        en: 'Reference 2',
        zh: '参考 2',
      },
      type: 'text',
    },
    {
      code: 'reference3',
      label: {
        en: 'Reference 3',
        zh: '参考 3',
      },
      type: 'text',
    },
  ],
};
