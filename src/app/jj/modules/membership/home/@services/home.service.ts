import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CmsService } from 'src/app/cms.service';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import {
  Bulletin,
  BulletinGroup,
  EventConfig,
  JJAnnouncement,
  JJEvent,
  JJFab,
  JJSlideshow,
  JJWallet,
  MiniProgram,
  User,
  UserType,
} from 'src/app/jj/typings';
import { Conditions } from 'src/app/sws-erp.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends SharedComponent {
  private _USER: BehaviorSubject<User>;
  private _WALLETS: BehaviorSubject<JJWallet[]>;
  private _ONGOING_EVENTS: BehaviorSubject<JJEvent[]>;
  private _MINI_PROGRAMS: BehaviorSubject<MiniProgram[]>;
  private _ANNOUNCEMENTS: BehaviorSubject<JJAnnouncement[]>;
  private _SLIDESHOW: BehaviorSubject<JJSlideshow>;
  private _FABS: BehaviorSubject<JJFab[]>;
  private _BULLETINS: BehaviorSubject<Bulletin[]>;
  private _BULLETIN_GROUPS: BehaviorSubject<BulletinGroup[]>;
  private _EVENT_CONFIG: BehaviorSubject<EventConfig>;
  private _EVENT: BehaviorSubject<JJEvent>;
  private _GROUP_CODE: BehaviorSubject<string>;

  private allBulletins: Bulletin[];

  initialized: boolean;

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

  get bulletinGroups() {
    return this._BULLETIN_GROUPS.asObservable();
  }

  get bulletins() {
    return this._BULLETINS.asObservable();
  }

  get eventConfig() {
    return this._EVENT_CONFIG.asObservable();
  }

  get event() {
    return this._EVENT.asObservable();
  }

  get groupCode() {
    return this._GROUP_CODE.asObservable();
  }

  constructor(
    private cms: CmsService,
    private auth: AuthService,
    private common: CommonService,
    private core: CoreService,
  ) {
    super();
    this._USER = new BehaviorSubject(null);
    this._WALLETS = new BehaviorSubject(null);
    this._ONGOING_EVENTS = new BehaviorSubject(null);
    this._MINI_PROGRAMS = new BehaviorSubject(null);
    this._ANNOUNCEMENTS = new BehaviorSubject(null);
    this._SLIDESHOW = new BehaviorSubject(null);
    this._FABS = new BehaviorSubject(null);
    this._BULLETINS = new BehaviorSubject(null);
    this._BULLETIN_GROUPS = new BehaviorSubject(null);
    this._EVENT_CONFIG = new BehaviorSubject(null);
    this._EVENT = new BehaviorSubject(null);
    this._GROUP_CODE = new BehaviorSubject(null);

    this.auth.authStateChange.subscribe(async (event) => {
      if (!event) return;
      switch (event.status) {
        case 'LOGGED_IN':
          if (this.initialized && !this._USER.getValue()) {
            await this.init();
          }
          break;
        case 'LOGGED_OUT':
          this.destroy();
          break;
        default:
          break;
      }
    });
  }

  async init() {
    const [user, wallets, ongoingEvents, announcements, slideshow, fabs] = await Promise.all([
      this.auth.findMe(),
      this.auth.findMyWallets(),
      this.core.getOngoingEvents(this.defaultPage),
      this.core.getAnnouncements(),
      this.core.getSlideshowByCode('HOME_SLIDESHOW'),
      this.core.getFabsByGroupCode('HOME_FABS', this.getFabsConditions(false)),
    ]);

    this._USER.next(user);
    this._WALLETS.next(wallets);
    this._ONGOING_EVENTS.next(ongoingEvents);

    this._MINI_PROGRAMS.next(this.getMiniPrograms(this.auth.userType));

    this._ANNOUNCEMENTS.next(announcements);
    this._SLIDESHOW.next(slideshow);
    this._FABS.next(fabs);

    await this.loadBulletins();
  }

  destroy() {
    this._USER.next(null);
    this._WALLETS.next(null);
    this._ONGOING_EVENTS.next(null);
    this._MINI_PROGRAMS.next(null);
    this._ANNOUNCEMENTS.next(null);
    this._SLIDESHOW.next(null);
    this._FABS.next(null);
    this._BULLETIN_GROUPS.next(null);
    this._BULLETINS.next(null);
    this._EVENT_CONFIG.next(null);
    this._EVENT.next(null);
    this._GROUP_CODE.next(null);
  }

  async refresh() {
    const [wallets, fabs] = await Promise.all([
      this.auth.findMyWallets({ skipLoading: true }),
      this.core.getFabsByGroupCode('HOME_FABS', this.getFabsConditions(true)),
    ]);
    this._WALLETS.next(wallets);
    this._FABS.next(fabs);

    // let map = {
    //   wallets: [this._WALLETS, this.auth.findMyWallets(options)],
    //   fabs: [this._FABS, this.core.getFabsByGroupCode('HOME_FABS', this.getFabsConditions(), options)],
    // };
    // let keys = Object.keys(map);
    // let validKeys = areas.length ? keys.filter((key) => areas.includes(key)) : keys;
    // let properties = validKeys.map((key) => key);
    // let functions = validKeys.map((key) => map[key][1]);
    // let results = await Promise.all(functions);
    // for (let i = 0; i < results.length; i++) {
    //   let key = properties[i];
    //   let property = map[key][0];
    //   property.next(results[i]);
    // }
  }

  getMiniPrograms(role: UserType) {
    switch (role) {
      case 'MERCHANT':
        return MERCHANT_MINI_PROGRAMS;
      case 'ADMIN':
        return SYSTEM_MINI_PROGRAMS;
      default:
        return MINI_PROGRAMS;
    }
  }

  getFabsConditions(silent: boolean) {
    let fabsConditions: Conditions = {};
    if (this.auth.userType == 'CUSTOMER') {
      fabsConditions['customerId'] = this.auth.currentUser.doc_id;
    }
    if (silent) {
      fabsConditions['skipLoading'] = true;
    }
    return fabsConditions;
  }

  async loadBulletins() {
    const url = await this.cms.getDownloadURL('home-directory.json');
    const data = await this.common.getByUrl(url);

    const eventConfig = data.event;
    if (eventConfig) {
      const event = await this.core.getEventById(eventConfig.id);
      this._EVENT_CONFIG.next(eventConfig);
      this._EVENT.next(event);
    }

    const groups = data.groups;
    this._BULLETIN_GROUPS.next(groups);
    if (!this._GROUP_CODE.getValue()) {
      const groupCode = groups[0].code;
      this._GROUP_CODE.next(groupCode);
    }

    this.allBulletins = data.bulletins;
    await this.filterBulletins();
  }

  async filterBulletins(groupCode?: string) {
    if (!groupCode) {
      groupCode = this._GROUP_CODE.getValue();
    }

    this._GROUP_CODE.next(groupCode);

    const filtered = this.allBulletins.filter((bulletin) => {
      const tags = bulletin.tags?.length ? bulletin.tags.includes(groupCode) : true;
      const roles = bulletin.roles?.length ? bulletin.roles.includes(this.auth.userType) : true;
      return tags && roles;
    });

    this._BULLETINS.next(filtered);
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
