import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/jj/services';
import { JJMerchant, JJWallet } from 'src/app/jj/typings';
import { QrCodePage } from '../../common/qr-code/qr-code.page';
import { CreateUserPage } from '../create-user/create-user.page';
import { IssueTicketPage } from '../issue-ticket/issue-ticket.page';
import { CapturePaymentComponent } from './@components/capture-payment/capture-payment.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  merchant: JJMerchant;
  wallets: JJWallet[];

  constructor(private modalCtrl: ModalController, private menuCtrl: MenuController, private auth: AuthService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }

  async loadData() {
    this.merchant = await this.auth.findMyMerchant();
    await this.getWallets();
  }

  async getWallets() {
    this.wallets = await this.auth.findMyWallets();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onCreateUser() {
    const modal = await this.modalCtrl.create({
      component: CreateUserPage,
      componentProps: {
        pageType: 'modal',
      },
    });
    await modal.present();
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage,
    });
    await modal.present();
  }

  async onCapturePayment(wallet: JJWallet) {
    const modal = await this.modalCtrl.create({
      component: CapturePaymentComponent,
      componentProps: {
        wallet: wallet,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      await this.getWallets();
    }
  }

  async openQrCode(wallet: JJWallet) {
    const modal = await this.modalCtrl.create({
      component: QrCodePage,
      componentProps: {
        qrData: wallet.walletNo,
      },
      cssClass: 'qrcode-modal',
    });
    await modal.present();
  }
}
