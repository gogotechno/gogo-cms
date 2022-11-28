import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/jj/services';
import { JJMerchant, JJWallet, WalletType } from 'src/app/jj/typings';
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
  wallet: JJWallet;

  constructor(private auth: AuthService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.merchant = await this.auth.findMyMerchant();
    await this.getWallet();
  }

  async getWallet() {
    let wallets = await this.auth.findMyWallets();
    this.wallet = wallets.find((wallet) => wallet.type == WalletType.MERCHANT);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onCreateUser() {
    const modal = await this.modalCtrl.create({
      component: CreateUserPage,
    });
    await modal.present();
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage,
    });
    await modal.present();
  }

  async onCapturePayment() {
    const modal = await this.modalCtrl.create({
      component: CapturePaymentComponent,
      componentProps: {
        wallet: this.wallet,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.success) {
      await this.getWallet();
    }
  }
}
