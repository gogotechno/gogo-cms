import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertButton, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
import {
  CapturePaymentRequestExtras,
  IssueMode,
  JJEvent,
  JJMerchant,
  JJTicketDistributionApplication,
} from 'src/app/jj/typings';
import { SmsComponent, SmsTemplateCode } from '../../@components/sms/sms.component';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {
  @ViewChild(FormComponent) formComponent: FormComponent;
  @ViewChild(SmsComponent) smsComponent: SmsComponent;

  form: CmsForm;

  event: JJEvent;
  merchant: JJMerchant;

  success: boolean;

  customer: {
    phone: string;
    password?: string;
  };

  constructor(
    private appUtils: AppUtils,
    private cmsTranslate: CmsTranslatePipe,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    this.form = form;
    this.merchant = await this.auth.findMyMerchant();

    await this.initForm();
  }

  async initForm() {
    let products = await this.core.getProducts();
    let productField = this.form.items.find((item) => item.code == 'product_id');
    productField.options = products.map((product) => ({
      code: String(product.doc_id),
      label: product.nameTranslation,
    }));

    let events = await this.core.getMerchantEvents();
    let eventField = this.form.items.find((item) => item.code == 'event_id');
    eventField.options = events.map((event) => ({
      code: event.doc_id.toString(),
      label: event.nameTranslation,
    }));

    this.event = events[0];

    this.formComponent.patchValue({
      merchant_id: this.merchant?.doc_id,
      event_id: this.event?.doc_id,
      customerContactNo: null,
      customerFirstName: null,
      customerLastName: null,
      expense: 0,
      pointExpense: 0,
      product_id: null,
    });
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({
      success: this.success,
    });
  }

  async onIssueTicket(application: JJTicketDistributionApplication) {
    application = await this.countTicket(application);
    application = await this.countFreePoint(application);
    application = await this.countFreeSnwTickets(application);
    let valid = await this.validateApplication(application);
    if (!valid) {
      return;
    }

    let params = {
      count: application.ticketCount,
      point: application.freePoint,
      snwCount: application.freeSnwTickets,
    };
    let confirmMessage = await this.translate.get('jj._CONFIRM_TO_ISSUE_TICKETS', params).toPromise();
    let confirm = await this.appUtils.presentConfirm(confirmMessage);
    if (confirm) {
      application = await this.assignCustomerId(application);
      let res = await this.core.issueTickets(application);
      let paymentInfo: CapturePaymentRequestExtras = res.data['paymentInfo'];

      let buttons: AlertButton[] = [];
      if (paymentInfo) {
        buttons.push({
          text: await this.translate.get('jj._SEND_PAYMENT').toPromise(),
          handler: () => {
            this.smsComponent.setTemplate(SmsTemplateCode.CAPTURE_PAYMENT);
            this.smsComponent.setReceiver(paymentInfo.customerInfo.customer.phone);
            this.smsComponent.setData({
              refNo: paymentInfo.customerInfo.transaction.refNo,
              amount: String(paymentInfo.request.amount),
              currentBalance: String(paymentInfo.customerInfo.currentBalance),
            });
            this.smsComponent.send();
            return false;
          },
        });
      }

      if (this.customer.password) {
        buttons.push({
          text: await this.translate.get('jj._NOTIFY_NEW_CUSTOMER').toPromise(),
          handler: () => {
            this.smsComponent.setTemplate(SmsTemplateCode.CUSTOMER_NEW_PASSWORD);
            this.smsComponent.setReceiver(this.customer.phone);
            this.smsComponent.setData({
              phone: this.customer.phone,
              password: this.customer.password,
            });
            this.smsComponent.send();
            return false;
          },
        });
      }

      await this.appUtils.presentAlert('jj._TICKETS_ISSUED', '_SUCCESS', {
        buttons: [
          {
            text: await this.translate.get('jj._SEND_DISTRIBUTON').toPromise(),
            handler: () => {
              this.smsComponent.setTemplate(SmsTemplateCode.TICKET_DISTRIBUTION);
              this.smsComponent.setReceiver(this.customer.phone);
              this.smsComponent.setData({
                ticketCount: String(application.ticketCount),
                freePoints: String(application.freePoint),
                freeSnwTickets: String(application.freeSnwTickets),
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
              this.formComponent.resetForm();
              this.customer = null;
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
    this.event = await this.core.getEventById(application.event_id);
    let minSpend = this.event.minSpend || application.expense;
    application.ticketCount = Math.floor(application.expense / minSpend) || 0;
    return application;
  }

  private getTotalSpend(application: JJTicketDistributionApplication, issueMode: IssueMode) {
    return issueMode == IssueMode.AMOUNT_PAID ? application.expense : +application.expense + +application.pointExpense;
  }

  async countFreePoint(application: JJTicketDistributionApplication) {
    let rule = await this.core.getActivePointRule(application.event_id, application.expense, application.pointExpense);
    if (rule) {
      let totalSpend = this.getTotalSpend(application, rule.issueMode);
      application.freePoint = rule.freePoint * Math.floor(totalSpend / rule.minimumSpend) || 0;
      application.usedPointRule = JSON.stringify(rule);
    } else {
      application.freePoint = 0;
    }
    return application;
  }

  async countFreeSnwTickets(application: JJTicketDistributionApplication) {
    let rule = await this.core.getActiveSnwRule(application.event_id, application.expense, application.pointExpense);
    if (rule) {
      let totalSpend = this.getTotalSpend(application, rule.issueMode);
      application.freeSnwTickets = rule.freeTickets * Math.floor(totalSpend / rule.minimumSpend) || 0;
      application.usedSnwRule = JSON.stringify(rule);
    } else {
      application.freeSnwTickets = 0;
    }
    return application;
  }

  async validateApplication(application: JJTicketDistributionApplication) {
    if (application.ticketCount == 0 && application.freePoint == 0 && application.freeSnwTickets == 0) {
      let errorMessages: string[] = [];

      let expenseField = this.form.items.find((item) => item.code == 'expense');
      let expenseParams = { min: this.event.minSpend || 1, label: this.cmsTranslate.transform(expenseField.label) };
      let expenseMessage = await this.translate.get('_REQUIRES_MINIMUM', expenseParams).toPromise();
      errorMessages.push(expenseMessage);

      let alertMessage = errorMessages.map((m) => `<p class='ion-no-margin'>${m}</p>`).join('');
      this.appUtils.presentAlert(alertMessage, '_ERROR');
      return false;
    }
    return true;
  }

  async assignCustomerId(application: JJTicketDistributionApplication) {
    let customer = await this.core.getCustomerByPhone(application.customerContactNo);
    if (!customer) {
      let randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      let response = await this.core.createCustomer({
        firstName: application.customerFirstName,
        lastName: application.customerLastName,
        email: '',
        phone: application.customerContactNo,
        password: randomPassword,
      });
      application.customer_id = response.doc_id;
      this.customer = {
        phone: application.customerContactNo,
        password: randomPassword,
      };
    } else {
      application.customer_id = customer.doc_id;
      this.customer = {
        phone: customer.phone,
      };
    }
    return application;
  }
}

const form: CmsForm = {
  code: 'ticket-distribution',
  labelPosition: 'stacked',
  submitButtonText: '_CONFIRM',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'merchant_id',
      label: {
        en: 'Merchant',
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
