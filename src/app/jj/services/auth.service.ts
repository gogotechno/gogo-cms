import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { AuthStateEvent, DocUser, GetExtraOptions, Pagination } from 'src/app/sws-erp.type';
import { AccountOptions, COMPANY_CODE, JJMerchant, JJWallet, User, UserType } from '../typings';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _AUTHENTICATED: boolean = false;
  private _CURRENT_USER: User;
  private _USER_TYPE: UserType;
  private initialized: boolean = false;

  authStateChange: BehaviorSubject<AuthStateEvent>;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  get currentUser() {
    return this._CURRENT_USER;
  }

  get userType() {
    return this._USER_TYPE;
  }

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private swsErp: SwsErpService,
    private appUtils: AppUtils,
    private core: CoreService,
  ) {
    this.authStateChange = new BehaviorSubject(null);
    this.swsErp.authStateChange.subscribe((event) => {
      if (event?.status == 'LOGGED_OUT') {
        this.signOut({ silent: true });
      }
    });
  }

  async init() {
    if (this.initialized) {
      return;
    }
    let refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
    if (refreshToken) {
      await this.swsErp.generateRefreshToken(refreshToken);
      await this.swsErp.generateAccessToken(this.swsErp.refreshToken);
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
      await this.findMe({ checkWallet: true });
      this.authStateChange.next({ status: 'LOGGED_IN' });
      this._AUTHENTICATED = true;
    }
    this.initialized = true;
  }

  async signInUser(email: string, password: string, rememberMe: boolean = true) {
    await this.swsErp.signInDocUser(email, password);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.swsErp.docUser);
    await this.findMyLuckyUser({ checkWallet: true });
    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
    }
    this.authStateChange.next({ status: 'LOGGED_IN' });
    this._AUTHENTICATED = true;
  }

  async signInCustomer(email: string, password: string, rememberMe: boolean = true) {
    await this.swsErp.signInUser('Customer', email, password);
    await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, this.swsErp.user);
    await this.findMyLuckyCustomer({ checkWallet: true });
    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
    }
    this.authStateChange.next({ status: 'LOGGED_IN' });
    this._AUTHENTICATED = true;
  }

  async signOut(options: { silent: boolean } = { silent: false }) {
    let confirm = options.silent;
    if (!confirm) {
      confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_LOGOUT');
    }
    if (confirm) {
      await this.storage.remove(`${COMPANY_CODE}_REFRESH_TOKEN`);
      await this.storage.remove(`${COMPANY_CODE}_DOC_USER`);
      await this.storage.remove(`${COMPANY_CODE}_CUSTOMER`);
      this._AUTHENTICATED = false;
      this._CURRENT_USER = null;
      this._USER_TYPE = null;
      await this.router.navigate(['/jj/login']);

      let authState = this.swsErp.authStateChange.getValue();
      if (!authState || authState.status != 'LOGGED_OUT') {
        this.swsErp.authStateChange.next({ status: 'LOGGED_OUT' });
      }

      this.authStateChange.next({ status: 'LOGGED_OUT' });
    }
  }

  async findMyLuckyUser(options: AccountOptions = {}) {
    this._CURRENT_USER = await this.core.getUserByDocUserId(this.swsErp.docUser.doc_id, options);
    this._CURRENT_USER.docUser = this.swsErp.docUser;
    this._USER_TYPE = 'MERCHANT';
    return this._CURRENT_USER;
  }

  async findMyLuckyCustomer(options: AccountOptions = {}) {
    this._CURRENT_USER = await this.core.getCustomerById(this.swsErp.user.doc_id, options);
    this._USER_TYPE = 'CUSTOMER';
    return this._CURRENT_USER;
  }

  async findMe(options: AccountOptions = {}) {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    let customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
    if (docUser) {
      await this.swsErp.findMyDocUser(docUser.doc_id, true, true, true);
      await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.swsErp.docUser);
      await this.findMyLuckyUser(options);
    }
    if (customer) {
      await this.swsErp.findMyUser('Customer', customer.doc_id);
      await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, this.swsErp.user);
      await this.findMyLuckyCustomer(options);
    }
    return this._CURRENT_USER;
  }

  async findMyMerchantId() {
    let docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    let access = docUser?.user_access?.find((ua) => ua.access_table === 'merchant');
    return access ? Number(access.access_val) : null;
  }

  async findMyWallets(options: GetExtraOptions = {}) {
    let wallets: JJWallet[];
    switch (this._USER_TYPE) {
      case 'MERCHANT':
        let merchantId = await this.findMyMerchantId();
        wallets = await this.core.getWalletsByMerchantId(merchantId, options);
        break;
      default:
        let customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
        wallets = await this.core.getWalletsByCustomerId(customer.doc_id, options);
        break;
    }
    return wallets;
  }

  updateMe(payload: Partial<User>) {
    let userId = this._CURRENT_USER.doc_id;
    switch (this._USER_TYPE) {
      case 'MERCHANT':
        return this.core.updateUser(userId, payload);
      default:
        return this.core.updateCustomer(userId, payload);
    }
  }

  changePassword(oldPassword: string, newPassword: string) {
    let requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    switch (this._USER_TYPE) {
      case 'MERCHANT':
        return this.updateMe(requestBody);
      default:
        let customerId = this._CURRENT_USER.doc_id;
        return this.swsErp.changePassword(customerId, requestBody, 'Customer');
    }
  }

  async findMyJoinedEvents(pagination: Pagination) {
    switch (this._USER_TYPE) {
      case 'MERCHANT':
        return [];
      default:
        let customerId = this._CURRENT_USER.doc_id;
        let events = await this.core.getEvents(pagination, {
          isJoined: true,
          customerId: customerId,
        });
        return events;
    }
  }

  async findMyMerchant() {
    let merchantId = await this.findMyMerchantId();
    let merchant = await this.swsErp.getDoc<JJMerchant>('Merchant', merchantId, {
      withSummary: true,
    });
    return this.core.populateMerchant(merchant);
  }
}
