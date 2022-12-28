import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { AuthStateEvent, Conditions, DocUser, Pagination } from 'src/app/sws-erp.type';
import { GetProfileOptions, COMPANY_CODE, JJMerchant, JJWallet, User, UserRole, UserType } from '../typings';
import { AuthDataService } from './auth-data.service';
import { CoreService } from './core.service';

@Injectable()
export class AuthService {
  private _AUTHENTICATED = false;
  private initialized = false;

  authStateChange: BehaviorSubject<AuthStateEvent>;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  get currentUser() {
    return this.authData.getCurrentUser();
  }

  get userRole() {
    return this.authData.getUserRole();
  }

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private swsErp: SwsErpService,
    private appUtils: AppUtils,
    private authData: AuthDataService,
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
    const refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
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
      this.authData.setCurrentUser(null);
      this.authData.setUserRole(null);
      await this.router.navigate(['/jj/login']);

      const authState = this.swsErp.authStateChange.getValue();
      if (!authState || authState.status != 'LOGGED_OUT') {
        this.swsErp.authStateChange.next({ status: 'LOGGED_OUT' });
      }

      this.authStateChange.next({ status: 'LOGGED_OUT' });
    }
  }

  async findMyLuckyUser(options: GetProfileOptions = {}) {
    let currenctUser = await this.core.getUserByDocUserId(this.swsErp.docUser.doc_id, <Conditions>options);
    currenctUser.docUser = this.swsErp.docUser;
    this.authData.setCurrentUser(currenctUser);
    this.authData.setUserRole(currenctUser.role);
    if (!this.authData.getUserRole()) {
      this.authData.setUserRole('SYSTEM_ADMIN');
    }
    return currenctUser;
  }

  async findMyLuckyCustomer(options: GetProfileOptions = {}) {
    let currenctUser = await this.core.getCustomerById(this.swsErp.user.doc_id, <Conditions>options);
    this.authData.setCurrentUser(currenctUser);
    this.authData.setUserRole('CUSTOMER');
    return currenctUser;
  }

  async findMe(options: GetProfileOptions = {}) {
    const docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    const customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
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
    return this.currentUser;
  }

  async findMyMerchantId() {
    let merchantId = await this.authData.findMyMerchantId();
    return merchantId;
  }

  async findMyWallets(conditions: Conditions = {}) {
    let wallets: JJWallet[];
    switch (this.userRole) {
      case 'MERCHANT_ADMIN':
        let merchantId = await this.findMyMerchantId();
        wallets = await this.core.getWalletsByMerchantId(merchantId, conditions);
        break;
      case 'CUSTOMER':
        let customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
        wallets = await this.core.getWalletsByCustomerId(customer.doc_id, conditions);
        break;
      default:
        wallets = [];
        break;
    }
    return wallets;
  }

  updateMe(payload: Partial<User>) {
    const userId = this.currentUser.doc_id;
    switch (this.userRole) {
      case 'FINANCE_ADMIN':
      case 'MERCHANT_ADMIN':
      case 'SYSTEM_ADMIN':
        return this.core.updateUser(userId, payload);
      default:
        return this.core.updateCustomer(userId, payload);
    }
  }

  changePassword(oldPassword: string, newPassword: string) {
    const requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    switch (this.userRole) {
      case 'FINANCE_ADMIN':
      case 'MERCHANT_ADMIN':
      case 'SYSTEM_ADMIN':
        return this.updateMe(requestBody);
      default:
        const customerId = this.currentUser.doc_id;
        return this.swsErp.changePassword(customerId, requestBody, 'Customer');
    }
  }

  async findMyJoinedEvents(pagination: Pagination) {
    switch (this.userRole) {
      case 'FINANCE_ADMIN':
      case 'MERCHANT_ADMIN':
      case 'SYSTEM_ADMIN':
        return [];
      default:
        const customerId = this.currentUser.doc_id;
        const events = await this.core.getEvents(pagination, {
          isJoined: true,
          customer_id: customerId,
        });
        return events;
    }
  }

  async findMyMerchant() {
    const merchantId = await this.findMyMerchantId();
    const merchant = await this.swsErp.getDoc<JJMerchant>('Merchant', merchantId, {
      withSummary: true,
    });
    return this.core.populateMerchant(merchant);
  }

  async findMyBankAccounts(pagination: Pagination) {
    let conditions: Conditions = {};
    switch (this.userRole) {
      case 'FINANCE_ADMIN':
      case 'SYSTEM_ADMIN':
        conditions['isSystem'] = true;
        break;
      case 'MERCHANT_ADMIN':
        conditions['merchant_id'] = await this.findMyMerchantId();
        break;
      default:
        conditions['customer_id'] = this.currentUser.doc_id;
        break;
    }
    const accounts = await this.core.getBankAccounts(pagination, conditions);
    return accounts;
  }
}
