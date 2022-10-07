import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const COMPANY_CODE = 'lucky';
const ERP_API_URL = `${environment.swsErp.ApiUrl}/${COMPANY_CODE}` || 'https://uat.erp.swstechno.com/api/lucky';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _AUTHENTICATED = false;
  initialized = false;
  currentUser;
  token;

  constructor(private http: HttpClient, private storage: Storage) { }

  ngOnInit(): void {
    this.init();
  }

  
  public get authenticated() : boolean {
    return this._AUTHENTICATED;
  }
  
  async getMe() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    return await this.http.get<any>(`${ERP_API_URL}/users/${docUser.doc_id}`).pipe(map(res => res.data)).toPromise();
  }

  async signInWithEmailAndPassword(email: string, password: string, rememberMe: boolean) {
    let res = await this.http.post<any>(`${ERP_API_URL}/login`, {
      email: email,
      password: password
    }, { observe: 'response' }).toPromise();

    if (rememberMe) {
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, res.headers.get('x-auth-refresh-token'));
    }
    
    await this.storage.set(`${COMPANY_CODE}_DOC_USER`, res.body.data);
    this.token = res.headers.get('x-auth-token').split(';')[0].split('=')[1];
    this._AUTHENTICATED = true;
    
    
    console.log(res.headers.get('x-auth-refresh-token'));
    console.log(res.headers.get('x-auth-token'));
  }
  
  async signOut() {
    await this.storage.remove(`${COMPANY_CODE}_REFRESH_TOKEN`);
    await this.storage.remove(`${COMPANY_CODE}_DOC_USER`);
    console.log('Signed out');
  }
  
  async init() {
    if (this.initialized) {
      return;
    }
    let refreshToken = await this.storage.get(`${COMPANY_CODE}_REFRESH_TOKEN`);
    if (refreshToken) {

      let newRefreshTokenRes = await this.http.get<any>(`${ERP_API_URL}/refresh_refresh_token`, {headers: {Authorization: `Bearer ${refreshToken}`}}).toPromise();
      let newRefreshToken = newRefreshTokenRes.data;
      await this.storage.set(`${COMPANY_CODE}_REFRESH_TOKEN`, newRefreshToken);

      let newTokenRes = await this.http.get<any>(`${ERP_API_URL}/refresh_token`, {headers: {Authorization: `Bearer ${newRefreshToken}`}}).toPromise();
      this.token = newTokenRes.data;
      this.currentUser = await this.getMe();
      this._AUTHENTICATED = true;
    }

    this.initialized = true;
  }
}
