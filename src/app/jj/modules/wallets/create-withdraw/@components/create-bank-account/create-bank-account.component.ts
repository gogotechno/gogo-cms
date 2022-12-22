import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.scss'],
})
export class CreateBankAccountComponent extends SharedComponent implements OnInit {
  form: CmsForm;

  constructor(private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  ngOnInit() {
    this.form = this._form;
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  get _form(): CmsForm {
    return {
      code: 'create-bank-account',
      labelPosition: 'stacked',
      autoValidate: true,
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
