import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { COMPANY_CODE } from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _AUTHENTICATED: boolean = false;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  initialized: boolean = false;

  constructor(
    private http: HttpClient,
    private erp: SwsErpService,
    private storage: LocalStorageService
  ) {
    this.erp.authStateChange.subscribe((ev) => {
      if (ev?.status == "LOGGED_OUT") {
        this.signOut();
      }
    })
  }

  async init() {
    if (this.initialized) {
      return;
    }

    let refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
    if (refreshToken) {
      await this.erp.generateRefreshToken(refreshToken);
      await this.erp.generateAccessToken(this.erp.REFRESH_TOKEN);
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.REFRESH_TOKEN);
      await this.getMe();
      this._AUTHENTICATED = true;
    }

    this.initialized = true;
  }

  async signInWithEmailAndPassword(email: string, password: string, rememberMe: boolean = true) {
    let res = await this.erp.signInWithEmailAndPassword(email, password);

    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.REFRESH_TOKEN);
    }

    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.DOC_USER);
    this._AUTHENTICATED = true;
    return res;
  }

  async signOut(silent: boolean = false) {
    await this.storage.remove(`${COMPANY_CODE}_REFRESH_TOKEN`);
    await this.storage.remove(`${COMPANY_CODE}_DOC_USER`);
    this.erp.signOut();
  }

  async getMe() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    await this.erp.findMe(docUser.doc_id, true, true, true);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.DOC_USER);
    return this.erp.DOC_USER;
  }

}
