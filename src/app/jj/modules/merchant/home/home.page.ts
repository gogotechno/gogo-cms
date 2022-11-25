import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/jj/services';
import { JJMerchant } from 'src/app/jj/typings';
import { IssueTicketPage } from '../issue-ticket/issue-ticket.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  merchant: JJMerchant;

  constructor(private auth: AuthService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.merchant = await this.auth.findMyMerchant();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onCreateUser() {
    // const modal = await this.modalCtrl.create({
    //   component: CreateUserPage,
    // });
    // await modal.present();
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage,
    });
    await modal.present();
  }
}
