import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/jj/services';
import { JJEvent, JJWinner } from 'src/app/jj/typings';

@Injectable()
export class HomeService {
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _WINNERS: BehaviorSubject<JJWinner[]>;

  get ongoingEvents() {
    return this._ONGOING_EVENTS.asObservable();
  }

  get winners() {
    return this._WINNERS.asObservable();
  }

  constructor(private core: CoreService) {
    this._ONGOING_EVENTS = new BehaviorSubject<JJEvent[]>(null);
    this._WINNERS = new BehaviorSubject<JJWinner[]>(null);
  }

  async init() {
    const [events, winners] = await Promise.all([
      this.core.getOngoingEvents({ itemsPerPage: 10, currentPage: 1 }),
      this.core.getWinners({ itemsPerPage: 32, currentPage: 1 }),
    ]);

    this._ONGOING_EVENTS.next(events);
    this._WINNERS.next(winners);
  }
}
