import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJEvent, JJWallet, MiniProgram, User } from 'src/app/jj/typings';

@Injectable()
export class HomeService {
  private _USER: BehaviorSubject<User>;
  private _WALLETS: BehaviorSubject<JJWallet[]>;
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _MINI_PROGRAMS: BehaviorSubject<MiniProgram[]>;

  get user() {
    return this._USER.asObservable();
  }

  get wallets() {
    return this._WALLETS.asObservable();
  }

  get ongoingEvents() {
    return this._ONGOING_EVENTS.asObservable();
  }

  get miniPrograms() {
    return this._MINI_PROGRAMS.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
    this._WALLETS = new BehaviorSubject<JJWallet[]>(null);
    this._ONGOING_EVENTS = new BehaviorSubject<JJEvent[]>(null);
    this._MINI_PROGRAMS = new BehaviorSubject<MiniProgram[]>(null);
  }

  async init() {
    const [user, wallets, ongoingEvents] = await Promise.all([
      this.auth.findMe(),
      this.auth.findMyWallets(),
      this.core.getOngoingEvents({ currentPage: 1, itemsPerPage: 10 }),
    ]);

    this._USER.next(user);
    this._WALLETS.next(wallets);
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
    link: '/jj/wallets',
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
