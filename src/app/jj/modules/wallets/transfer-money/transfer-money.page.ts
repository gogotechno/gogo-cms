import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';
import { ErpTranslationPipe } from 'src/app/sws-erp.pipe';
import { HomeService as MemberHomeService } from '../../membership/home/@services/home.service';
import { WalletsService } from '../wallets.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.page.html',
  styleUrls: ['./transfer-money.page.scss'],
})
export class TransferMoneyPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  wallet: JJWallet;
  toWalletNo: string;
  toWallet: JJWallet;
  form = form;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private erpTranslate: ErpTranslationPipe,
    private memberHomeService: MemberHomeService,
    private walletsService: WalletsService,
    private appUtils: AppUtils,
    private core: CoreService,
    private common: CommonService,
  ) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    this.toWalletNo = params.toWalletNo;
    let state = this.router.getCurrentNavigation().extras.state;
    this.wallet = state?.['wallet'] || (await this.core.getWalletByNo(this.walletNo));
    this.toWallet = state?.['toWallet'] || (await this.core.getWalletByNo(this.toWalletNo));
    await this.calculateBalance();
  }

  async calculateBalance() {
    let currency = this.wallet.walletCurrency;
    if (currency) {
      let symbol = this.erpTranslate.transform(currency.symbol);
      let prefix = currency.symbolPosition == 'START' ? symbol : '';
      let postfix = currency.symbolPosition == 'END' ? symbol : '';
      let balanceText = `${prefix}${this.wallet.walletBalance}${postfix}`;
      let translation = await this.translate.get('jj._CAN_TRANSFER_UP_TO', { balance: balanceText }).toPromise();
      let amountField = this.form.items.find((item) => item.code == 'amount');
      amountField.hint = translation;
    }
  }

  async onConfirm(data: TransferDto) {
    if (data.amount > this.wallet.walletBalance) {
      await this.appUtils.presentAlert('jj._INSUFFICIENT_WALLET_BALANCE');
      return;
    }

    if (data.amount <= 0) {
      await this.appUtils.presentAlert('jj._AMOUNT_MUST_BE_MORE_THAN_ZERO');
      return;
    }

    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_TRANSFER');
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

    let response = await this.core.createTransferRequest({
      refNo: '',
      amount: data.amount,
      description: data.description,
      fromWalletNo: this.walletNo,
      toWalletNo: this.toWalletNo,
      fromWalletPin: verification.pin,
    });

    this.walletsService.transferSuccess.next(true);
    this.memberHomeService.refresh();

    await this.router.navigate(['/jj/wallets/transfer-receipt', response.data.refNo], {
      replaceUrl: true,
    });
  }
}

const form: CmsForm = {
  code: 'transfer-money',
  labelPosition: 'stacked',
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
      required: true,
      precision: 2,
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
