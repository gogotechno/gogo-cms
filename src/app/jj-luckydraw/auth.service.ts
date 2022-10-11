import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtils } from '../cms.util';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { JJLuckydrawService } from './jj-luckydraw.service';
import { COMPANY_CODE, JJUser } from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _AUTHENTICATED: boolean = false;
  private _CURRENT_USER: JJUser;

  get authenticated() {
    return this._AUTHENTICATED;
  }

  get currentUser() {
    return this._CURRENT_USER;
  }

  initialized: boolean = false;

  constructor(
    private http: HttpClient,
    private app: AppUtils,
    private erp: SwsErpService,
    private lucky: JJLuckydrawService,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.erp.authStateChange.subscribe((ev) => {
      if (ev?.status == "LOGGED_OUT") {
        if (this._AUTHENTICATED) {
          this.signOut();
        }
      }
    })
  }

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

  async signInWithEmailAndPassword(email: string, password: string, rememberMe: boolean = true) {
    await this.erp.signInWithEmailAndPassword(email, password);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.docUser);
    await this.findMyLuckyUser();

    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, this.erp.refreshToken);
    }

    this._AUTHENTICATED = true;
  }

  async signOut(silent: boolean = false) {
    let confirm = silent;
    if (!confirm) {
      confirm = await this.app.presentConfirm("jj-luckydraw._CONFIRM_TO_LOGOUT");
    }

    if (confirm) {
      await this.storage.remove(`${COMPANY_CODE}_REFRESH_TOKEN`);
      await this.storage.remove(`${COMPANY_CODE}_DOC_USER`);
      this._AUTHENTICATED = false;
      this._CURRENT_USER = null;
      this.erp.signOut();
      await this.router.navigateByUrl("/jj-luckydraw/sign-in", { replaceUrl: true });
    }
  }

  async findMe() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    await this.erp.findMe(docUser.doc_id, true, true, true);
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, this.erp.docUser);
    await this.findMyLuckyUser();
    return this._CURRENT_USER;
  }

  async findMyLuckyUser() {
    this._CURRENT_USER = await this.lucky.getUserByDocUser(this.erp.docUser.doc_id);
    this._CURRENT_USER.docUser = this.erp.docUser;
    return this._CURRENT_USER;
  }

  updateMyProfile(user: Partial<JJUser>) {
    return this.lucky.updateUser(this._CURRENT_USER.doc_id, user);
  }

  updateMyPassword(oldPassword: string, newPassword: string) {
    return this.erp.changePassword(this._CURRENT_USER.doc_id, {
      old_password: oldPassword,
      new_password: newPassword
    }, "User");
  }

}
