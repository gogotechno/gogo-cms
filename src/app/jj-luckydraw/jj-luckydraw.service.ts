import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CmsService } from '../cms.service';
import { AppUtils } from '../cms.util';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { DocUser, SWS_ERP_COMPANY } from '../sws-erp.type';
import { COMPANY_CODE, Event, Merchant } from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root'
})
export class JJLuckydrawService {

  readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;

  initialized: boolean = false;

  constructor(
    injector: Injector,
    private http: HttpClient,
    private title: Title,
    private erp: SwsErpService,
    private storage: LocalStorageService,
    private app: AppUtils,
    private cms: CmsService
  ) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
  }

  async init() {
    if (this.initialized) {
      return;
    }

    this.title.setTitle("JJ Lucky");
    this.app.loadTemplateTheme(this.cms.SITE.template);
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);

    this.initialized = true;
  }

  async getMyMerchant() {
    return this.erp.getDoc<Merchant>("Merchant", 1);

    // let docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    // let access = docUser.user_access?.find((ua) => ua.access_table === "merchant");
    // if (access) {
    //   return this.erp.getDoc<Merchant>("Merchant", Number(access.access_val));
    // } else {
    //   return null;
    // }
  }

  async getLastestEvent() {
    let res = await this.erp.getDocs<Event>("Event", {
      hasFk: true,
      status: "ACTIVE",
      status_type: "=",
      currentPage: 1,
      itemsPerPage: 1,
      sortBy: "startAt",
      sortType: "asc"
    })

    return res.result[0];
  }

  async getLastEndedEvent() {
    let res = await this.erp.getDocs("Event", {
      hasFk: true,
      status: "ENDED",
      status_type: "=",
      currentPage: 1,
      itemsPerPage: 1,
      sortBy: "startAt",
      sortType: "asc"
    });

    return res.result[0];
  }

  async getEndedEvents() {
    let res = await this.erp.getDocs("Event", {
      hasFk: true,
      status: "ENDED",
      status_type: "="
    })

    return res.result;
  }

  async getWinners() {
    let res = await this.erp.getDocs("Winner", {
      hasFk: true
    });

    return res.result;
  }


  // async getLastestEvent() {
  //   return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Active', status_type: '=' } })
  //     .pipe(
  //       map(res => res.result[0])
  //     ).toPromise();
  // }

  // async getLastEndedEvent() {
  //   return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Ended', status_type: '=', currentPage: 1, itemsPerPage: 1, sortBy: 'drawAt', sortType: 'desc' } })
  //     .pipe(
  //       map(res => res.result[0])
  //     ).toPromise();
  // }

  // async getEndedEvents() {
  //   return await this.http.get<any>(`${ERP_API_URL}/docs/Event`, { params: { hasFk: true, status: 'Ended', status_type: '=' } })
  //     .pipe(
  //       map(res => res.result)
  //     ).toPromise();
  // }

  // async getWinners() {
  //   return await this.http.get<any>(`${ERP_API_URL}/docs/Winner`, { params: { hasFk: true, status: 'Ended', status_type: '=' } })
  //     .pipe(
  //       map(res => res.result)
  //     ).toPromise();
  // }

  // async issueTickets(ticketDistributionApplication) {
  //   return await this.http.post<any>(`${ERP_API_URL}/docs/Ticket Distribution Application/null`, ticketDistributionApplication).toPromise();
  // }

  // async getMyMerchant() {
  //   let docUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
  //   let merchantId = docUser.user_access.find(ua => ua.access_table === 'merchant')?.access_val;
  //   return await this.http.get<any>(`${ERP_API_URL}/module/Merchant/${merchantId}`)
  //     .pipe(
  //       map(res => res[0])
  //     ).toPromise();
  // }
}
