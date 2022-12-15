import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { QrCodePage } from 'src/app/jj/modules/common/qr-code/qr-code.page';
import { JJWallet, WalletType } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'wallet-cards',
  templateUrl: './wallet-cards.component.html',
  styleUrls: ['./wallet-cards.component.scss'],
})
export class WalletCardsComponent implements OnInit {
  wallets: JJWallet[];
  wallet: JJWallet;

  constructor(private modalCtrl: ModalController, private appUtils: AppUtils, private home: HomeService) {}

  ngOnInit() {
    this.home.wallets.subscribe((wallets) => {
      if (!wallets) return;
      this.wallets = wallets;
      this.wallet = wallets.find((wallet) => wallet.walletType?.canPay);
    });
  }

  async openQrCode() {
    if (!this.wallet) {
      await this.appUtils.presentAlert('jj._NO_WALLET_CAN_BE_USED_FOR_PAYMENT');
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
