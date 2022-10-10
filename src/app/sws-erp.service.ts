import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SWS_ERP_COMPANY, GetOptions, Pageable, CreateResponse, UpdateResponse, FindUserResponse, GenerateAccessTokenResponse, GenerateRefreshTokenResponse, DocUser, AuthStateEvent, DocUserAccess } from './sws-erp.type';

@Injectable({
  providedIn: 'root'
})
export class SwsErpService {

  private API_URL: string;

  private _TOKEN: string;
  private _REFRESH_TOKEN: string;
  private _DOC_USER: DocUser;

  get TOKEN() {
    return this._TOKEN;
  }

  get REFRESH_TOKEN() {
    return this._REFRESH_TOKEN;
  }

  get DOC_USER() {
    return this._DOC_USER;
  }

  authStateChange: BehaviorSubject<AuthStateEvent>;

  constructor(injector: Injector, private _http: HttpClient) {
    this.authStateChange = new BehaviorSubject<AuthStateEvent>(null);
    
    injector.get(SWS_ERP_COMPANY).subscribe((companyCode) => {
      this.API_URL = `${environment.swsErp.apiUrl}/${companyCode}`;
    })
  }

  /**
   * Get document
   * @param docType Document type
   * @param id Document's ID
   * @param query Query params
   * @returns Returns document object
   */
  public getDoc<T = any>(docType: string, id: number, query: GetOptions = {}) {
    const requestUrl = `${this.API_URL}/module/${docType}/${id}`;
    return this._http.get<T[]>(requestUrl, { params: query }).pipe(map((res) => res[0])).toPromise();
  }

  /**
   * Get documents
   * @param docType Document type
   * @param query Query params
   * @returns Returns with documents and total
   */
  public getDocs<T = any>(docType: string, query: GetOptions = {}) {
    const requestUrl = `${this.API_URL}/docs/${docType}`;
    return this._http.get<Pageable<T>>(requestUrl, { params: query }).toPromise();
  }

  /**
   * Create document
   * @param docType Document type
   * @param body Create object
   * @param query Query params
   * @returns Returns with created id and extra data
   */
  public postDoc(docType: string, body: any, query: any = {}) {
    const requestUrl = `${this.API_URL}/docs/${docType}`
    return this._http.post<CreateResponse>(requestUrl, body, { params: query }).toPromise();
  }

  /**
   * Update document
   * @param docType Document type
   * @param id Document's ID
   * @param body Update object
   * @param query Query params
   * @returns Returns with updated id and extra data
   */
  public putDoc(docType: string, id: number, body: any, query: any = {}) {
    const requestUrl = `${this.API_URL}/docs/${docType}/${id}`;
    return this._http.post<UpdateResponse>(requestUrl, body, { params: query }).toPromise();
  }

  /**
   * Get user's profile
   * @param id User's ID
   * @returns Returns user's profile
   */
  public async findDocUser(id: number) {
    const requestUrl = `${this.API_URL}/users/${id}`;
    return this._http.get<FindUserResponse>(requestUrl).pipe(map((res) => res.data)).toPromise();
  }

  /**
   * Get current user's profile
   * @param id User's ID
   * @returns Returns user's profile
   */
  public async findMe(id: number, withAccesses: boolean, withGroups: boolean, withPermissions: boolean) {
    this._DOC_USER = await this.findDocUser(id);

    if (withAccesses) {

    }

    if (withGroups) {

    }

    if (withPermissions) {

    }

    return this._DOC_USER;
  }

  /**
   * Sign in with user credential
   * @param email User's email
   * @param password User's password
   * @param args Extra arguments in inheritance
   * @returns Returns with refresh token, access token and user's profile
   */
  public async signInWithEmailAndPassword(email: string, password: string, ...args: any[]) {
    const requestUrl = `${this.API_URL}/login`;
    const requestBody = { email: email, password: password };
    let res = await this._http.post<any>(requestUrl, requestBody, { observe: 'response' }).toPromise();
    this._REFRESH_TOKEN = res.headers.get('x-auth-refresh-token');
    this._TOKEN = this.transformAccessToken(res.headers.get('x-auth-token'));
    this._DOC_USER = res.body.data;
    this.authStateChange.next({ status: "LOGGED_IN" });
    return res;
  }

  /**
   * Transform token into correct format
   * @param token Token response
   * @returns Transformed token
   */
  private transformAccessToken(token: string) {
    return token.split(';')[0].split('=')[1];
  }

  /**
   * Generate new refresh token
   * @param refreshToken Current refresh Token
   * @returns Returns new refresh token
   */
  public async generateRefreshToken(refreshToken: string) {
    const requestUrl = `${this.API_URL}/refresh_refresh_token`;
    const requestHeaders = { Authorization: `Bearer ${refreshToken}` };
    let res = await this._http.get<GenerateRefreshTokenResponse>(requestUrl, { headers: requestHeaders }).toPromise();
    this._REFRESH_TOKEN = res.data;
    return this._REFRESH_TOKEN;
  }

  /**
   * Generate new access token
   * @param refreshToken Refresh Token
   * @returns Returns new access token
   */
  public async generateAccessToken(refreshToken: string) {
    const requestUrl = `${this.API_URL}/refresh_token`;
    const requestHeaders = { Authorization: `Bearer ${refreshToken}` };
    let res = await this._http.get<GenerateAccessTokenResponse>(requestUrl, { headers: requestHeaders }).toPromise();
    this._TOKEN = res.data;
    return this._TOKEN;
  }

  /**
   * Sign out
   */
  public signOut() {
    let authState = this.authStateChange.getValue();
    if (authState.status == "LOGGED_OUT") {
      return;
    }

    this._REFRESH_TOKEN = null;
    this._TOKEN = null;
    this._DOC_USER = null;

    this.authStateChange.next({ status: "LOGGED_OUT" });
  }

}