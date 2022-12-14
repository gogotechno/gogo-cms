import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJTicket, JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Injectable()
export class DetailsService extends SharedComponent {
  private DISTRIBUTION$: BehaviorSubject<JJTicketDistribution>;
  private TICKETS$: BehaviorSubject<JJTicket[]>;
  private _tickets: JJTicket[];

  distributionId: number;
  ticketsPage: Pagination;
  ticketsEnded: boolean;

  get distribution() {
    return this.DISTRIBUTION$.asObservable();
  }

  get tickets() {
    return this.TICKETS$.asObservable();
  }

  constructor(private core: CoreService) {
    super();
    this.DISTRIBUTION$ = new BehaviorSubject(null);
    this.TICKETS$ = new BehaviorSubject(null);
  }

  async init() {
    this.ticketsPage = this.defaultPage;

    const [distribution, tickets] = await Promise.all([
      this.core.getTicketDistributionById(this.distributionId),
      this.getTickets(),
    ]);

    this._tickets = tickets;
    this.ticketsEnded = this._tickets.length < this.ticketsPage.itemsPerPage;

    this.DISTRIBUTION$.next(distribution);
    this.TICKETS$.next(this._tickets);
  }

  destroy() {
    this.DISTRIBUTION$.next(null);
    this.TICKETS$.next(null);
  }

  private async getTickets() {
    const tickets = await this.core.getTickets(this.ticketsPage, {
      ticket_distribution_id: this.distributionId,
      ticket_distribution_id_type: '=',
    });
    return tickets;
  }

  async loadMoreTickets(event: Event) {
    this.ticketsPage.currentPage += 1;
    const incoming = await this.getTickets();
    this._tickets = [...this._tickets, ...incoming];
    this.ticketsEnded = incoming.length <= 0;
    this.TICKETS$.next(this._tickets);
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }
}
