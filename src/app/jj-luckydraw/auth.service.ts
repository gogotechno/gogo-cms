import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppUtils } from '../cms.util';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { JJLuckydrawService } from './jj-luckydraw.service';
import { COMPANY_CODE, UserType, JJCustomer, JJUser } from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _AUTHENTICATED: boolean = false;
  private _CURRENT_USER: JJUser | JJCustomer;
  private _USER_ROLE: UserType;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  get currentUser() {
    return this._CURRENT_USER;
  }

  get userRole() {
    return this._USER_ROLE;
  }

  initialized: boolean = false;

  authChange: BehaviorSubject<AuthEvent>;

  constructor(
    private http: HttpClient,
    private app: AppUtils,
    private erp: SwsErpService,
    private lucky: JJLuckydrawService,
    private storage: LocalStorageService,
    private router: Router,
  ) {
    this.authChange = new BehaviorSubject<AuthEvent>(null);
    this.erp.authStateChange.subscribe((ev) => {
      if (ev?.status == 'LOGGED_OUT') {
        this.signOut(true);
      }
    });
  }

  /**
   * Process authentication initialization
   * @returns Returns if initialized
   */
  async init() {
    if (this.initialized) return;

    let refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
    if (refreshToken) {
      await this.erp.generateRefreshToken(refreshToken);
      await this.erp.generateAccessToken(this.erp.refreshToken);
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.refreshToken);
      await this.findMe();
      this._AUTHENTICATED = true;
    }

    this.initialized = true;
  }

  /**
   * Sign in with email and password
   * @param email User's email
   * @param password User's password
   * @param rememberMe Flag if user wish to keep logged-in
   */
  async signInWithEmailAndPassword(email: string, password: string, rememberMe: boolean = true) {
    await this.erp.signInWithEmailAndPassword(email, password);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.docUser);
    await this.findMyLuckyUser();

    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.refreshToken);
    }

    this._AUTHENTICATED = true;
  }

  /**
   * Sign in with key and password
   * @param email Customer's phone
   * @param password Customer's password
   * @param rememberMe Flag if user wish to keep logged-in
   */
  async signInCustomer(email: string, password: string, rememberMe: boolean = true) {
    const customer = await this.erp.signInCustomer('Customer', email, password);
    await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, customer);
    this._CURRENT_USER = customer;
    this._USER_ROLE = UserType.CUSTOMER;

    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.refreshToken);
    }

    this._AUTHENTICATED = true;
  }

  /**
   * Sign out logged-in credential
   * @param silent Flag if user wish to sign out without confirmation
   */
  async signOut(silent: boolean = false) {
    let confirm = silent;
    if (!confirm) {
      confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_LOGOUT');
    }

    if (confirm) {
      await this.storage.remove(`${COMPANY_CODE}_REFRESH_TOKEN`);
      await this.storage.remove(`${COMPANY_CODE}_DOC_USER`);
      await this.storage.remove(`${COMPANY_CODE}_CUSTOMER`);
      this._AUTHENTICATED = false;
      this._CURRENT_USER = null;
      this._USER_ROLE = null;
      await this.router.navigateByUrl('/jj-luckydraw/sign-in', { replaceUrl: true });

      let authState = this.erp.authStateChange.getValue();
      if (!authState || authState.status != 'LOGGED_OUT') {
        this.erp.authStateChange.next({
          status: 'LOGGED_OUT',
        });
      }
    }
  }

  /**
   * Get current user's profile from SWS ERP and luckydraw
   * @returns Returns user object
   */
  async findMe() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    let customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);

    if (docUser) {
      await this.erp.findMe(docUser.doc_id, true, true, true);
      await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.docUser);
      await this.findMyLuckyUser();
    }

    if (customer) {
      await this.findMyLuckyCustomer();
      await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, this._CURRENT_USER);
    }

    this.authChange.next({
      user: this._CURRENT_USER,
      role: this._USER_ROLE,
    });

    return this._CURRENT_USER;
  }

  /**
   * Get current user's profile from luckydraw
   * @returns Returns user object
   */
  async findMyLuckyUser() {
    this._CURRENT_USER = await this.lucky.getUserByDocUser(this.erp.docUser.doc_id);
    this._CURRENT_USER.docUser = this.erp.docUser;
    this._USER_ROLE = UserType.MERCHANT;
    return this._CURRENT_USER;
  }

  /**
   * Update current user's profile
   * @param user User object
   * @returns Returns update response from SWS ERP
   */
  updateMyProfile(user: Partial<JJUser | JJCustomer>) {
    switch (this.userRole) {
      case UserType.MERCHANT:
        return this.lucky.updateUser(this._CURRENT_USER.doc_id, user);
      case UserType.CUSTOMER:
        return this.lucky.updateCustomer(this._CURRENT_USER.doc_id, user);
    }
  }

  /**
   * Update current user's password
   * @param oldPassword User's old password
   * @param newPassword User's new password
   * @returns Returns update response from SWS ERP
   */
  updateMyPassword(oldPassword: string, newPassword: string) {
    switch (this.userRole) {
      case UserType.MERCHANT:
        return this.updateMyProfile({
          old_password: oldPassword,
          new_password: newPassword,
        });
      case UserType.CUSTOMER:
        return this.lucky.changePassword(this._CURRENT_USER.doc_id, {
          old_password: oldPassword,
          new_password: newPassword,
        });
    }
  }

  /**
   * Get current user's profile from luckydraw
   * @returns Returns user object
   */
  async findMyLuckyCustomer() {
    const customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
    this._CURRENT_USER = await this.lucky.getCustomerById(customer.doc_id);
    this._USER_ROLE = UserType.CUSTOMER;
    return this._CURRENT_USER;
  }
}

interface AuthEvent {
  user: JJUser | JJCustomer;
  role: UserType;
}
