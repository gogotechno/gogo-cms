import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJEvent } from 'src/app/jj/typings';

@Injectable()
export class DetailsService {
  eventId: number;
  private _EVENT: BehaviorSubject<JJEvent>;

  get event() {
    return this._EVENT.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._EVENT = new BehaviorSubject<JJEvent>(null);
  }

  async init() {
    let currentUser = this.auth.currentUser;

    const [event] = await Promise.all([
      this.core.getEventById(this.eventId, {
        hasFk: true,
        withLocation: true,
        withSummary: true,
        customerId: currentUser.doc_id,
      }),
    ]);

    this._EVENT.next(event);
  }

  destroy() {
    this.eventId = null;
    this._EVENT.next(null);
  }
}
