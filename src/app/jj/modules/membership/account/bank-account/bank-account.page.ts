import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { JJBankAccount } from 'src/app/jj/typings';
import { CommonService, CoreService } from 'src/app/jj/services';
import { Pagination } from 'src/app/sws-erp.type';
import { SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage extends SharedComponent implements OnInit {
  backButtonText: string;
  form: CmsForm;
  bank: any;
  accountId: number;
  accounts: JJBankAccount[];

  constructor(
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private app: AppUtils,
    private core: CoreService,
    private common: CommonService,
  ) {
    super();
  }

  async ngOnInit() {
    this.form = this._form;
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.accountId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.bank = await this.core.getBankAccountById(this.accountId);
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_UPDATE_BANK_INFO');
    if (!confirm) {
      return;
    }
    await this.core.updateBankAccount(this.accountId, data);
    await this.appUtils.presentAlert('jj._ACCOUNT_UPDATED', '_SUCCESS');
  }

  get _form(): CmsForm {
    return {
      code: 'edit-bank-account',
      labelPosition: 'stacked',
      autoValidate: true,
      submitButtonId: 'update-bank-btn',
      autoRemoveUnusedKeys: 'swserp',
      items: [
        {
          code: 'accountNo',
          label: 'jj._ACCOUNT_NO',
          type: 'text',
          required: true,
        },
        {
          code: 'holderName',
          label: 'jj._HOLDER_NAME',
          type: 'text',
          required: true,
        },
        {
          code: 'bank_id',
          label: 'jj._BANK',
          type: 'select',
          required: true,
          searchable: true,
          selectConfig: {
            labelFields: ['name'],
            codeFields: ['doc_id'],
          },
          selectHandler: {
            onInit: async (value: number) => {
              let bank = await this.core.getBankById(value);
              return [bank];
            },
            onLoad: async () => {
              let pagination: Pagination = this.defaultPage;
              let banks = await this.core.getBanks(pagination);
              return [banks, pagination];
            },
            onScrollToEnd: async (pagination: Pagination) => {
              let banks = await this.core.getBanks(pagination);
              return [banks, pagination];
            },
          },
        },
      ],
    };
  }
}
