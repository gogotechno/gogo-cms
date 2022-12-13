import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJWallet, WalletType } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { QrCodePage } from '../../common/qr-code/qr-code.page';
import { CreateDepositPage } from '../create-deposit/create-deposit.page';
import { Currency } from '../wallets.types';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  private _walletNo: string;

  wallet: JJWallet;
  actions = actions;
  displayCurrency: Currency = {
    code: 'MYR',
    displaySymbol: 'RM',
    precision: 2,
    symbolPosition: 'start',
  };
  createDepositPage: CreateDepositPage;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private jj: JJLuckydrawService,
  ) {
    this._walletNo = route.snapshot.params.walletNo;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    this.wallet = await this.jj.getWalletByNo(this._walletNo);
  }

  onActionClick(action: WalletAction) {
    if (!action.active) {
      return;
    }

    switch (action.code) {
      default:
        return this.openQrCode();
      case 'DEPOSIT':
        return this.openDeposit();
      case 'PIN':
        return this.openPIN();
      case 'TRANSFER':
        return this.openTRANSFER();
      case 'WITHDRAW':
        return this.openWITHDRAW();  
    }
  }

  async openDeposit() {
    // const modal = await this.modalCtrl.create({
    //   component: CreateDepositPage,
    // });

    // await modal.present();

    this.router.navigate(["/jj/wallets/create-deposit"]);
  }

  async openPIN() {
    this.router.navigate(["/jj/wallets/verify-pin"]);
  }

  async openTRANSFER() {
    this.router.navigate(["/jj/wallets/:walletNo/search-phone"]);
  }

  async openWITHDRAW() {
    this.router.navigate(["/jj/wallets/:walletNo/create-withdraw"]);
  }

  async openQrCode() {
    if (this.wallet.type != WalletType.CUSTOMER) {
      await this.appUtils.presentAlert('jj._THIS_WALLET_CANNOT_BE_USED_FOR_PAYMENT');
      return;
    }  

    const modal = await this.modalCtrl.create({
      component: QrCodePage,
      componentProps: {
        qrData: this.wallet.walletNo,
      },
      cssClass: 'qrcode-modal',
    });

    await modal.present();
  }
}

interface WalletAction {
  type: 'modal';
  nameKey: string;
  icon: string;
  code: string;
  active: boolean;
}

const actions: WalletAction[] = [
  {
    type: 'modal',
    nameKey: 'jj._DEPOSIT',
    icon: 'enter-outline',
    code: 'DEPOSIT',
    active: true,
  },
  {
    type: 'modal',
    nameKey: 'jj._WITHDRAW',
    icon: 'exit-outline',
    code: 'WITHDRAW',
    active: true,
  },
  {
    type: 'modal',
    nameKey: 'jj._TRANSFER',
    icon: 'arrow-redo-outline',
    code: 'TRANSFER',
    active: true,
  },
  {
    type: 'modal',
    nameKey: 'jj._STATEMENT',
    icon: 'document-text-outline',
    code: 'STATEMENT',
    active: false,
  },
  {
    type: 'modal',
    nameKey: 'jj._PIN',
    icon: 'keypad-outline',
    code: 'PIN',
    active: true,
  },
  {
    type: 'modal',
    nameKey: 'jj._QR_CODE',
    icon: 'qr-code-outline',
    code: 'QR_CODE',
    active: true,
  },
];
