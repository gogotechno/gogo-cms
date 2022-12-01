import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJWallet, WalletType } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { QrCodePage } from '../../common/qr-code/qr-code.page';
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

  constructor(
    route: ActivatedRoute,
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
    }
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
    active: false,
  },
  {
    type: 'modal',
    nameKey: 'jj._WITHDRAW',
    icon: 'exit-outline',
    code: 'WITHDRAW',
    active: false,
  },
  {
    type: 'modal',
    nameKey: 'jj._TRANSFER',
    icon: 'arrow-redo-outline',
    code: 'TRANSFER',
    active: false,
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
    active: false,
  },
  {
    type: 'modal',
    nameKey: 'jj._QR_CODE',
    icon: 'qr-code-outline',
    code: 'QR_CODE',
    active: true,
  },
];
