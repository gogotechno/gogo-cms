import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJBankAccount } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.page.html',
  styleUrls: ['./create-bank-account.page.scss'],
})
export class CreateBankAccountPage extends SharedComponent implements OnInit {
  form: CmsForm;
  eventId: number;
  accountId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private core: CoreService,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this._form;
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: JJBankAccount) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_ADD_BANK_INFO');
    if (!confirm) {
      return;
    }
    await this.core.createBankAccount(data);
    await this.appUtils.presentAlert('jj._ACCOUNT_ADDED', '_SUCCESS');
    await this.router.navigate(['/jj/account/bank-accounts'], {
      replaceUrl: true,
      queryParams: {
        refresh: true,
      },
    });
  }

  get _form(): CmsForm {
    return {
      code: 'create-bank-account',
      labelPosition: 'stacked',
      autoValidate: true,
      submitButtonId: 'create-bank-btn',
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
