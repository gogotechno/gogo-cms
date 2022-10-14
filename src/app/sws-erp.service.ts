import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SWS_ERP_COMPANY, GetOptions, Pageable, CreateResponse, UpdateResponse, FindUserResponse, GenerateAccessTokenResponse, GenerateRefreshTokenResponse, DocUser, AuthStateEvent, DocUserAccess, PostOptions, PutOptions, ChangePasswordDto } from './sws-erp.type';

@Injectable({
  providedIn: 'root'
})
export class SwsErpService {

  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;

  private API_URL: string;

  private _TOKEN: string;
  private _REFRESH_TOKEN: string;
  private _DOC_USER: DocUser;

  get token() {
    return this._TOKEN;
  }

  get refreshToken() {
    return this._REFRESH_TOKEN;
  }

  get docUser() {
    return this._DOC_USER;
  }

  authStateChange: BehaviorSubject<AuthStateEvent>;

  constructor(injector: Injector, private _http: HttpClient) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
    this.SWS_ERP_COMPANY_TOKEN.subscribe((companyCode) => {
      this.API_URL = `${environment.swsErp.apiUrl}/${companyCode}`;
    })
    this.authStateChange = new BehaviorSubject<AuthStateEvent>(null);
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
  public postDoc<T = any>(docType: string, body: T, query: PostOptions = {}) {
    const requestUrl = `${this.API_URL}/docs/${docType}`;
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
  public putDoc<T = any>(docType: string, id: number, body: T, query: PutOptions = {}) {
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
      let accesses = await this.getUserAccesses(id);
      this._DOC_USER.user_access = accesses;
    }

    return this._DOC_USER;
  }

  private async getUserAccesses(userId: number) {
    let res = await this.getDocs<DocUserAccess>("Doc User Access", {
      doc_user_id: this._DOC_USER.doc_id,
      doc_user_id_type: "="
    });
    return res.result;
  }

  /**
   * Sign in with user credential
   * @param email User's email
   * @param password User's password
   * @returns Returns with refresh token, access token and user's profile
   */
  public async signInWithEmailAndPassword(email: string, password: string) {
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
   * Change password
   * @param userId User ID
   * @param payload Old password and new password
   * @param userReference Provided when updating non-doc-user user
   * @returns Returns with updated id and extra data
   */
  public changePassword(userId: number, payload: ChangePasswordDto, userReference?: string) {
    const requestUrl = `${this.API_URL}/users/password` + (userReference ? `/${userReference}` : "") + `/${userId}`;
    return this._http.put<UpdateResponse>(requestUrl, payload).toPromise();
  }

  /**
   * Sign out
   */
  public signOut() {
    let authState = this.authStateChange.getValue();
    if (authState && authState.status == "LOGGED_OUT") {
      return;
    }

    this._REFRESH_TOKEN = null;
    this._TOKEN = null;
    this._DOC_USER = null;

    this.authStateChange.next({ status: "LOGGED_OUT" });
  }

}