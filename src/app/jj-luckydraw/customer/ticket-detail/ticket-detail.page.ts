import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJTicket, JJTicketDistribution } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  segment: 'details' | 'tickets';
  loaded: boolean;
  ticketDistributionId: number;
  ticketDistribution: JJTicketDistribution;
  ticketPagination: Pagination;
  tickets: JJTicket[];
  noMoreTickets: boolean;

  constructor(private route: ActivatedRoute, private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    this.segment = 'details';
    const params = this.route.snapshot.params;
    this.ticketDistributionId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreTickets = false;
    this.ticketDistribution = await this.lucky.getTicketDistributionById(this.ticketDistributionId);
    await this.loadTickets();
    this.loaded = true;
  }

  async loadTickets() {
    this.ticketPagination = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.tickets = await this.lucky.getTicketsByTicketDistribution(this.ticketDistributionId, this.ticketPagination);
    this.noMoreTickets = this.tickets.length < this.ticketPagination.itemsPerPage;
  }

  async loadMoreTickets(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.ticketPagination.currentPage += 1;
    const tickets = await this.lucky.getTicketsByTicketDistribution(this.ticketDistributionId, this.ticketPagination);
    this.tickets = [...this.tickets, ...tickets];
    this.noMoreTickets = tickets.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }
}
