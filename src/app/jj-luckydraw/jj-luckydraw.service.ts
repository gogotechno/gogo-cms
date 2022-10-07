import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const COMPANY_CODE = 'lucky';
const ERP_API_URL = `${environment.swsErp.ApiUrl}/${COMPANY_CODE}` || 'https://uat.erp.swstechno.com/api/lucky';

@Injectable({
  providedIn: 'root'
})
export class JjLuckydrawService {

  constructor(private http: HttpClient, private storage: Storage) { }

  async getLastestEvent() {
    return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Active', status_type: '=' } })
      .pipe(
        map(res => res.result[0])
      ).toPromise();
  }

  async getLastEndedEvent() {
    return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Ended', status_type: '=', currentPage: 1, itemsPerPage: 1, sortBy: 'drawAt', sortType: 'desc' } })
      .pipe(
        map(res => res.result[0])
      ).toPromise();
  }

  async getEndedEvents() {
    return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Ended', status_type: '=' } })
      .pipe(
        map(res => res.result)
      ).toPromise();
  }

  async getWinners() {
    return await this.http.get<any>(`${ERP_API_URL}/docs/Winner`, { params: { hasFk: true, status: 'Ended', status_type: '=' } })
      .pipe(
        map(res => res.result)
      ).toPromise();
  }

  async issueTickets(ticketDistributionApplication) {
    return await this.http.post<any>(`${ERP_API_URL}/docs/Ticket Distribution Application/null`, ticketDistributionApplication).toPromise();
  }

  async getMyMerchant() {
    let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    let merchantId = docUser.user_access.find(ua => ua.access_table === 'merchant')?.access_val;
    return await this.http.get<any>(`${ERP_API_URL}/module/Merchant/${merchantId}`)
      .pipe(
        map(res => res[0])
      ).toPromise();
  }
}
