import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CmsService } from '../cms.service';
import { AppUtils, CmsUtils } from '../cms.util';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { DocStatus, DocUser, Pagination, SWS_ERP_COMPANY } from '../sws-erp.type';
import { COMPANY_CODE, JJEvent, JJUser, JJUserRole, JJMerchant, JJTicket, JJTicketDistribution, JJTicketDistributionApplication, UserRole } from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root'
})
export class JJLuckydrawService {

  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;

  initialized: boolean = false;

  constructor(
    injector: Injector,
    private http: HttpClient,
    private title: Title,
    private erp: SwsErpService,
    private storage: LocalStorageService,
    private app: AppUtils,
    private cms: CmsService,
    private utils: CmsUtils
  ) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
  }

  async init() {
    if (this.initialized) return;

    this.title.setTitle("JJ Lucky");
    this.app.loadTemplateTheme(this.cms.SITE.template);
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);

    this.initialized = true;
  }

  async getMyMerchantId() {
    // let docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    // let access = docUser.user_access?.find((ua) => ua.access_table === "merchant");
    // return access ? Number(access.access_val) : null;
    return 1;
  }

  async getMyMerchant() {
    let merchantId = await this.getMyMerchantId();
    return this.erp.getDoc<JJMerchant>("Merchant", merchantId);
  }

  async getLastestEvent() {
    let res = await this.erp.getDocs<JJEvent>("Event", {
      itemsPerPage: 1,
      currentPage: 1,
      hasFk: true,
      status: "ACTIVE",
      status_type: "=",
      sortBy: "startAt",
      sortType: "asc"
    })
    return res.result[0];
  }

  async getLastEndedEvent() {
    let res = await this.erp.getDocs<JJEvent>("Event", {
      itemsPerPage: 1,
      currentPage: 1,
      hasFk: true,
      status: "ENDED",
      status_type: "=",
      sortBy: "startAt",
      sortType: "asc"
    });
    return res.result[0];
  }

  async getEndedEvents(pagination: Pagination) {
    let res = await this.erp.getDocs<JJEvent>("Event", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      hasFk: true,
      status: "ENDED",
      status_type: "="
    })
    return res.result;
  }

  async getTicketDistributionsByEvent(eventId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJTicketDistribution>("Ticket Distribution", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: "=",
      sortBy: "distributedAt",
      sortType: "desc"
    })
    return res.result;
  }

  async getTicketsByEvent(eventId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJTicket>("Ticket", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: "="
    })
    return res.result;
  }

  async getUsersByMerchant(merchantId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJUser>("User", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      merchant_id: merchantId,
      merchant_id_type: "=",
      doc_status: DocStatus.SUBMIT,
      doc_status_type: "="
    })
    return res.result.map((user) => this.populateUser(user));
  }

  async getUserByDocUser(docUserId: number) {
    let res = await this.erp.getDocs<JJUser>("User", {
      doc_user_id: docUserId,
      doc_user_id_type: "="
    })
    return res.result.map((user) => this.populateUser(user))[0];
  }

  async getUserRoles() {
    let res = await this.erp.getDocs<JJUserRole>("User Role");
    return res.result;
  }

  async getUserRolesByMerchant() {
    let roles = await this.getUserRoles();
    return roles.filter((role) => role.code != UserRole.SYSTEM_ADMIN);
  }

  issueTickets(application: JJTicketDistributionApplication) {
    return this.erp.postDoc("Ticket Distribution Application", application);
  }

  createUser(user: JJUser) {
    return this.erp.postDoc("User", user, {
      autoSubmit: true
    });
  }

  updateUser(userId: number, user: Partial<JJUser>) {
    return this.erp.putDoc("User", userId, user);
  }

  private populateUser(user: JJUser) {
    user.roleTranslation = this.utils.transformJSONStringtoCMSTranslation(user.translate?.role, user.role);
    return user;
  }
}
