import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { CmsService } from './cms.service';

@Injectable({
  providedIn: 'root'
})
export class GiverService {

  constructor(
    private http: HttpClient,
    private cms: CmsService
  ) { }

  async validateAuthToken(token: string) {
    const configs = await this.cms.getExternalIntegration("GIVER");
    const config = configs[0];
    const requestBody = this.hashData("md=" + token + "&appkey=" + config.appKey);
    const requestUrl = config.apiUrl + "/validate/";

    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "token": this.hashData({ md: token, appkey: config.appKey })
      })
    }

    try {
      const response = await this.http.post<any>(requestUrl, requestBody, options).toPromise();
      const result: GiverValidationResponse = {
        ...response,
        name: response.Name
      };
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  private hashData(data: { [key: string]: string } | string) {
    const stringified = JSON.stringify(data);
    const md5 = new Md5();
    md5.appendStr("giver888")
      .appendStr(stringified)
      .appendStr("72df3a2a625b683b2c7f98f7f985b3ec")
      .appendStr("giver888");

    const hashed = md5.end();
    return hashed + " giver2u";
  }

}

export interface GiverValidationResponse {
  result: string,
  memberID: string,
  name: string,
  email: string,
  phone: string,
  isHalal: boolean
}
