import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DepositRequestStatus, JJWallet } from '../../typings';
import { CreatePinComponent } from './@components/create-pin/create-pin.component';
import { VerifyPinComponent } from './@components/verify-pin/verify-pin.component';

@Injectable()
export class WalletsService {
  transferSuccess: BehaviorSubject<boolean>;

  constructor(private modalCtrl: ModalController) {
    this.transferSuccess = new BehaviorSubject(null);
  }

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
    return data;
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
    return data;
  }

  getDepositStatusColor(status: DepositRequestStatus) {
    switch (status) {
      case 'DECLINED':
        return 'danger';
      case 'APPROVED':
        return 'success';
      case 'PROCESSING':
        return 'warning';
      default:
        return 'medium';
    }
  }
}
