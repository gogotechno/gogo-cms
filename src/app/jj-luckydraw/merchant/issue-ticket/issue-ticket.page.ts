import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { SmsTemplateCode, SmsComponent } from '../../components/sms/sms.component';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJEvent, JJMerchant, JJTicketDistributionApplication } from '../../jj-luckydraw.type';

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

  success: boolean;

  constructor(private app: AppUtils, private lucky: JJLuckydrawService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.loaded = false;
    this.form = form;
    this.event = await this.lucky.getLastestEvent();
    this.merchant = await this.lucky.getMyMerchant();
    this.initValue();
    this.loaded = true;
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
    };
  }

  async onIssueTicket(application?: JJTicketDistributionApplication) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_ISSUE_TICKETS');
    if (confirm) {
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

  async assignCustomerId(application: JJTicketDistributionApplication) {
    const customer = await this.lucky.getCustomerByPhone(application.customerContactNo);
    if (!customer) {
      const randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      const phone = `${application.customerContactNo.includes('+60') ? '' : '+6'}${application.customerContactNo}`;
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

      this.lucky.customersChange.next({
        beUpdated: true,
      });
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
      required: true,
    },
    {
      code: 'customerLastName',
      label: {
        en: 'Customer Last Name',
        zh: '客户姓氏',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
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
      code: 'ticketCount',
      label: {
        en: 'Total of Tickets',
        zh: '抽奖券总数',
      },
      labelPosition: 'stacked',
      type: 'number',
      required: true,
      minimum: 1,
    },
  ],
};
