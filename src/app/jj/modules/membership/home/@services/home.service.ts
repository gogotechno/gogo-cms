import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJEvent, MiniProgram, User } from 'src/app/jj/typings';

@Injectable()
export class HomeService {
  private _USER: BehaviorSubject<User>;
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _MINI_PROGRAMS: BehaviorSubject<MiniProgram[]>;

  get user() {
    return this._USER.pipe(skip(1));
  }

  get ongoingEvents() {
    return this._ONGOING_EVENTS.pipe(skip(1));
  }

  get miniPrograms() {
    return this._MINI_PROGRAMS.pipe(skip(1));
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
    this._ONGOING_EVENTS = new BehaviorSubject<JJEvent[]>(null);
    this._MINI_PROGRAMS = new BehaviorSubject<MiniProgram[]>(null);
  }

  async init() {
    const [user, ongoingEvents] = await Promise.all([
      this.auth.findMe(),
      this.core.getOngoingEvents({ currentPage: 1, itemsPerPage: 10 }),
    ]);

    this._USER.next(user);
    this._ONGOING_EVENTS.next(ongoingEvents);
    this._MINI_PROGRAMS.next(MINI_PROGRAMS);
  }
}

const MINI_PROGRAMS: MiniProgram[] = [
  {
    name: JSON.stringify({
      en: 'JJ Reward',
      zh: 'JJ福利',
    }),
    icon: 'gift',
    link: '/jj/rewards',
  },
  {
    name: JSON.stringify({
      en: 'JJ Wallet',
      zh: 'JJ钱包',
    }),
    icon: 'wallet',
    link: '/jj/wallet',
  },
  {
    name: JSON.stringify({
      en: 'JJ Merchant',
      zh: 'JJ门市',
    }),
    icon: 'storefront',
    link: '/jj/merchant',
  },
];
