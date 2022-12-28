import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
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
    private route: ActivatedRoute,
    private router: Router,
    private appUtils: AppUtils,
    private core: CoreService,
    private auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this._form;
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: CreateBankAccountDto) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_ADD_BANK_INFO');
    if (!confirm) {
      return;
    }
    let account: JJBankAccount = data;
    switch (this.auth.userRole) {
      case 'CUSTOMER':
        account['customerId'] = this.auth.currentUser.doc_id;
        break;
      case 'MERCHANT_ADMIN':
        account['merchantId'] = await this.auth.findMyMerchantId();
        break;
      default:
        break;
    }
    await this.core.createBankAccount(account);
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

interface CreateBankAccountDto {
  accountNo: string;
  holderName: string;
  bank_id: number;
}
