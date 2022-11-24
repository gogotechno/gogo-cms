import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, CoreService } from 'src/app/jj/services';
import { User } from 'src/app/jj/typings';

@Injectable()
export class AccountService {
  private _USER: BehaviorSubject<User>;

  get user() {
    return this._USER.asObservable();
  }

  constructor(private auth: AuthService, private core: CoreService) {
    this._USER = new BehaviorSubject<User>(null);
  }

  async init() {
    const [user] = await Promise.all([this.auth.findMe()]);

    this._USER.next(user);
  }
}
