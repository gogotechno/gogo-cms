import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage implements OnInit {
  form: CmsForm;
  bank: any;
  eventId: number;

  constructor(
    private route: ActivatedRoute, 
    private appUtils: AppUtils,
    private app: AppUtils,
    ) { }

  ngOnInit() {
    this.form = bankAccountForm;
    this.bank = {
      accountNo: '1234 5432 5678',
      holderName: 'TAN AH KAU',
      bank_id: "1",
    }
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_UPDATE_BANK_INFO');
    if (!confirm) return;
    console.log(data);
  }

}

const bankAccountForm: CmsForm = {
  code: 'add-bank-account',
  labelPosition: 'stacked',
  submitButtonText: '_UPDATE',
  // autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'accountNo',
      label: {
        en: 'Bank Account Number',
        zh: '银行户口号码',
        ms: 'Nombor Akaun Bank',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'holderName',
      label: {
        en: 'Bank Account Name',
        zh: '银行户口名字',
        ms: 'Nama Akaun Bank',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'bank_id',
      label: {
        en: 'Bank',
        zh: '银行',
        ms: 'Bank',
      },
      type: 'select',
      required: true,
      options: [
        {
          code: "1",
          label: "_MAYBANK"
        },
        {
          code: "2",
          label: "_HONG_LEONG_BANK"
        },
        {
          code: "3",
          label: "_CIMB_BANK"
        }
      ]
    },
  ],
};

