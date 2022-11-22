import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';

const COMPANY_CODE = 'lucky';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;

  constructor(injector: Injector, private http: HttpClient, private erp: SwsErpService) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);
  }

  async getOngoingEvents(pagination: Pagination) {
    let res = await this.erp.getDocs('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      status: 'ACTIVE',
      status_type: '=',
    });
    return res.result;
  }

  async getWinners(pagination: Pagination) {
    let res = await this.erp.getDocs('Winner', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
    });
    return res.result;
  }
}
