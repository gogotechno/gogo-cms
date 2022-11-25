import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from 'src/app/jj/services';
import { JJEvent, JJEventPrize } from 'src/app/jj/typings';

@Injectable()
export class DetailsService {
  eventId: number;
  private _EVENT: BehaviorSubject<JJEvent>;

  get event() {
    return this._EVENT.asObservable();
  }

  constructor(private core: CoreService) {
    this._EVENT = new BehaviorSubject<JJEvent>(null);
  }

  async init() {
    const [event] = await Promise.all([this.core.getEventById(this.eventId)]);

    this._EVENT.next(event);
  }
}
