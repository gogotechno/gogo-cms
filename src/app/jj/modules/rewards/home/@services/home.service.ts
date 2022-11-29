import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJCustomer, JJEvent, JJSlideshow, JJWinner } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Injectable()
export class HomeService extends SharedComponent {
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _WINNERS: BehaviorSubject<JJWinner[]>;
  private _CUSTOMER: BehaviorSubject<JJCustomer>;
  private _SLIDESHOW: BehaviorSubject<JJSlideshow>;

  get ongoingEvents() {
    return this._ONGOING_EVENTS.asObservable();
  }

  get winners() {
    return this._WINNERS.asObservable();
  }

  get customer() {
    return this._CUSTOMER.asObservable();
  }

  get slideshow() {
    return this._SLIDESHOW.asObservable();
  }

  private eventsPage: Pagination;
  private winnersPage: Pagination;

  constructor(private auth: AuthService, private core: CoreService) {
    super();
    this._ONGOING_EVENTS = new BehaviorSubject<JJEvent[]>(null);
    this._WINNERS = new BehaviorSubject<JJWinner[]>(null);
    this._CUSTOMER = new BehaviorSubject<JJCustomer>(null);
    this._SLIDESHOW = new BehaviorSubject<JJSlideshow>(null);
  }

  async init() {
    this.eventsPage = this.defaultPage;
    this.winnersPage = {
      ...this.defaultPage,
      itemsPerPage: 32,
    };

    const [events, winners, customer, slideshow] = await Promise.all([
      this.core.getOngoingEvents(this.eventsPage, { withLocation: true }),
      this.core.getWinners(this.winnersPage),
      this.auth.findMe(),
      this.core.getSlideshowByCode('REWARDS_SLIDESHOW'),
    ]);

    this._ONGOING_EVENTS.next(events);
    this._WINNERS.next(winners);
    this._CUSTOMER.next(<JJCustomer>customer);
    this._SLIDESHOW.next(slideshow);
  }

  destroy() {
    this._ONGOING_EVENTS.next(null);
    this._WINNERS.next(null);
    this._CUSTOMER.next(null);
    this._SLIDESHOW.next(null);
  }
}
