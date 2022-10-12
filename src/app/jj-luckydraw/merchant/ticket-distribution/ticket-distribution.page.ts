import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJTicket, JJTicketDistribution } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-ticket-distribution',
  templateUrl: './ticket-distribution.page.html',
  styleUrls: ['./ticket-distribution.page.scss'],
})
export class TicketDistributionPage implements OnInit {

  segment: "details" | "tickets";
  loaded: boolean;
  ticketDistributionId: number;
  ticketDistribution: JJTicketDistribution;
  ticketPagination: Pagination;
  tickets: JJTicket[];
  noMoreTickets: boolean;

  constructor(private route: ActivatedRoute, private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    this.segment = "details";
    let params = this.route.snapshot.params;
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
    }

    this.tickets = await this.lucky.getTicketsByTicketDistribution(this.ticketDistributionId, this.ticketPagination);
  }

  async loadMoreTickets(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.ticketPagination.currentPage += 1;
    let tickets = await this.lucky.getTicketsByTicketDistribution(this.ticketDistributionId, this.ticketPagination);
    this.tickets = [...this.tickets, ...tickets];
    this.noMoreTickets = tickets.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

}
