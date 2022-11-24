import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { COMPANY_CODE, JJCustomer, User, UserType } from '../typings';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _AUTHENTICATED: boolean = false;
  private _CURRENT_USER: User;
  private _USER_TYPE: UserType;
  private initialized: boolean = false;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  get currentUser() {
    return this._CURRENT_USER;
  }

  get userType() {
    return this._USER_TYPE;
  }

  constructor(private storage: LocalStorageService, private swsErp: SwsErpService, private core: CoreService) {}

  async init() {
    if (this.initialized) {
      return;
    }
    let refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
    if (refreshToken) {
      await this.swsErp.generateRefreshToken(refreshToken);
      await this.swsErp.generateAccessToken(this.swsErp.refreshToken);
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
      await this.findMe();
      this._AUTHENTICATED = true;
    }
    this.initialized = true;
  }

  async signInUser(email: string, password: string, rememberMe: boolean = true) {
    await this.swsErp.signInDocUser(email, password);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.swsErp.docUser);
    await this.findMyLuckyUser();
    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
    }
    this._AUTHENTICATED = true;
  }

  async signInCustomer(email: string, password: string, rememberMe: boolean = true) {
    await this.swsErp.signInUser('Customer', email, password);
    await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, this.swsErp.user);
    await this.findMyLuckyCustomer(this.swsErp.user);
    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.swsErp.refreshToken);
    }
    this._AUTHENTICATED = true;
  }

  async findMyLuckyUser() {
    this._CURRENT_USER = await this.core.getUserByDocUserId(this.swsErp.docUser.doc_id);
    this._CURRENT_USER.docUser = this.swsErp.docUser;
    this._USER_TYPE = 'MERCHANT';
    return this._CURRENT_USER;
  }

  async findMyLuckyCustomer(customer?: JJCustomer) {
    if (!customer) {
      let storedCustomer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
      customer = await this.core.getCustomerById(storedCustomer.doc_id);
    }
    this._CURRENT_USER = customer;
    this._USER_TYPE = 'CUSTOMER';
    return this._CURRENT_USER;
  }

  async findMe() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    let customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
    if (docUser) {
      await this.swsErp.findMyDocUser(docUser.doc_id, true, true, true);
      await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.swsErp.docUser);
      await this.findMyLuckyUser();
    }
    if (customer) {
      await this.swsErp.findMyUser('Customer', customer.doc_id);
      await this.storage.set(`${COMPANY_CODE}_CUSTOMER`, this.swsErp.user);
      await this.findMyLuckyCustomer(this.swsErp.user);
    }
    return this._CURRENT_USER;
  }
}
