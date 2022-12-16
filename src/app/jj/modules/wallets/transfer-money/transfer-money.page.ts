import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
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
  ) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    this.toWalletNo = params['toWalletNo'];

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

    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_TRANSFER');
    if (!confirm) {
      return;
    }

    let verified = await this.walletsService.verifyPin(this.wallet);
    if (!verified) {
      return;
    }

    await this.core.createTransferRequest({
      refNo: '',
      amount: data.amount,
      description: data.description,
      fromWalletNo: this.walletNo,
      toWalletNo: this.toWalletNo,
    });

    this.walletsService.walletChange.next(true);
    this.walletsService.walletsChange.next(true);
    this.memberHomeService.refresh();

    await this.appUtils.presentAlert('jj._TRANSFER_SUCCESS');
    await this.router.navigate(['../..'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
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
