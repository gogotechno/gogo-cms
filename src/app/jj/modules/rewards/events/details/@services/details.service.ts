import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent, JJTicket } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Injectable()
export class DetailsService extends SharedComponent {
  eventId: number;
  private EVENT$: BehaviorSubject<JJEvent>;
  private TICKETS$: BehaviorSubject<JJTicket[]>;
  private _tickets: JJTicket[];
  private ticketsPage: Pagination;
  ticketsEnded: boolean;

  get event() {
    return this.EVENT$.asObservable();
  }

  get tickets() {
    return this.TICKETS$.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    super();
    this.EVENT$ = new BehaviorSubject(null);
    this.TICKETS$ = new BehaviorSubject(null);
  }

  async init() {
    this.ticketsPage = this.defaultPage;
    const [event, tickets] = await Promise.all([
      this.getEvent(), 
      this.getTickets()
    ]);
    this._tickets = tickets;
    this.ticketsEnded = this._tickets.length < this.ticketsPage.itemsPerPage;
    this.EVENT$.next(event);
    this.TICKETS$.next(this._tickets);
  }

  destroy() {
    this.eventId = null;
    this.EVENT$.next(null);
    this.TICKETS$.next(null);
  }

  private getEvent() {
    const events = this.core.getEventById(this.eventId, {
      hasFk: true,
      withSummary: true,
      withLocation: true,
      customer_id: this.auth.currentUser.doc_id,
    });
    return events;
  }

  private async getTickets() {
    const tickets = await this.core.getTickets(this.ticketsPage, {
      event_id: this.eventId,
      event_id_type: '=',
      customer_id: this.auth.currentUser.doc_id,
      customer_id_type: '=',
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
