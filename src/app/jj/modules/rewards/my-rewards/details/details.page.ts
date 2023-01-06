import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJTicket, JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage extends SharedComponent implements OnInit {
  backButtonText: string;
  distributionId: number;
  distribution: JJTicketDistribution;

  ticketsPage: Pagination;
  ticketsEnded: boolean;
  tickets: JJTicket[];

  constructor(private route: ActivatedRoute, private core: CoreService, private common: CommonService) {
    super();
  }

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.distributionId = params.id;
    await this.loadData();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async loadData() {
    this.distribution = await this.core.getTicketDistributionById(this.distributionId);
    this.ticketsPage = this.defaultPage;
    this.tickets = await this.getTickets();
    this.ticketsEnded = this.tickets.length < this.ticketsPage.itemsPerPage;
  }

  async getTickets() {
    const tickets = await this.core.getTickets(this.ticketsPage, {
      ticket_distribution_id: this.distributionId,
      ticket_distribution_id_type: '=',
    });
    return tickets;
  }

  async loadMoreTickets(event: Event) {
    this.ticketsPage.currentPage += 1;
    const incoming = await this.getTickets();
    this.tickets = [...this.tickets, ...incoming];
    this.ticketsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }
}
