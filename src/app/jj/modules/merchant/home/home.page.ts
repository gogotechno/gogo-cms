import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
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
    await this.getWallet();
  }

  async getWallet() {
    const wallets = await this.auth.findMyWallets();
    this.wallet = wallets.find((wallet) => wallet.type == 'MERCHANT');
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
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
