import { Component, OnInit } from '@angular/core';
import { AlertButton, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import {
  CapturePaymentRequestExtras,
  IssueMode,
  JJEvent,
  JJMerchant,
  JJTicketDistributionApplication,
} from 'src/app/jj/typings';
import { HomeService as MemberHomeService } from '../../membership/home/@services/home.service';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {
  form: CmsForm;
  value: Partial<JJTicketDistributionApplication>;
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
    private common: CommonService,
    private memberHome: MemberHomeService,
  ) {}

  async ngOnInit() {
    this.form = form;
    await this.initForm();
  }

  async initForm() {
    const products = await this.core.getProducts();
    const productField = this.form.items.find((item) => item.code == 'product_id');
    productField.options = products.map((product) => ({
      code: String(product.doc_id),
      label: product.nameTranslation,
    }));

    const events = await this.core.getMerchantEvents();
    const eventField = this.form.items.find((item) => item.code == 'event_id');
    eventField.options = events.map((event) => ({
      code: String(event.doc_id),
      label: event.nameTranslation,
    }));

    this.event = events[0];

    this.merchant = await this.auth.findMyMerchant();

    this.value = {
      merchant_id: this.merchant ? String(this.merchant.doc_id) : null,
      event_id: this.event ? String(this.event.doc_id) : null,
      customerContactNo: null,
      customerFirstName: null,
      customerLastName: null,
      expense: 0,
      pointExpense: 0,
      product_id: null,
    };
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
    const valid = await this.validateApplication(application);
    if (!valid) {
      return;
    }

    const params = {
      count: application.ticketCount,
      point: application.freePoint,
      snwCount: application.freeSnwTickets,
    };
    const confirmMessage = await this.translate.get('jj._CONFIRM_TO_ISSUE_TICKETS', params).toPromise();
    const confirm = await this.appUtils.presentConfirm(confirmMessage);
    if (confirm) {
      application = await this.assignCustomerId(application);
      const res = await this.core.issueTickets(application);
      const paymentInfo: CapturePaymentRequestExtras = res.data.paymentInfo;

      const buttons: AlertButton[] = [];
      if (paymentInfo) {
        buttons.push({
          text: await this.translate.get('jj._SEND_PAYMENT').toPromise(),
          handler: () => {
            this.common.sendSms(paymentInfo.customerInfo.customer.phone, 'CAPTURE_PAYMENT', {
              refNo: paymentInfo.customerInfo.transaction.refNo,
              amount: paymentInfo.request.amount,
              currentBalance: paymentInfo.customerInfo.currentBalance,
            });
            return false;
          },
        });
      }

      if (this.customer.password) {
        buttons.push({
          text: await this.translate.get('jj._NOTIFY_NEW_CUSTOMER').toPromise(),
          handler: () => {
            this.common.sendSms(this.customer.phone, 'CUSTOMER_NEW_PASSWORD', {
              phone: this.customer.phone,
              password: this.customer.password,
            });
            return false;
          },
        });
      }

      await this.appUtils.presentAlert('jj._TICKETS_ISSUED', '_SUCCESS', {
        buttons: [
          {
            text: await this.translate.get('jj._SEND_DISTRIBUTON').toPromise(),
            handler: () => {
              this.common.sendSms(this.customer.phone, 'TICKET_DISTRIBUTION', {
                ticketCount: application.ticketCount,
                freePoints: application.freePoint,
                freeSnwTickets: application.freeSnwTickets,
              });
              return false;
            },
          },
          ...buttons,
          {
            text: await this.translate.get('_CLOSE').toPromise(),
            role: 'cancel',
            handler: () => {
              this.customer = null;
              this.success = true;
              this.memberHome.refresh();
              this.onDismiss();
              return true;
            },
          },
        ],
      });
    }
  }

  async countTicket(application: JJTicketDistributionApplication) {
    this.event = await this.core.getEventById(Number(application.event_id));
    const minSpend = this.event.minSpend || application.expense;
    application.ticketCount = Math.floor(application.expense / minSpend) || 0;
    return application;
  }

  private getTotalSpend(application: JJTicketDistributionApplication, issueMode: IssueMode) {
    return issueMode == IssueMode.AMOUNT_PAID ? application.expense : +application.expense + +application.pointExpense;
  }

  async countFreePoint(application: JJTicketDistributionApplication) {
    const rule = await this.core.getActivePointRule(
      Number(application.event_id),
      application.expense,
      application.pointExpense,
    );
    if (rule) {
      const totalSpend = this.getTotalSpend(application, rule.issueMode);
      application.freePoint = rule.freePoint * Math.floor(totalSpend / rule.minimumSpend) || 0;
      application.usedPointRule = JSON.stringify(rule);
    } else {
      application.freePoint = 0;
    }
    return application;
  }

  async countFreeSnwTickets(application: JJTicketDistributionApplication) {
    const rule = await this.core.getActiveSnwRule(
      Number(application.event_id),
      application.expense,
      application.pointExpense,
    );
    if (rule) {
      const totalSpend = this.getTotalSpend(application, rule.issueMode);
      application.freeSnwTickets = rule.freeTickets * Math.floor(totalSpend / rule.minimumSpend) || 0;
      application.usedSnwRule = JSON.stringify(rule);
    } else {
      application.freeSnwTickets = 0;
    }
    return application;
  }

  async validateApplication(application: JJTicketDistributionApplication) {
    if (application.ticketCount == 0 && application.freePoint == 0 && application.freeSnwTickets == 0) {
      const errorMessages: string[] = [];

      const expenseField = this.form.items.find((item) => item.code == 'expense');
      const expenseParams = { min: this.event.minSpend || 1, label: this.cmsTranslate.transform(expenseField.label) };
      const expenseMessage = await this.translate.get('_REQUIRES_MINIMUM', expenseParams).toPromise();
      errorMessages.push(expenseMessage);

      const alertMessage = errorMessages.map((m) => `<p class='ion-no-margin'>${m}</p>`).join('');
      this.appUtils.presentAlert(alertMessage, '_ERROR');
      return false;
    }
    return true;
  }

  async assignCustomerId(application: JJTicketDistributionApplication) {
    const customer = await this.core.getCustomerByPhone(application.customerContactNo);
    if (!customer) {
      const randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      const response = await this.core.createCustomer({
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
        ms: 'Pedagang',
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
        ms: 'Acara',
      },
      type: 'select',
      required: true,
    },
    {
      code: 'customerContactNo',
      label: {
        en: 'Customer Contact No',
        zh: '客户联络号码',
        ms: 'Nombor Hubungan Pelanggan',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'customerFirstName',
      label: {
        en: 'Customer First Name',
        zh: '客户名字',
        ms: 'Nama Pertama Pelanggan',
      },
      type: 'text',
    },
    {
      code: 'customerLastName',
      label: {
        en: 'Customer Last Name',
        zh: '客户姓氏',
        ms: 'Nama Terakhir Pelanggan',
      },
      type: 'text',
    },
    {
      code: 'billNo',
      label: {
        en: 'Bill No',
        zh: '账单编号',
        ms: 'No Bil',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'expense',
      label: {
        en: 'Expenses Amount (RM)',
        zh: '消费合计 (RM)',
        ms: 'Jumlah Digunakan (RM)',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'pointExpense',
      label: {
        en: 'Point Expenses Amount',
        zh: '消费积分',
        ms: 'Jumlah Mata Digunakan',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'product_id',
      label: {
        en: 'Product',
        zh: '产品',
        ms: 'Produk',
      },
      type: 'select',
    },
  ],
};
