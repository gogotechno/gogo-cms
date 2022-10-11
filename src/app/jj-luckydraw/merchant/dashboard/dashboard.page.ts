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

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.loaded = false;
    this.merchant = await this.lucky.getMyMerchant();
    this.loaded = true;
  }

  async onCreateUser() {
    const modal = await this.modalCtrl.create({
      component: CreateUserPage
    })

    await modal.present();
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage
    })

    await modal.present();
  }

}
