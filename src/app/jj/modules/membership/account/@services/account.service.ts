import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJContentPage, JJWallet, User } from 'src/app/jj/typings';

@Injectable()
export class AccountService {
  private _USER: BehaviorSubject<User>;
  private _WALLETS: BehaviorSubject<JJWallet[]>;
  private _CONTENT_PAGES: BehaviorSubject<JJContentPage[]>;

  get user() {
    return this._USER.asObservable();
  }

  get wallets() {
    return this._WALLETS.asObservable();
  }

  get contentPages() {
    return this._CONTENT_PAGES.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
    this._WALLETS = new BehaviorSubject<JJWallet[]>(null);
    this._CONTENT_PAGES = new BehaviorSubject<JJContentPage[]>(null);
  }

  async init() {
    const [user, wallets, contentPages] = await Promise.all([
      this.auth.findMe(),
      this.auth.findMyWallets(),
      this.core.getContentPagesByGroupCode('SETTINGS_MENU'),
    ]);

    this._USER.next(user);
    this._WALLETS.next(wallets);
    this._CONTENT_PAGES.next(contentPages);
  }

  destroy() {
    this._USER.next(null);
    this._WALLETS.next(null);
    this._CONTENT_PAGES.next(null);
  }
}
