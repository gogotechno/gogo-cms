import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJMerchant } from '../../jj-luckydraw.type';
import { CreateUserPage } from '../create-user/create-user.page';
import { IssueTicketPage } from '../issue-ticket/issue-ticket.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  loaded: boolean;
  merchant: JJMerchant;

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.merchant = await this.lucky.getMyMerchant(true);
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onCreateUser() {
    const modal = await this.modalCtrl.create({
      component: CreateUserPage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      // commented to fix users page keep loading after user creation issue
      // this.lucky.usersChange.next({
      //   beUpdated: true
      // });
    }
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      // commented to fix tickets page keep loading after ticket distribution issue
      // this.lucky.distributionsChange.next({
      //   beUpdated: true,
      // });
    }
  }
}
