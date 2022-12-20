import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWithdrawMethod } from 'src/app/jj/typings';
import { ChooseBankAccountComponent } from './@components/choose-bank-account/choose-bank-account.component';

@Component({
  selector: 'app-create-withdraw',
  templateUrl: './create-withdraw.page.html',
  styleUrls: ['./create-withdraw.page.scss'],
})
export class CreateWithdrawPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  form = form;
  value: CreateWithdrawDto;
  withdrawMethods: JJWithdrawMethod[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
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
    this.withdrawMethods = await this.core.getWithdrawMethods();
    const methodField = this.form.items.find((item) => item.code == 'withdrawMethodId');
    methodField.options = this.withdrawMethods.map((method) => ({
      code: String(method.doc_id),
      label: method.name,
      disabled: !method.isActive,
    }));

    this.value = {
      walletNo: this.walletNo,
      amount: null,
      withdrawMethodId: null,
    };
  }

  async onConfirm(data: CreateWithdrawDto) {
    console.log(data);
    let withdrawMethod = this.withdrawMethods.find((method) => method.doc_id == data.withdrawMethodId);
    switch (withdrawMethod.code) {
      case 'BANK_TRANSFER':
        await this.chooseBankAccount();
        break;
      case 'SELF_PICKUP':
        break;
      default:
        let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_WITHDRAW');
        if (!confirm) {
          return;
        }
        // CREATE WITHDRAW
        break;
    }
  }

  async chooseBankAccount() {
    const modal = await this.modalCtrl.create({
      component: ChooseBankAccountComponent,
    });
    await modal.present();
  }
}
const form: CmsForm = {
  code: 'create-withdraw',
  labelPosition: 'stacked',
  submitButtonId: 'create-withdraw-btn',
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
      code: 'withdrawMethodId',
      label: 'jj._METHOD',
      type: 'radio',
      required: true,
      direction: 'vertical',
    },
  ],
};
interface CreateWithdrawDto {
  walletNo: string;
  amount: number;
  withdrawMethodId: number;
}
