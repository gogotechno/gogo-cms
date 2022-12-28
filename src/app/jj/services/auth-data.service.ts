import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { DocUser } from 'src/app/sws-erp.type';
import { COMPANY_CODE, User, UserRole } from '../typings';

@Injectable()
export class AuthDataService {
  private _CURRENT_USER: User;
  private _USER_ROLE: UserRole;

  constructor(private storage: LocalStorageService) {}

  getCurrentUser() {
    return this._CURRENT_USER;
  }

  setCurrentUser(user: User) {
    this._CURRENT_USER = user;
  }

  getUserRole() {
    return this._USER_ROLE;
  }

  setUserRole(role: UserRole) {
    this._USER_ROLE = role;
  }

  async findMyMerchantId() {
    const docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    const access = docUser?.user_access?.find((ua) => ua.access_table === 'merchant');
    return access ? Number(access.access_val) : null;
  }
}
