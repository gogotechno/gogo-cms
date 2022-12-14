import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CmsService } from '../cms.service';
import { AppUtils, CmsUtils } from '../cms.util';
import { LocalStorageService } from '../local-storage.service';
import { SwsErpService } from '../sws-erp.service';
import { Conditions, DocStatus, DocUser, Pagination, SWS_ERP_COMPANY } from '../sws-erp.type';
import {
  COMPANY_CODE,
  JJEvent,
  JJUser,
  JJUserRole,
  JJMerchant,
  JJTicket,
  JJTicketDistribution,
  JJTicketDistributionApplication,
  UserRole,
  JJWinner,
  LANGUAGE_STORAGE_KEY,
  JJCustomer,
  JJProduct,
  JJWalletTransaction,
  JJWallet,
  JJCapturePaymentRequest,
  UserType,
  WalletType,
  JJPointRule,
} from './jj-luckydraw.type';

@Injectable({
  providedIn: 'root',
})
export class JJLuckydrawService {
  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;

  initialized = false;

  userChange: BehaviorSubject<UserEvent>;
  usersChange: BehaviorSubject<OnChangeEvent>;
  customerChange: BehaviorSubject<CustomerEvent>;
  customersChange: BehaviorSubject<OnChangeEvent>;
  distributionsChange: BehaviorSubject<OnChangeEvent>;
  // walletChange: BehaviorSubject<OnChangeEvent>;

  constructor(
    injector: Injector,
    private http: HttpClient,
    private title: Title,
    private erp: SwsErpService,
    private storage: LocalStorageService,
    private app: AppUtils,
    private cms: CmsService,
    private utils: CmsUtils,
    private translate: TranslateService,
  ) {
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
    this.userChange = new BehaviorSubject<UserEvent>(null);
    this.usersChange = new BehaviorSubject<OnChangeEvent>(null);
    this.distributionsChange = new BehaviorSubject<OnChangeEvent>(null);
    this.customerChange = new BehaviorSubject<CustomerEvent>(null);
    this.customersChange = new BehaviorSubject<OnChangeEvent>(null);
    // this.walletChange = new BehaviorSubject<OnChangeEvent>(null);
  }

  /**
   * Process application initialization
   *
   * @returns Returns if initialized
   */
  async init() {
    if (this.initialized) return;

    this.title.setTitle('JJ Lucky');
    this.app.loadTemplateTheme(this.cms.SITE.template);
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);

    const storedLang = await this.storage.get(LANGUAGE_STORAGE_KEY);
    if (storedLang) {
      await this.translate.use(storedLang).toPromise();
    }

    this.initialized = true;
  }

  /**
   * Get supported languages from GogoCMS site's attributes
   *
   * @returns Returns supported languages
   */
  async getSupportedLanguages() {
    const attributes = await this.cms.getAttributes();
    const attribute = attributes.find((a) => a.code == 'languages');
    return attribute && attribute.options.length > 0
      ? attribute.options
      : [
          {
            code: 'en',
            label: {
              en: 'English',
              zh: 'English',
            },
          },
        ];
  }

  /**
   * Get current user's merchant's ID from user accesses
   *
   * @returns Returns merchant's ID
   */
  async getMyMerchantId() {
    const docUser: DocUser = await this.storage.get(`${COMPANY_CODE}_DOC_USER`);
    const access = docUser?.user_access?.find((ua) => ua.access_table === 'merchant');
    return access ? Number(access.access_val) : null;
  }

  /**
   * Get current user's merchant
   *
   * @returns Returns merchant object
   */
  async getMyMerchant(withSummary: boolean = false) {
    const merchantId = await this.getMyMerchantId();
    const merchant = await this.erp.getDoc<JJMerchant>('Merchant', merchantId, {
      withSummary,
    });
    return this.populateMerchant(merchant);
  }

  /**
   * Get lastest events
   *
   * @returns Returns lastest events
   */
  async getLastestEvent() {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      itemsPerPage: 1,
      currentPage: 1,
      status: 'ACTIVE',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'DESC',
    });
    return res.result[0];
  }

  /**
   * Get last ended events
   *
   * @returns Returns last ended events
   */
  async getLastEndedEvent() {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      itemsPerPage: 1,
      currentPage: 1,
      status: 'ENDED',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'DESC',
      withSummary: true,
    });
    return res.result[0];
  }

  /**
   * Get last ended events
   *
   * @returns Returns last ended events
   */
  async getLastDrewEvent() {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      itemsPerPage: 1,
      currentPage: 1,
      lastDrew: true,
      withSummary: true,
    });
    return res.result[0];
  }

  /**
   * Get ended events
   *
   * @param pagination Pagination object
   * @returns Returns ended events with pagination
   */
  async getEvents(conditions: Conditions, pagination: Pagination) {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: 'startAt',
      sortType: 'DESC',
      ...conditions,
    });
    return res.result;
  }

  /**
   * Get active merchant events
   *
   * @returns Returns active merchant events
   */
  async getActiveMerchantEvent() {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      sortBy: 'startAt',
      sortType: 'DESC',
      status: 'ACTIVE',
      status_type: '=',
      fromMerchant: true,
    });
    return res.result.map((event) => this.populateEvent(event));
  }

  /**
   * Get ended events
   *
   * @param pagination Pagination object
   * @returns Returns ended events with pagination
   */
  async getEndedEvents(pagination: Pagination) {
    const res = await this.erp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      status: 'ENDED',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'DESC',
      withSummary: true,
      withResult: true,
    });
    return res.result;
  }

  /**
   * Get event by ID
   *
   * @param eventId Event's ID
   * @returns Returns event object
   */
  async getEventById(eventId: number) {
    const res = await this.erp.getDoc<JJEvent>('Event', eventId, {
      withSummary: true,
    });
    return res;
  }

  /**
   * Get ticket distributions
   *
   * @param pagination Pagination object
   * @returns Returns ticket distributions with pagination
   */
  async getTicketDistributions(conditions: Conditions, pagination: Pagination) {
    const res = await this.erp.getDocs<JJTicketDistribution>('Ticket Distribution', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: 'distributedAt',
      sortType: 'DESC',
      ...conditions,
    });
    return res.result.map((distribution) => this.populateTicketDistribution(distribution));
  }

  /**
   * Get ticket distributions from given event
   *
   * @param eventId Event's ID
   * @param pagination Pagination object
   * @returns Returns ticket distributions from given event with pagination
   */
  async getTicketDistributionsByEvent(eventId: number, pagination: Pagination) {
    const res = await this.erp.getDocs<JJTicketDistribution>('Ticket Distribution', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: '=',
      sortBy: 'distributedAt',
      sortType: 'DESC',
    });
    return res.result.map((distribution) => this.populateTicketDistribution(distribution));
  }

  /**
   * Get ticket distribution by ID
   *
   * @param id Ticket distribution's ID
   * @returns Returns ticket distribution object
   */
  async getTicketDistributionById(id: number) {
    const res = await this.erp.getDoc<JJTicketDistribution>('Ticket Distribution', id);
    return this.populateTicketDistribution(res);
  }

  /**
   * Get tickets from given event
   *
   * @param eventId Event's ID
   * @param pagination Pagination object
   * @returns Returns tickets from given event with pagination
   */
  async getTicketsByEvent(eventId: number, pagination: Pagination) {
    const res = await this.erp.getDocs<JJTicket>('Ticket', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      event_id: eventId,
      event_id_type: '=',
    });
    return res.result.map((ticket) => this.populateTicket(ticket));
  }

  /**
   * Get tickets from given ticket distribution
   *
   * @param distributionId Ticket distribution's ID
   * @param pagination Pagination object
   * @returns Returns tickets from given ticket distribution with pagination
   */
  async getTicketsByTicketDistribution(distributionId: number, pagination: Pagination) {
    const res = await this.erp.getDocs<JJTicket>('Ticket', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      ticket_distribution_id: distributionId,
      ticket_distribution_id_type: '=',
    });
    return res.result.map((ticket) => this.populateTicket(ticket));
  }

  /**
   * Get rewards
   *
   * @param pagination Pagination object
   * @returns Returns ticket distributions from given event with pagination
   */
  async getRewards(conditions: Conditions, pagination: Pagination) {
    const res = await this.erp.getDocs<JJWinner>('Winner', {
      hasPk: true,
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: 'doc_createdDate',
      sortType: 'DESC',
      fromApp: true,
      ...conditions,
    });
    return res.result.map((res) => {
      res.drawing_result = res.drawing_result[0];
      res.event_prize = res.event_prize[0];
      res.ticket = res.ticket[0];
      res.merchant = res.merchant[0];
      res.drawing_result.event = res.drawing_result.event[0];
      return res;
    });
  }

  /**
   * Get ticket distribution by ID
   *
   * @param id Ticket distribution's ID
   * @returns Returns ticket distribution object
   */
  async getRewardById(id: number) {
    const res = await this.erp.getDoc<JJWinner>('Winner', id, { hasPk: true });
    res.ticket = res.ticket[0];
    res.ticket.event = res.ticket.event[0];
    res.ticket.ticket_distribution = res.ticket.ticket_distribution[0];
    res.drawing_result = res.drawing_result[0];
    res.event_prize = res.event_prize[0];
    return res;
  }

  /**
   * Get users from given merchant
   *
   * @param merchantId Merchant's ID
   * @param pagination Pagination object
   * @returns Returns users from given merchant with pagination
   */
  async getUsersByMerchant(merchantId: number, pagination: Pagination) {
    const res = await this.erp.getDocs<JJUser>('User', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      merchant_id: merchantId,
      merchant_id_type: '=',
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
    });
    return res.result.map((user) => this.populateUser(user));
  }

  /**
   * Get user by doc user's ID
   *
   * @param docUserId Doc user's ID
   * @returns Returns user object
   */
  async getUserByDocUser(docUserId: number) {
    const res = await this.erp.getDocs<JJUser>('User', {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
    });
    return res.result.map((user) => this.populateUser(user))[0];
  }

  /**
   * Get user by ID
   *
   * @param userId User's ID
   * @returns Returns user object
   */
  async getUserById(userId: number) {
    const res = await this.erp.getDoc<JJUser>('User', userId);
    return this.populateUser(res);
  }

  /**
   * Get user roles
   *
   * @returns Returns all user roles
   */
  async getUserRoles() {
    const res = await this.erp.getDocs<JJUserRole>('User Role');
    return res.result;
  }

  /**
   * Get user roles by merchant user
   *
   * @returns Returns available user roles for merchant user
   */
  async getUserRolesByMerchant() {
    const roles = await this.getUserRoles();
    return roles.filter((role) => role.code != UserRole.SYSTEM_ADMIN);
  }

  /**
   * Issue tickets
   *
   * @param application Create object
   * @returns Returns create esponse from SWS ERP
   */
  issueTickets(application: JJTicketDistributionApplication) {
    return this.erp.postDoc('Ticket Distribution Application', application);
  }

  /**
   * Create user
   *
   * @param user Create object
   * @returns Returns create response from SWS ERP
   */
  createUser(user: JJUser) {
    return this.erp.postDoc('User', user, { autoSubmit: true });
  }

  /**
   * Update user by ID
   *
   * @param userId User ID
   * @param user Update object
   * @returns Returns update response from SWS ERP
   */
  updateUser(userId: number, user: Partial<JJUser>) {
    return this.erp.putDoc('User', userId, user);
  }

  /**
   * create new customer
   *
   * @param customer Customer's object
   * @returns Returns create response from SWS ERP
   */
  createCustomer(customer: JJCustomer) {
    return this.erp.postDoc('Customer', customer, { autoSubmit: true });
  }

  /**
   * Sign in with customer credential
   *
   * @param phone Customer's phone
   * @param password Customer's password
   * @returns Returns customer's profile
   */
  signInCustomer(phone: string, password: string) {
    return this.erp.signInUser('Customer', phone, password);
  }

  /**
   * Get users from given merchant
   *
   * @param merchantId Merchant's ID
   * @param pagination Pagination object
   * @returns Returns users from given merchant with pagination
   */
  async getCustomers(conditions: Conditions, pagination: Pagination) {
    const res = await this.erp.getDocs<JJCustomer>('Customer', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result;
  }

  /**
   * Get customer by customer's ID
   *
   * @param customerId Customer's ID
   * @returns Returns customer object
   */
  async getCustomerById(customerId: number) {
    const res = await this.erp.getDocs<JJCustomer>('Customer', {
      doc_id: customerId,
      doc_id_type: '=',
    });
    return res.result[0];
  }

  /**
   * Get customer by customer's phone number
   *
   * @param phone Customer's phone number
   * @returns Returns customer object
   */
  async getCustomerByPhone(phone: string) {
    const res = await this.erp.getDocs<JJCustomer>('Customer', {
      phone,
      phone_type: '=',
    });
    return res.result[0];
  }

  /**
   * Get customer id
   *
   * @returns Returns customer id
   */
  async getCustomerId() {
    const customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
    return customer.doc_id;
  }

  /**
   * Update customer by ID
   *
   * @param customerId Customer ID
   * @param user Update object
   * @returns Returns update response from SWS ERP
   */
  updateCustomer(customerId: number, customer: Partial<JJCustomer>) {
    return this.erp.putDoc('Customer', customerId, customer);
  }

  /**
   * Change customer password
   *
   * @param customerId Customer ID
   * @param body Update object
   * @returns Returns update response from SWS ERP
   */
  changePassword(
    customerId: number,
    body: {
      old_password: string;
      new_password: string;
    },
  ) {
    return this.erp.changePassword(customerId, body, 'Customer');
  }

  /**
   * Get products
   *
   * @returns Returns product list
   */
  async getProducts() {
    const res = await this.erp.getDocs<JJProduct>('Product');
    return res.result.map((product) => this.populateProduct(product));
  }

  async createCapturePaymentRequest(request: JJCapturePaymentRequest) {
    // let res = await this.erp.postDoc('Capture Payment Request', request);
    // this.walletChange.next({
    //   beUpdated: true,
    // });
    // return res;

    return this.erp.postDoc('Capture Payment Request', request);
  }

  updateCapturePaymentRequest(requestId: number, request: Partial<JJCapturePaymentRequest>) {
    return this.erp.putDoc('Capture Payment Request', requestId, request);
  }

  async getWalletByNo(walletNo: string) {
    const res = await this.erp.getDocs<JJWallet>('Wallet', {
      walletNo,
      walletNo_type: '=',
    });
    return res?.result?.length ? res.result[0] : null;
  }

  async getMyWallet(role: UserType) {
    switch (role) {
      case UserType.CUSTOMER:
        const customer = await this.storage.get(`${COMPANY_CODE}_CUSTOMER`);
        return this.getWalletByCustomerId(customer.doc_id);
      default:
        const merchantId = await this.getMyMerchantId();
        return this.getWalletByMerchantId(merchantId);
    }
  }

  async getWalletByMerchantId(merchantId: number) {
    const res = await this.erp.getDocs<JJWallet>('Wallet', {
      merchant_id: merchantId,
      merchant_id_type: '=',
    });
    return res?.result?.length ? res.result[0] : null;
  }

  async getWalletByCustomerId(customerId: number) {
    const res = await this.erp.getDocs<JJWallet>('Wallet', {
      customer_id: customerId,
      customer_id_type: '=',
    });
    return res?.result?.length ? res.result[0] : null;
  }

  updateWalletTransaction(transactionId: number, transaction: Partial<JJWalletTransaction>) {
    return this.erp.putDoc('Wallet Transaction', transactionId, transaction);
  }

  async getWalletTransactionsByCapturePaymentRequest(requestRefNo: string) {
    const res = await this.erp.getDocs<JJWalletTransaction>('Wallet Transaction', {
      reference3: requestRefNo,
      reference3_type: '=',
    });
    return res.result;
  }

  async getWalletTransactionsByWalletId(walletId: number, pagination: Pagination) {
    const res = await this.erp.getDocs<JJWalletTransaction>('Wallet Transaction', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      wallet_id: walletId,
      wallet_id_type: '=',
      sortBy: 'doc_createdDate',
      sortType: 'DESC',
    });
    return res.result;
  }

  getWalletTransactionById(transactionId: number) {
    return this.erp.getDoc<JJWalletTransaction>('Wallet Transaction', transactionId);
  }

  /**
   * Calculate the total of free point
   *
   * @param eventId event id
   * @returns Returns amount of point
   */
  async getActivePointRule(eventId: number, amountExpense: number, pointExpense: number) {
    const res = await this.erp.getDocs<JJPointRule>('Point Rule', {
      getActive: true,
      event_id: eventId,
      event_id_type: '=',
      amountExpense,
      pointExpense,
    });
    return res.result[0];
  }

  async createMerchantWallet() {
    const merchantId = await this.getMyMerchantId();
    const permissions = await this.erp.getDocs('Wallet Permission', {
      merchant_id: merchantId,
      merchant_id_type: '=',
    });
    if (permissions.result.length == 0) {
      const walletRes = await this.erp.postDoc('Wallet', {
        walletNo: '',
        type: WalletType.MERCHANT,
      });
      const permissionRes = await this.erp.postDoc('Wallet Permission', {
        wallet_id: walletRes.doc_id,
        merchant_id: merchantId,
      });
      return permissionRes;
    }
  }

  async createCustomerWallet() {
    const customerId = await this.getCustomerId();
    const permissions = await this.erp.getDocs('Wallet Permission', {
      customer_id: customerId,
      customer_id_type: '=',
    });
    if (permissions.result.length == 0) {
      const walletRes = await this.erp.postDoc('Wallet', {
        walletNo: '',
        type: WalletType.CUSTOMER,
      });
      const permissionRes = await this.erp.postDoc('Wallet Permission', {
        wallet_id: walletRes.doc_id,
        customer_id: customerId,
      });
      return permissionRes;
    }
  }

  /**
   * Populate user to map Gogo CMS usage
   *
   * @param user User object
   * @returns Returns user object with populated properties
   */
  private populateUser(user: JJUser) {
    user.roleTranslation = this.utils.parseCmsTranslation(user.translate?.role, user.role);
    return user;
  }

  /**
   * Populate ticket to map Gogo CMS usage
   *
   * @param ticket Ticket object
   * @returns Returns ticket object with populated properties
   */
  private populateTicket(ticket: JJTicket) {
    ticket.statusTranslation = this.utils.parseCmsTranslation(ticket.translate?.status, ticket.status);
    return ticket;
  }

  /**
   * Populate ticket distribution to map Gogo CMS usage
   *
   * @param distribution Ticket distribution object
   * @returns Returns ticket distribution object with populated properties
   */
  private populateTicketDistribution(distribution: JJTicketDistribution) {
    if (distribution.product) {
      distribution.product = this.populateProduct(distribution.product);
    }
    if (distribution.event) {
      distribution.event = this.populateEvent(distribution.event);
    }
    return distribution;
  }

  /**
   * Populate merchant to map Gogo CMS usage
   *
   * @param merchant Merchant object
   * @returns Returns merchant object with populated properties
   */
  private populateMerchant(merchant: JJMerchant) {
    merchant.fullAddress =
      `${merchant.addressLine1}` +
      `${merchant.addressLine2 ? ', ' + merchant.addressLine2 : ''}, ` +
      `${merchant.postalCode} ` +
      `${merchant.city}, ` +
      `${merchant.state} ` +
      `${merchant.country}`;
    return merchant;
  }

  /**
   * Populate product to map Gogo CMS usage
   *
   * @param product Product object
   * @returns Returns product object with populated properties
   */
  private populateProduct(product: JJProduct) {
    product.nameTranslation = this.utils.parseCmsTranslation(product.translate?.name, product.name);
    return product;
  }

  /**
   * Populate event to map Gogo CMS usage
   *
   * @param event Event object
   * @returns Returns event object with populated properties
   */
  private populateEvent(event: JJEvent) {
    event.nameTranslation = this.utils.parseCmsTranslation(event.translate?.name, event.name);
    return event;
  }
}

export interface OnChangeEvent {
  beUpdated?: boolean;
  beRemoved?: boolean;
}

export interface UserEvent extends OnChangeEvent {
  currentUserId: number;
}

export interface CustomerEvent extends OnChangeEvent {
  currentCustomerId: number;
}
