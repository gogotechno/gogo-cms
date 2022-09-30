import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
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
    const requestBody = `md=${token}&appkey=${config.appKey}`;
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
        name: response.Name,
        dob: this.getDOB(response.dateofbirth),
        gender: this.getGender(response.gender),
        language: this.getLanguage(response.language),
        systemLanguage: response.user_system_language
      };
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  private hashData(data: { [key: string]: string } | string) {
    const str = `giver888${JSON.stringify(data)}72df3a2a625b683b2c7f98f7f985b3ecgiver888`;
    const md5 = new Md5();
    md5.start();
    md5.appendStr(str);
    const hashed = md5.end();
    return `${hashed} giver2u`;
  }

  private getGender(i: number) {
    switch (i) {
      case 0:
        return "M";
      case 1:
        return "F";
      case 2:
        return "S";
      default:
        return "S";
    }
  }

  private getLanguage(i: number) {
    switch (i) {
      case 0:
        return "zh";
      case 1:
        return "en";
      case 2:
        return "bm";
      case 3:
        return "id";
      default:
        return "en";
    }
  }

  private getDOB(date: string) {
    let arr = date.split("-");
    let day = arr[0];
    let month = arr[1];
    let year = arr[2];
    return dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
  }

}

export interface GiverValidationResponse {
  result: string,
  memberID: string,
  name: string,
  email: string,
  phone: string,
  dob: string,
  gender: "M" | "F" | "S",
  language: string,
  systemLanguage: string,
  isHalal: boolean
}
