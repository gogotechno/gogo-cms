import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';
import { COMPANY_CODE, JJCustomer, JJEvent, JJUser, JJWallet, LANGUAGE_STORAGE_KEY } from '../typings';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;
  private initialized: boolean = false;

  constructor(
    injector: Injector,
    private title: Title,
    private appUtils: AppUtils,
    private cmsUtils: CmsUtils,
    private storage: LocalStorageService,
    private translate: TranslateService,
    private swsErp: SwsErpService,
  ) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.title.setTitle('JJ Member');
    this.appUtils.loadTemplateTheme('jj');
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);
    let storedLang = await this.storage.get(LANGUAGE_STORAGE_KEY);
    if (storedLang) {
      await this.translate.use(storedLang).toPromise();
    }
    this.initialized = true;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ User
  // -----------------------------------------------------------------------------------------------------

  async getUserByDocUserId(docUserId: number) {
    let res = await this.swsErp.getDocs<JJUser>('User', {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
    });
    return res.result.map((user) => this.populateUser(user))[0];
  }

  async getWalletByMerchantId(merchantId: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      merchantId: merchantId,
      merchantId_type: '=',
    });
    return res.result;
  }

  updateUser(userId: number, user: Partial<JJUser>) {
    return this.swsErp.putDoc('User', userId, user);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Customer
  // -----------------------------------------------------------------------------------------------------

  async getCustomerById(customerId: number) {
    let res = await this.swsErp.getDoc<JJCustomer>('Customer', customerId);
    return res;
  }

  async getWalletByCustomerId(customerId: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      customerId: customerId,
      customerId_type: '=',
    });
    return res.result;
  }

  updateCustomer(customerId: number, customer: Partial<JJCustomer>) {
    return this.swsErp.putDoc('Customer', customerId, customer);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Event
  // -----------------------------------------------------------------------------------------------------

  async getOngoingEvents(pagination: Pagination) {
    let res = await this.swsErp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      status: 'ACTIVE',
      status_type: '=',
    });
    return res.result;
  }

  async getWinners(pagination: Pagination) {
    let res = await this.swsErp.getDocs('Winner', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
    });
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Mapper
  // -----------------------------------------------------------------------------------------------------

  private populateUser(user: JJUser) {
    user.roleTranslation = this.cmsUtils.transformJSONStringtoCMSTranslation(user.translate?.role, user.role);
    return user;
  }
}
