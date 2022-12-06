import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import {
  JJAnnouncement,
  JJEvent,
  JJFab,
  JJSlideshow,
  JJUser,
  JJWallet,
  MiniProgram,
  User,
  UserRole,
  UserType,
} from 'src/app/jj/typings';
import { Conditions } from 'src/app/sws-erp.type';

@Injectable()
export class HomeService extends SharedComponent {
  private _USER: BehaviorSubject<User>;
  private _WALLETS: BehaviorSubject<JJWallet[]>;
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _MINI_PROGRAMS: BehaviorSubject<MiniProgram[]>;
  private _ANNOUNCEMENTS: BehaviorSubject<JJAnnouncement[]>;
  private _SLIDESHOW: BehaviorSubject<JJSlideshow>;
  private _FABS: BehaviorSubject<JJFab[]>;

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

  get announcements() {
    return this._ANNOUNCEMENTS.asObservable();
  }

  get slideshow() {
    return this._SLIDESHOW.asObservable();
  }

  get fabs() {
    return this._FABS.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    super();
    this._USER = new BehaviorSubject<User>(null);
    this._WALLETS = new BehaviorSubject<JJWallet[]>(null);
    this._ONGOING_EVENTS = new BehaviorSubject<JJEvent[]>(null);
    this._MINI_PROGRAMS = new BehaviorSubject<MiniProgram[]>(null);
    this._ANNOUNCEMENTS = new BehaviorSubject<JJAnnouncement[]>(null);
    this._SLIDESHOW = new BehaviorSubject<JJSlideshow>(null);
    this._FABS = new BehaviorSubject<JJFab[]>(null);

    this.auth.authStateChange.subscribe(async (event) => {
      if (event?.status == 'LOGGED_IN' && !this._USER.getValue()) {
        await this.init();
      }
      if (event?.status == 'LOGGED_OUT') {
        this.destroy();
      }
    });
  }

  async init() {
    let fabsConditions: Conditions = {};
    if (this.auth.userType == 'CUSTOMER') {
      fabsConditions = {
        customerId: this.auth.currentUser.doc_id,
      };
    }

    const [user, wallets, ongoingEvents, announcements, slideshow, fabs] = await Promise.all([
      this.auth.findMe(),
      this.auth.findMyWallets(),
      this.core.getOngoingEvents(this.defaultPage),
      this.core.getAnnouncements(),
      this.core.getSlideshowByCode('HOME_SLIDESHOW'),
      this.core.getFabsByGroupCode('HOME_FABS', fabsConditions),
    ]);

    this._USER.next(user);
    this._WALLETS.next(wallets);
    this._ONGOING_EVENTS.next(ongoingEvents);

    let role = this.getRole(this.auth.userType, <JJUser>user);
    this._MINI_PROGRAMS.next(this.getMiniPrograms(role));

    this._ANNOUNCEMENTS.next(announcements);
    this._SLIDESHOW.next(slideshow);
    this._FABS.next(fabs);
  }

  destroy() {
    this._USER.next(null);
    this._WALLETS.next(null);
    this._ONGOING_EVENTS.next(null);
    this._MINI_PROGRAMS.next(null);
    this._ANNOUNCEMENTS.next(null);
    this._SLIDESHOW.next(null);
  }

  getRole(userType: UserType, user: JJUser) {
    if (userType == 'MERCHANT') {
      switch (user.role) {
        case UserRole.MERCHANT_ADMIN:
          return 'MERCHANT';
        default:
          return 'SYSTEM';
      }
    }
    return 'CUSTOMER';
  }

  getMiniPrograms(role: string) {
    switch (role) {
      case 'MERCHANT':
        return MERCHANT_MINI_PROGRAMS;
      case 'SYSTEM':
        return SYSTEM_MINI_PROGRAMS;
      default:
        return MINI_PROGRAMS;
    }
  }
}

const MINI_PROGRAMS: MiniProgram[] = [
  {
    name: JSON.stringify({
      en: 'JJ Reward',
      zh: 'JJ福利',
      ms: 'JJ Ganjaran',
    }),
    icon: 'gift',
    link: '/jj/rewards',
    colors: {
      primary: '#FFC000',
      'primary-light': '#FFF2CC',
    },
  },
  {
    name: JSON.stringify({
      en: 'JJ Wallet',
      zh: 'JJ钱包',
      ms: 'JJ Dompet',
    }),
    icon: 'wallet',
    link: '/jj/wallets',
  },
];

const MERCHANT_MINI_PROGRAMS: MiniProgram[] = [
  {
    name: JSON.stringify({
      en: 'JJ Merchant',
      zh: 'JJ门市',
      ms: 'JJ Pedagang',
    }),
    icon: 'storefront',
    link: '/jj/merchant',
    colors: {
      primary: '#70AD47',
      'primary-light': '#E2F0D9',
    },
  },
  {
    name: JSON.stringify({
      en: 'JJ Wallet',
      zh: 'JJ钱包',
      ms: 'JJ Dompet',
    }),
    icon: 'wallet',
    link: '/jj/wallets',
  },
];

const SYSTEM_MINI_PROGRAMS: MiniProgram[] = [
  {
    name: JSON.stringify({
      en: 'JJ Admin',
      zh: 'JJ管理员',
      ms: 'JJ Pentadbir',
    }),
    icon: 'tv',
    link: '/jj/admin',
    colors: {
      primary: '#FF0000',
      'primary-light': '#FFC9C9',
    },
  },
];
