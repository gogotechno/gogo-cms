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

  /**
   * Process application initialization
   * @returns Returns if initialized
   */
  async init() {
    if (this.initialized) return;

    this.title.setTitle("JJ Lucky");
    this.app.loadTemplateTheme(this.cms.SITE.template);
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);

    this.initialized = true;
  }

  /**
   * Get current user's merchant's ID from user accesses
   * @returns Returns merchant's ID
   */
  async getMyMerchantId() {
    // let docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    // let access = docUser.user_access?.find((ua) => ua.access_table === "merchant");
    // return access ? Number(access.access_val) : null;
    return 1;
  }

  /**
   * Get current user's merchant
   * @returns Returns merchant object
   */
  async getMyMerchant() {
    let merchantId = await this.getMyMerchantId();
    return this.erp.getDoc<JJMerchant>("Merchant", merchantId);
  }

  /**
   * Get lastest events
   * @returns Returns lastest events
   */
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

  /**
   * Get last ended events
   * @returns Returns last ended events
   */
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

  /**
   * Get ended events
   * @param pagination Pagination object
   * @returns Returns ended events with pagination
   */
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

  /**
   * Get ticket distributions from given event
   * @param eventId Event's ID
   * @param pagination Pagination object
   * @returns Returns ticket distributions from given event with pagination
   */
  async getTicketDistributionsByEvent(eventId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJTicketDistribution>("Ticket Distribution", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: "=",
      sortBy: "distributedAt",
      sortType: "desc"
    })
    return res.result.map((distribution) => this.populateTicketDistribution(distribution));
  }

  /**
   * Get ticket distribution by ID
   * @param id Ticket distribution's ID
   * @returns Returns ticket distribution object
   */
  async getTicketDistributionById(id: number) {
    let res = await this.erp.getDoc<JJTicketDistribution>("Ticket Distribution", id);
    return this.populateTicketDistribution(res);
  }

  /**
   * Get tickets from given event
   * @param eventId Event's ID
   * @param pagination Pagination object
   * @returns Returns tickets from given event with pagination
   */
  async getTicketsByEvent(eventId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJTicket>("Ticket", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: "="
    })
    return res.result.map((ticket) => this.populateTicket(ticket));
  }

  /**
  * Get tickets from given ticket distribution
  * @param distributionId Ticket distribution's ID
  * @param pagination Pagination object
  * @returns Returns tickets from given ticket distribution with pagination
  */
  async getTicketsByTicketDistribution(distributionId: number, pagination: Pagination) {
    let res = await this.erp.getDocs<JJTicket>("Ticket", {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      ticket_distribution_id: distributionId,
      ticket_distribution_id_type: "="
    })
    return res.result.map((ticket) => this.populateTicket(ticket));
  }

  /**
   * Get users from given merchant
   * @param merchantId Merchant's ID
   * @param pagination Pagination object
   * @returns Returns users from given merchant with pagination
   */
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

  /**
   * Get user by doc user's ID
   * @param docUserId Doc user's ID
   * @returns Returns user object
   */
  async getUserByDocUser(docUserId: number) {
    let res = await this.erp.getDocs<JJUser>("User", {
      doc_user_id: docUserId,
      doc_user_id_type: "="
    })
    return res.result.map((user) => this.populateUser(user))[0];
  }

  /**
   * Get user by ID
   * @param userId User's ID
   * @returns Returns user object
   */
  async getUserById(userId: number) {
    let res = await this.erp.getDoc<JJUser>("User", userId);
    return this.populateUser(res);
  }

  /**
   * Get user roles
   * @returns Returns all user roles
   */
  async getUserRoles() {
    let res = await this.erp.getDocs<JJUserRole>("User Role");
    return res.result;
  }

  /**
   * Get user roles by merchant user
   * @returns Returns available user roles for merchant user
   */
  async getUserRolesByMerchant() {
    let roles = await this.getUserRoles();
    return roles.filter((role) => role.code != UserRole.SYSTEM_ADMIN);
  }

  /**
   * Issue tickets
   * @param application Create object
   * @returns Returns create esponse from SWS ERP
   */
  issueTickets(application: JJTicketDistributionApplication) {
    return this.erp.postDoc("Ticket Distribution Application", application);
  }

  /**
   * Create user
   * @param user Create object
   * @returns Returns create response from SWS ERP
   */
  createUser(user: JJUser) {
    return this.erp.postDoc("User", user, { autoSubmit: true });
  }

  /**
   * Update user by ID
   * @param userId User ID
   * @param user Update object
   * @returns Returns update response from SWS ERP
   */
  updateUser(userId: number, user: Partial<JJUser>) {
    return this.erp.putDoc("User", userId, user);
  }

  /**
   * Populate user to map Gogo CMS usage
   * @param user User object
   * @returns Returns user object with populated properties
   */
  private populateUser(user: JJUser) {
    user.roleTranslation = this.utils.transformJSONStringtoCMSTranslation(user.translate?.role, user.role);
    return user;
  }

  /**
   * Populate ticket to map Gogo CMS usage
   * @param ticket Ticket object
   * @returns Returns ticket object with populated properties
   */
  private populateTicket(ticket: JJTicket) {
    ticket.statusTranslation = this.utils.transformJSONStringtoCMSTranslation(ticket.translate?.status, ticket.status);
    return ticket;
  }

  /**
   * Populate ticket distribution to map Gogo CMS usage
   * @param distribution Ticket distribution object
   * @returns Returns ticket distribution object with populated properties
   */
  private populateTicketDistribution(distribution: JJTicketDistribution) {

    return distribution;
  }

}
