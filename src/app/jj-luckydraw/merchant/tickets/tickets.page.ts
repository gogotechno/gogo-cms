import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJEvent, JJTicketDistribution } from '../../jj-luckydraw.type';
import { IssueTicketPage } from '../issue-ticket/issue-ticket.page';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  loaded: boolean;
  event: JJEvent;
  ticketDistributionPagination: Pagination;
  ticketDistributions: JJTicketDistribution[];
  noMoreTicketDistributions: boolean;

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreTicketDistributions = false;
    this.event = await this.lucky.getLastestEvent();
    await this.loadTicketDistributions();
    this.loaded = true;
  }

  async loadTicketDistributions() {
    this.ticketDistributionPagination = {
      itemsPerPage: 10,
      currentPage: 1
    }

    if (this.event?.doc_id) {
      this.ticketDistributions = await this.lucky.getTicketDistributionsByEvent(this.event.doc_id, this.ticketDistributionPagination);
    }
  }

  async loadMoreTicketDistributions(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.ticketDistributionPagination.currentPage += 1;
    let ticketDistributions = await this.lucky.getTicketDistributionsByEvent(this.event.doc_id, this.ticketDistributionPagination);
    this.ticketDistributions = [...this.ticketDistributions, ...ticketDistributions];
    this.noMoreTicketDistributions = ticketDistributions.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onIssueTicket() {
    const modal = await this.modalCtrl.create({
      component: IssueTicketPage
    })

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.loadData();
    }
  }

}
