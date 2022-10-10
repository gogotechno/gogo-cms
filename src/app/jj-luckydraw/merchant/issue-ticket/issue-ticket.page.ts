import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { Event, Merchant, TicketDistributionApplication } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.page.html',
  styleUrls: ['./issue-ticket.page.scss'],
})
export class IssueTicketPage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: TicketDistributionApplication;

  event: Event;
  merchant: Merchant;

  constructor(private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    this.loaded = false;

    this.form = form;

    this.event = await this.lucky.getLastestEvent();
    this.merchant = await this.lucky.getMyMerchant();
    this.value = {
      merchant_id: this.merchant?.doc_id,
      event_id: this.event?.doc_id,
      customerFirstName: "",
      customerLastName: "",
      customerContactNo: "",
      billNo: "",
      ticketCount: 0
    }

    this.loaded = true;
  }

  async onIssueTicket(event?: TicketDistributionApplication) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }


  }

}

const form: CmsForm = {
  code: "ticket-distribution",
  items: [
    {
      code: "merchant_id",
      label: {
        en: "Merchant",
        zh: "商家"
      },
      type: "number",
      required: true,
      hidden: true
    },
    {
      code: "event_id",
      label: {
        en: "Event",
        zh: "活动"
      },
      type: "number",
      required: true,
      hidden: true
    },
    {
      code: "customerFirstName",
      label: {
        en: "Customer First Name",
        zh: "客户名字"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "customerLastName",
      label: {
        en: "Customer Last Name",
        zh: "客户姓氏"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "customerContactNo",
      label: {
        en: "Customer Contact No",
        zh: "客户联络号码"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "billNo",
      label: {
        en: "Bill No",
        zh: "账单编号"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "ticketCount",
      label: {
        en: "Total of Tickets",
        zh: "抽奖券总数"
      },
      labelPosition: "stacked",
      type: "number",
      required: true,
      minimum: 1
    }
  ]
}
