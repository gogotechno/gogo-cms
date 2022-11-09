import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItemOption } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { SmsTemplateCode, SmsComponent } from '../../jj-luckydraw-ui/sms/sms.component';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJEvent, JJMerchant, JJProduct, JJTicketDistributionApplication } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {
  SmsTemplateCode = SmsTemplateCode;

  @ViewChild(FormComponent) cmsForm: FormComponent;
  @ViewChild(SmsComponent) smsComponent: SmsComponent;

  loaded: boolean;

  form: CmsForm;
  value: JJTicketDistributionApplication;

  event: JJEvent;
  merchant: JJMerchant;
  products: JJProduct[];

  success: boolean;

  constructor(
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
    this.initValue();
    this.loaded = true;
  }

  async initForm() {
    let products = await this.lucky.getProducts();
    let productField = this.form.items.find((item) => item.code == 'product_id');
    productField.options = products.map((product) => {
      let item: CmsFormItemOption = {
        code: product.doc_id.toString(),
        label: product.nameTranslation,
      };
      return item;
    });

    let events = await this.lucky.getActiveMerchantEvent();
    let eventField = this.form.items.find((item) => item.code == 'event_id');
    eventField.options = events.map((event) => {
      let item: CmsFormItemOption = {
        code: event.doc_id.toString(),
        label: event.nameTranslation,
      };
      return item;
    });
    this.event = events[0];
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
      paidAmount: 0,
      paidPoint: 0,
      product_id: null,
      ticketCount: 0,
      customer_id: 0,
    };
  }

  async onIssueTicket(application?: JJTicketDistributionApplication) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    application.ticketCount = await this.countTicket(application);
    let valid = await this.validateApplication(application);
    if (!valid) {
      return;
    }

    let confirmMessage = await this.translate
      .get('jj-luckydraw._CONFIRM_TO_ISSUE_TICKETS', { count: application.ticketCount })
      .toPromise();
    let confirm = await this.app.presentConfirm(confirmMessage);

    if (confirm) {
      await this.assignCustomerId(application);
      await this.lucky.issueTickets(this.cmsForm.removeUnusedKeys('swserp', application));
      await this.app.presentAlert('jj-luckydraw._TICKETS_ISSUED', '_SUCCESS');
      this.smsComponent.send();
      this.cmsForm.resetForm();
      this.success = true;
      this.onDismiss();
    }
  }

  async countTicket(application: JJTicketDistributionApplication) {
    this.event = await this.lucky.getEventById(Number(application.event_id));
    let minSpend = this.event.minSpend || application.expense;
    return Math.floor(application.expense / minSpend) || 0;
  }

  async validateApplication(application: JJTicketDistributionApplication) {
    if (application.ticketCount == 0) {
      let expenseField = this.form.items.find((item) => item.code == 'expense');
      let message = await this.translate
        .get('_REQUIRES_MINIMUM', {
          min: this.event.minSpend || '1',
          label: this.cmsTranslate.transform(expenseField.label),
        })
        .toPromise();
      this.app.presentAlert("<p class='ion-no-margin'>" + message + '</p>', '_ERROR');
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
      this.smsComponent.setReceiver(phone);
      this.smsComponent.setData({ phone: phone, password: randomPassword });
      application.customer_id = response.doc_id;
    } else {
      application.customer_id = customer.doc_id;
    }
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
    // {
    //   code: 'paidAmount',
    //   label: {
    //     en: 'Paid Amount (RM)',
    //     zh: '已付金额 (RM)',
    //   },
    //   type: 'number',
    // },
    // {
    //   code: 'paidPoint',
    //   label: {
    //     en: 'Paid Point (P)',
    //     zh: '已付点数 (分)',
    //   },
    //   type: 'number',
    // },
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
