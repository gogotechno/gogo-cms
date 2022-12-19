import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { JJWallet } from '../../typings';
import { CreatePinComponent } from './@components/create-pin/create-pin.component';
import { VerifyPinComponent } from './@components/verify-pin/verify-pin.component';

@Injectable()
export class WalletsService {
  walletChange: BehaviorSubject<boolean>;
  walletsChange: BehaviorSubject<boolean>;

  constructor(private modalCtrl: ModalController) {}

  verifyPin(wallet: JJWallet) {
    if (wallet.pin) {
      return this.openVerifyPin(wallet.walletNo);
    } else {
      return this.openCreatePin(wallet.doc_id);
    }
  }

  async openVerifyPin(walletNo: string) {
    const modal = await this.modalCtrl.create({
      component: VerifyPinComponent,
      componentProps: {
        walletNo: walletNo,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.success;
  }

  async openCreatePin(walletId: number) {
    const modal = await this.modalCtrl.create({
      component: CreatePinComponent,
      componentProps: {
        walletId: walletId,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data?.success;
  }
}
