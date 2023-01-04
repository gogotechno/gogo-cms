import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWallet, JJWithdrawMethod, JJWithdrawRequest } from 'src/app/jj/typings';
import { HomeService as MemberHomeService } from '../../membership/home/@services/home.service';
import { WalletsService } from '../wallets.service';
import { ChooseBankAccountComponent } from './@components/choose-bank-account/choose-bank-account.component';

@Component({
  selector: 'app-create-withdraw',
  templateUrl: './create-withdraw.page.html',
  styleUrls: ['./create-withdraw.page.scss'],
})
export class CreateWithdrawPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  wallet: JJWallet;
  form = form;
  value: Partial<JJWithdrawRequest>;
  methods: JJWithdrawMethod[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private common: CommonService,
    private core: CoreService,
    private walletsService: WalletsService,
    private memberHomeService: MemberHomeService,
  ) {}

  async ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.core.getWalletByNo(this.walletNo);
    this.methods = await this.core.getWithdrawMethods();
    const methodField = this.form.items.find((item) => item.code == 'withdraw_method_id');
    methodField.options = this.methods.map((method) => ({
      code: String(method.doc_id),
      label: method.name,
      disabled: !method.isActive,
    }));
    this.value = {
      walletNo: this.walletNo,
      amount: null,
      description: null,
      withdraw_method_id: null,
    };
  }

  async onConfirm(data: JJWithdrawRequest) {
    let method = this.methods.find((method) => method.doc_id == data.withdraw_method_id);
    switch (method.code) {
      case 'BANK_TRANSFER':
        let bankId = await this.chooseBankAccount();
        if (!bankId) {
          return;
        }
        data.bank_account_id = bankId;
        break;
      case 'SELF_PICKUP':
        break;
      default:
        break;
    }

    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_WITHDRAW');
    if (!confirm) {
      return;
    }

    let verification = await this.walletsService.verifyPin(this.wallet);
    let verified = verification?.success;
    if (!verified) {
      return;
    }

    if (!this.wallet.pin) {
      this.wallet.pin = verification.pin;
    }

    data.refNo = '';
    data.walletPin = verification.pin;
    let response = await this.core.createWithdrawRequest(data);

    this.walletsService.transferSuccess.next(true);
    this.memberHomeService.refresh();

    await this.router.navigate(['../withdraws', response.data.refNo], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  async chooseBankAccount() {
    const modal = await this.modalCtrl.create({
      component: ChooseBankAccountComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.bankId;
  }
}

const form: CmsForm = {
  code: 'create-withdraw',
  labelPosition: 'stacked',
  submitButtonId: 'create-withdraw-btn',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
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
      code: 'withdraw_method_id',
      label: 'jj._METHODS',
      type: 'radio',
      required: true,
      direction: 'vertical',
    },
  ],
};
