import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertButton, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe, FullNamePipe } from 'src/app/cms-ui/cms.pipe';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItemOption } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CreateResponse } from 'src/app/sws-erp.type';
import { SmsComponent, SmsTemplateCode } from '../../jj-luckydraw-ui/sms/sms.component';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import {
  CapturePaymentRequestExtras,
  JJCapturePaymentRequest,
  JJEvent,
  JJIssueMode,
  JJMerchant,
  JJProduct,
  JJTicketDistributionApplication,
} from '../../jj-luckydraw.type';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;
  @ViewChild(SmsComponent) smsComponent: SmsComponent;
  loaded: boolean;
  form: CmsForm;
  value: JJTicketDistributionApplication;
  event: JJEvent;
  merchant: JJMerchant;
  products: JJProduct[];
  success: boolean;

  customerInfo: {
    new: boolean;
    phone: string;
    password?: string;
  };

  constructor(
    private fullName: FullNamePipe,
    private cmsTranslate: CmsTranslatePipe,
    private app: AppUtils,
    private lucky: JJLuckydrawService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.loaded = false;
    this.form = form;
    // this.event = await this.lucky.getLastestEvent();
    this.merchant = await this.lucky.getMyMerchant();
    await this.initForm();
    this.loaded = true;
  }

  async initForm() {
    const products = await this.lucky.getProducts();
    const productField = this.form.items.find((item) => item.code == 'product_id');
    productField.options = products.map((product) => {
      const item: CmsFormItemOption = {
        code: product.doc_id.toString(),
        label: product.nameTranslation,
      };
      return item;
    });

    const events = await this.lucky.getActiveMerchantEvent();
    const eventField = this.form.items.find((item) => item.code == 'event_id');
    eventField.options = events.map((event) => {
      const item: CmsFormItemOption = {
        code: event.doc_id.toString(),
        label: event.nameTranslation,
      };
      return item;
    });
    this.event = events[0];

    this.initValue();
  }

  initValue() {
    this.value = {
      merchant_id: this.merchant?.doc_id,
      event_id: this.event?.doc_id.toString(),
      customerContactNo: '',
      customerFirstName: '',
      customerLastName: '',
      billNo: '',
      expense: 0,
      product_id: null,
      ticketCount: 0,
      customer_id: null,
      pointExpense: 0,
      freePoint: 0,
    };
  }

  async onIssueTicket(application?: JJTicketDistributionApplication) {
    const validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    application = await this.countTicket(application);
    application = await this.countFreePoint(application);
    const valid = await this.validateApplication(application);
    if (!valid) {
      return;
    }

    const params = { count: application.ticketCount, point: application.freePoint };
    const confirmMessage = await this.translate.get('jj-luckydraw._CONFIRM_TO_ISSUE_TICKETS', params).toPromise();
    const confirm = await this.app.presentConfirm(confirmMessage);

    if (confirm) {
      application = await this.assignCustomerId(application);

      let captureRes: CreateResponse;
      if (application.pointExpense) {
        const merchantWallet = await this.lucky.getWalletByMerchantId(application.merchant_id);
        const customerWallet = await this.lucky.getWalletByCustomerId(application.customer_id);
        const customer = await this.lucky.getCustomerById(application.customer_id);
        const captureReq: JJCapturePaymentRequest = {
          fromWallet: customerWallet.doc_id,
          toWallet: merchantWallet.doc_id,
          amount: application.pointExpense,
          refNo: '',
          description: `${this.fullName.transform(customer.firstName, customer.lastName)} - ${this.merchant.name}`,
          reference1: application.billNo,
        };
        captureRes = await this.lucky.createCapturePaymentRequest(captureReq);
      }

      const distributionRes = await this.lucky.issueTickets(this.cmsForm.removeUnusedKeys('swserp', application));

      if (captureRes) {
        await this.lucky.updateCapturePaymentRequest(captureRes.doc_id, {
          reference2: String(distributionRes.doc_id),
        });
        const extras: CapturePaymentRequestExtras = captureRes.data;
        const transactions = await this.lucky.getWalletTransactionsByCapturePaymentRequest(extras.request.refNo);
        await Promise.all(
          transactions.map(async (transaction) => {
            await this.lucky.updateWalletTransaction(transaction.doc_id, {
              reference2: String(distributionRes.doc_id),
            });
          }),
        );
      }

      await this.app.dismissLoading();

      const buttons: AlertButton[] = [];

      if (captureRes) {
        buttons.push({
          text: await this.translate.get('jj-luckydraw._SEND_PAYMENT').toPromise(),
          handler: () => {
            const extras: CapturePaymentRequestExtras = captureRes.data;
            this.smsComponent.setTemplate(SmsTemplateCode.CAPTURE_PAYMENT);
            this.smsComponent.setReceiver(extras.customerInfo.customer.phone);
            this.smsComponent.setData({
              refNo: extras.customerInfo.transaction.refNo,
              amount: String(extras.request.amount),
              currentBalance: String(extras.customerInfo.currentBalance),
            });
            this.smsComponent.send();
            return false;
          },
        });
      }

      if (this.customerInfo.new) {
        buttons.push({
          text: await this.translate.get('jj-luckydraw._NOTIFY_NEW_CUSTOMER').toPromise(),
          handler: () => {
            this.smsComponent.setTemplate(SmsTemplateCode.CUSTOMER_NEW_PASSWORD);
            this.smsComponent.setReceiver(this.customerInfo.phone);
            this.smsComponent.setData({
              phone: this.customerInfo.phone,
              password: this.customerInfo.password,
            });
            this.smsComponent.send();
            return false;
          },
        });
      }

      await this.app.presentAlert('jj-luckydraw._TICKETS_ISSUED', '_SUCCESS', {
        buttons: [
          {
            text: await this.translate.get('jj-luckydraw._SEND_DISTRIBUTON').toPromise(),
            handler: () => {
              this.smsComponent.setTemplate(SmsTemplateCode.TICKET_DISTRIBUTION);
              this.smsComponent.setReceiver(this.customerInfo.phone);
              this.smsComponent.setData({
                ticketCount: String(application.ticketCount),
                freePoints: String(application.freePoint),
              });
              this.smsComponent.send();
              return false;
            },
          },
          ...buttons,
          {
            text: await this.translate.get('_CLOSE').toPromise(),
            role: 'cancel',
            handler: () => {
              this.cmsForm.resetForm();
              this.customerInfo = null;
              this.success = true;
              this.onDismiss();
              return true;
            },
          },
        ],
      });
    }
  }

  async countTicket(application: JJTicketDistributionApplication) {
    this.event = await this.lucky.getEventById(Number(application.event_id));
    const minSpend = this.event.minSpend || application.expense;
    application.ticketCount = Math.floor(application.expense / minSpend) || 0;
    return application;
  }

  async countFreePoint(application: JJTicketDistributionApplication) {
    const rule = await this.lucky.getActivePointRule(
      Number(application.event_id),
      application.expense,
      application.pointExpense,
    );
    if (rule) {
      const totalSpend =
        rule.issueMode == JJIssueMode.AMOUNT_PAID
          ? application.expense
          : +application.expense + +application.pointExpense;
      application.freePoint = rule.freePoint * Math.floor(totalSpend / rule.minimumSpend) || 0;
      application.usedPointRule = JSON.stringify(rule);
    } else {
      application.freePoint = 0;
    }
    return application;
  }

  async validateApplication(application: JJTicketDistributionApplication) {
    if (application.ticketCount == 0 && application.freePoint == 0) {
      const errorMessages: string[] = [];

      const expenseField = this.form.items.find((item) => item.code == 'expense');
      const expenseParams = { min: this.event.minSpend || 1, label: this.cmsTranslate.transform(expenseField.label) };
      const expenseMessage = await this.translate.get('_REQUIRES_MINIMUM', expenseParams).toPromise();
      errorMessages.push(expenseMessage);

      // let pointRule: JJPointRule = application.usedPointRule ? JSON.parse(application.usedPointRule) : null;
      // let pointField = this.form.items.find((item) => item.code == 'pointExpense');
      // let pointParams = { min: pointRule?.minimumSpend || 1, label: this.cmsTranslate.transform(pointField.label) };
      // let pointMessage = await this.translate.get('_REQUIRES_MINIMUM', pointParams).toPromise();
      // errorMessages.push(pointMessage);

      const alertMessage = errorMessages.map((m) => `<p class='ion-no-margin'>${m}</p>`).join('');
      this.app.presentAlert(alertMessage, '_ERROR');
      return false;
    }
    return true;
  }

  async assignCustomerId(application: JJTicketDistributionApplication) {
    const customer = await this.lucky.getCustomerByPhone(application.customerContactNo);
    if (!customer) {
      const randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      const phone = `${application.customerContactNo}`;
      const response = await this.lucky.createCustomer({
        firstName: application.customerFirstName,
        lastName: application.customerLastName,
        phone: application.customerContactNo,
        password: randomPassword,
      });
      this.customerInfo = {
        new: true,
        phone,
        password: randomPassword,
      };
      application.customer_id = response.doc_id;
    } else {
      this.customerInfo = {
        new: false,
        phone: customer.phone,
      };
      application.customer_id = customer.doc_id;
    }
    return application;
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({ success: this.success });
  }
}

const form: CmsForm = {
  code: 'ticket-distribution',
  submitButtonText: '_CONFIRM',
  labelPosition: 'stacked',
  items: [
    {
      code: 'merchant_id',
      label: {
        en: 'JJMerchant',
        zh: '商家',
      },
      type: 'number',
      required: true,
      hidden: true,
    },
    {
      code: 'event_id',
      label: {
        en: 'Event',
        zh: '活动',
      },
      type: 'select',
      required: true,
    },
    {
      code: 'customerContactNo',
      label: {
        en: 'Customer Contact No',
        zh: '客户联络号码',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'customerFirstName',
      label: {
        en: 'Customer First Name',
        zh: '客户名字',
      },
      type: 'text',
    },
    {
      code: 'customerLastName',
      label: {
        en: 'Customer Last Name',
        zh: '客户姓氏',
      },
      type: 'text',
    },
    {
      code: 'billNo',
      label: {
        en: 'Bill No',
        zh: '账单编号',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'expense',
      label: {
        en: 'Expenses Amount (RM)',
        zh: '消费合计 (RM)',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'pointExpense',
      label: {
        en: 'Point Expenses Amount',
        zh: '消费积分',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'product_id',
      label: {
        en: 'Product',
        zh: '产品',
      },
      type: 'select',
    },
  ],
};
