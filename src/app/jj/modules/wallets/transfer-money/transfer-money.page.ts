import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.page.html',
  styleUrls: ['./transfer-money.page.scss'],
})
export class TransferMoneyPage implements OnInit {
  walletNo: string;
  toWalletNo: string;
  toWallet: JJWallet;
  form = form;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appUtils: AppUtils,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    this.toWalletNo = params['toWalletNo'];

    let state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.toWallet = state?.['wallet'];
    }

    await this.loadData();
  }

  async loadData() {
    if (!this.toWallet) {
      this.toWallet = await this.core.getWalletByNo(this.toWalletNo);
    }
  }

  async onConfirm(data: TransferDto) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_TRANSFER');
    if (confirm) {
      await this.core.createTransferRequest({
        fromWalletNo: this.walletNo,
        toWalletNo: this.toWalletNo,
        amount: data.amount,
        description: data.description,
      });
      await this.appUtils.presentAlert('jj._TRANSFER_SUCCESS');
    }
  }
}

const form: CmsForm = {
  code: 'transfer-money',
  labelPosition: 'stacked',
  submitButtonText: '_CONFIRM',
  autoValidate: true,
  items: [
    {
      code: 'amount',
      label: {
        en: 'Amount',
        zh: '金额',
        ms: 'Jumlah',
      },
      placeholder: '0.00',
      type: 'number',
      required: true,
    },
    {
      code: 'description',
      label: {
        en: 'Description',
        zh: '详情',
        ms: 'Penerangan',
      },
      type: 'text',
    },
  ],
};

interface TransferDto {
  amount: number;
  description: string;
}
