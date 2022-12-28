import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.page.html',
  styleUrls: ['./create-deposit.page.scss'],
})
export class CreateDepositPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  form = form;
  value: CreateDepositDto;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    await this.loadData();
  }

  async loadData() {
    const methods = await this.core.getDepositMethods();
    const methodField = this.form.items.find((item) => item.code == 'methodId');
    methodField.options = methods.map((method) => ({
      code: String(method.doc_id),
      label: method.name,
      disabled: !method.isActive,
    }));
    this.value = {
      walletNo: this.walletNo,
      amount: null,
      description: null,
      methodId: null,
    };
  }

  async onConfirm(data: CreateDepositDto) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_DEPOSIT');
    if (!confirm) {
      return;
    }
    let response = await this.core.createDepositRequest({
      refNo: '',
      amount: data.amount,
      description: data.description,
      deposit_method_id: data.methodId,
      walletNo: this.walletNo,
    });
    await this.router.navigate(['../deposits', response.data.refNo], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}

const form: CmsForm = {
  code: 'create-deposit',
  labelPosition: 'stacked',
  submitButtonId: 'create-deposit-btn',
  autoValidate: true,
  items: [
    {
      code: 'walletNo',
      label: 'jj._WALLET_NO',
      type: 'text',
      required: true,
      readonly: true,
    },
    {
      code: 'amount',
      label: 'jj._AMOUNT',
      placeholder: '0.00',
      type: 'number',
      precision: 2,
      required: true,
    },
    {
      code: 'description',
      label: 'jj._DESCRIPTION',
      type: 'textarea',
      required: true,
    },
    {
      code: 'methodId',
      label: 'jj._METHODS',
      type: 'radio',
      required: true,
      direction: 'vertical',
    },
  ],
};

interface CreateDepositDto {
  walletNo: string;
  amount: number;
  description: string;
  methodId: number;
}
