import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { QrCodePage } from 'src/app/jj/modules/common/qr-code/qr-code.page';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, User, WalletType } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss'],
})
export class AccountBarComponent extends SharedComponent implements OnInit {
  user: User;
  wallet: JJWallet;
  greetingKey: string;

  constructor(private modalCtrl: ModalController, private appUtils: AppUtils, private home: HomeService) {
    super();
  }

  ngOnInit() {
    this.greetingKey = this.getGreeting();
    this.home.user.subscribe((user) => (this.user = user));
    this.home.wallets.subscribe((wallets) => {
      this.wallet = wallets ? wallets.find((wallet) => wallet.walletType?.canPay) : null;
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
