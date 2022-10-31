import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItem, CmsFormItemOption } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { SmsTemplateCode, SmsComponent } from '../../components/sms/sms.component';
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

  constructor(private router: Router, private app: AppUtils, private lucky: JJLuckydrawService, private modalCtrl: ModalController, private translate: TranslateService) { }

  async ngOnInit() {
    this.loaded = false;
    this.form = form;
    this.event = await this.lucky.getLastestEvent();
    this.merchant = await this.lucky.getMyMerchant();
    await this.initForm();
    this.initValue();
    this.loaded = true;
  }

  async initForm() {
    let expenseField = this.form.items.find((item) => item.code == 'expense');
    if(this.event.minSpend) expenseField.minimum = Number(this.event.minSpend);

    let products = await this.lucky.getProducts();
    let productField = this.form.items.find((item) => item.code == 'product_id');
    productField.options = products.map((product) => {
      let item: CmsFormItemOption = {
        code: product.doc_id.toString(),
        label: product.nameTranslation,
      };
      return item;
    });
  }

  initValue() {
    this.value = {
      merchant_id: this.merchant?.doc_id,
      event_id: this.event?.doc_id,
      customerFirstName: '',
      customerLastName: '',
      customerContactNo: '',
      billNo: '',
      ticketCount: 0,
      customer_id: 0,
      expense: 0
    };
  }

  async onIssueTicket(application?: JJTicketDistributionApplication) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    const ticketCount = this.countTicket(application);
    let confrmMsg = await this.translate.get('jj-luckydraw._CONFIRM_TO_ISSUE_TICKETS', { count: ticketCount }).toPromise();
    let confirm = await this.app.presentConfirm(confrmMsg);
    if (confirm) {
      application.ticketCount = ticketCount;
      await this.assignCustomerId(application);
      await this.lucky.issueTickets(this.cmsForm.removeUnusedKeys('swserp', application));
      await this.app.presentAlert('jj-luckydraw._TICKETS_ISSUED', '_SUCCESS');
      if (this.smsComponent._body) {
        this.smsComponent.send();
      }
      this.cmsForm.resetForm();
      this.success = true;
      this.onDismiss();
    }
  }

  countTicket(application: JJTicketDistributionApplication) {
    const minSpend = this.event.minSpend || application.expense;
    return Math.floor(application.expense / minSpend);
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

      application.customer_id = response.doc_id;

      this.smsComponent._body = {
        phone: phone,
        password: randomPassword,
      };
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
      type: 'number',
      required: true,
      hidden: true,
    },
    {
      code: 'customerFirstName',
      label: {
        en: 'Customer First Name',
        zh: '客户名字',
      },
      labelPosition: 'stacked',
      type: 'text',
      // required: true,
    },
    {
      code: 'customerLastName',
      label: {
        en: 'Customer Last Name',
        zh: '客户姓氏',
      },
      labelPosition: 'stacked',
      type: 'text',
      // required: true,
    },
    {
      code: 'customerContactNo',
      label: {
        en: 'Customer Contact No',
        zh: '客户联络号码',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    },
    {
      code: 'billNo',
      label: {
        en: 'Bill No',
        zh: '账单编号',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    },
    {
      code: 'expense',
      label: {
        en: 'Expenses Amount (RM)',
        zh: '消费合计 (RM)',
      },
      labelPosition: 'stacked',
      type: 'number',
      required: true,
      minimum: 1
    },
    {
      code: 'product_id',
      label: {
        en: 'Product',
        zh: '产品',
      },
      labelPosition: 'stacked',
      type: 'select'
    },
    // {
    //   code: 'ticketCount',
    //   label: {
    //     en: 'Total of Tickets',
    //     zh: '抽奖券总数',
    //   },
    //   labelPosition: 'stacked',
    //   type: 'number',
    //   required: true,
    //   minimum: 1,
    // },
  ],
};
