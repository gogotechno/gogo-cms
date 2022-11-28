import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJContentPage, User } from 'src/app/jj/typings';

@Injectable()
export class AccountService {
  private _USER: BehaviorSubject<User>;
  private _CONTENT_PAGES: BehaviorSubject<JJContentPage[]>;

  get user() {
    return this._USER.asObservable();
  }

  get contentPages() {
    return this._CONTENT_PAGES.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
    this._CONTENT_PAGES = new BehaviorSubject<JJContentPage[]>(null);
  }

  async init() {
    const [user, contentPages] = await Promise.all([
      this.auth.findMe(),
      this.core.getContentPagesByGroupCode('SETTINGS_MENU'),
    ]);

    this._USER.next(user);
    this._CONTENT_PAGES.next(contentPages);
  }
}
