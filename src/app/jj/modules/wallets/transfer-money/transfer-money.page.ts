import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';
import { VerifyPinPage } from '../verify-pin/verify-pin.page';

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
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    this.toWalletNo = params.toWalletNo;

    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.toWallet = state?.wallet;
    }

    await this.loadData();
  }

  async loadData() {
    if (!this.toWallet) {
      this.toWallet = await this.core.getWalletByNo(this.toWalletNo);
    }
  }

  async onConfirm(data: TransferDto) {
    const confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_TRANSFER');
    if (!confirm) {
      return;
    }

    // let verified = await this.doVerification();
    // if (!verified) {
    //   return;
    // }

    const respnse = await this.core.createTransferRequest({
      refNo: '',
      amount: data.amount,
      description: data.description,
      fromWalletNo: this.walletNo,
      toWalletNo: this.toWalletNo,
    });
    // await this.appUtils.presentAlert('jj._TRANSFER_SUCCESS');
    await this.router.navigate(['/', 'jj', 'tansfer-receipt', respnse.data.refNo], {
      replaceUrl: true,
    });
  }

  async doVerification() {
    const modal = await this.modalCtrl.create({
      component: VerifyPinPage,
      componentProps: {
        walletNo: this.walletNo,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.success;
  }
}

const form: CmsForm = {
  code: 'transfer-money',
  labelPosition: 'stacked',
  submitButtonText: '_CONFIRM',
  submitButtonId: 'transfer-money-btn',
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
      precision: 2,
      required: true,
    },
    {
      code: 'description',
      label: {
        en: 'Description',
        zh: '详情',
        ms: 'Penerangan',
      },
      type: 'textarea',
      required: true,
      maximumLength: 50,
      counter: true,
    },
  ],
};

interface TransferDto {
  amount: number;
  description: string;
}
