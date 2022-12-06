import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import { JJContentPage, JJWallet, User } from 'src/app/jj/typings';

@Injectable()
export class AccountService {
  private _USER: BehaviorSubject<User>;
  private _WALLETS: BehaviorSubject<JJWallet[]>;
  private _CONTENT_PAGES: BehaviorSubject<JJContentPage[]>;
  private _WHATSAPP_LINK: BehaviorSubject<string>;

  get user() {
    return this._USER.asObservable();
  }

  get wallets() {
    return this._WALLETS.asObservable();
  }

  get contentPages() {
    return this._CONTENT_PAGES.asObservable();
  }

  get whatsappLink() {
    return this._WHATSAPP_LINK.asObservable();
  }

  constructor(private auth: AuthService, private common: CommonService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
    this._WALLETS = new BehaviorSubject<JJWallet[]>(null);
    this._CONTENT_PAGES = new BehaviorSubject<JJContentPage[]>(null);
    this._WHATSAPP_LINK = new BehaviorSubject<string>(null);
  }

  async init() {
    const [user, wallets, contentPages, whatsappLink] = await Promise.all([
      this.auth.findMe(),
      this.auth.findMyWallets(),
      this.core.getContentPagesByGroupCode('SETTINGS_MENU'),
      this.common.getWhatsapp(),
    ]);

    this._USER.next(user);
    this._WALLETS.next(wallets);
    this._CONTENT_PAGES.next(contentPages);
    this._WHATSAPP_LINK.next(whatsappLink);
  }

  destroy() {
    this._USER.next(null);
    this._WALLETS.next(null);
    this._CONTENT_PAGES.next(null);
  }
}
