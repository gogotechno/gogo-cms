import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Conditions, DocStatus, Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';
import {
  COMPANY_CODE,
  JJAnnouncement,
  JJCapturePaymentRequest,
  JJContentPage,
  JJCustomer,
  JJEvent,
  JJMerchant,
  JJPointRule,
  JJProduct,
  JJScratchAndWinRule,
  JJSlideshow,
  JJTicket,
  JJTicketDistribution,
  JJTicketDistributionApplication,
  JJUser,
  JJUserRole,
  JJWallet,
  JJWalletTransaction,
  LANGUAGE_STORAGE_KEY,
} from '../typings';

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

  async getUserRoles() {
    let res = await this.swsErp.getDocs<JJUserRole>('User Role');
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ User
  // -----------------------------------------------------------------------------------------------------

  async getUsers(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJUser>('User', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result.map((user) => this.populateUser(user));
  }

  async getUserById(userId: number) {
    let res = await this.swsErp.getDoc<JJUser>('User', userId);
    return res;
  }

  async getUserByDocUserId(docUserId: number) {
    let page: Pagination = {
      itemsPerPage: 1,
      currentPage: 1,
    };

    let conditions: Conditions = {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
    };

    let res = await this.getUsers(page, conditions);
    return res[0];
  }

  async getWalletsByMerchantId(merchantId: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      merchantId: merchantId,
      merchantId_type: '=',
    });
    return res.result;
  }

  createUser(user: JJUser) {
    return this.swsErp.postDoc('User', user, {
      autoSubmit: true,
    });
  }

  updateUser(userId: number, user: Partial<JJUser>) {
    return this.swsErp.putDoc('User', userId, user);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Customer
  // -----------------------------------------------------------------------------------------------------

  async getCustomers(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJCustomer>('Customer', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result;
  }

  async getCustomerById(customerId: number) {
    let res = await this.swsErp.getDoc<JJCustomer>('Customer', customerId);
    return res;
  }

  async getCustomerByPhone(phone: string) {
    let res = await this.swsErp.getDocs<JJCustomer>('Customer', {
      phone: phone,
      phone_type: '=',
    });
    return res.result[0];
  }

  async getWalletsByCustomerId(customerId: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      customerId: customerId,
      customerId_type: '=',
    });
    return res.result;
  }

  createCustomer(customer: JJCustomer) {
    return this.swsErp.postDoc('Customer', customer, {
      autoSubmit: true,
    });
  }

  updateCustomer(customerId: number, customer: Partial<JJCustomer>) {
    return this.swsErp.putDoc('Customer', customerId, customer);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Wallet
  // -----------------------------------------------------------------------------------------------------

  createCapturePaymentRequest(request: JJCapturePaymentRequest) {
    return this.swsErp.postDoc('Capture Payment Request', request);
  }

  updateCapturePaymentRequest(requestId: number, request: Partial<JJCapturePaymentRequest>) {
    return this.swsErp.putDoc('Capture Payment Request', requestId, request);
  }

  async getWalletTransactionsByCapturePaymentRequest(requestRefNo: string) {
    let res = await this.swsErp.getDocs<JJWalletTransaction>('Wallet Transaction', {
      reference3: requestRefNo,
      reference3_type: '=',
    });
    return res.result;
  }

  updateWalletTransaction(transactionId: number, transaction: Partial<JJWalletTransaction>) {
    return this.swsErp.putDoc('Wallet Transaction', transactionId, transaction);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Event
  // -----------------------------------------------------------------------------------------------------

  async getEvents(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      ...conditions,
    });
    return res.result;
  }

  async getOngoingEvents(pagination: Pagination) {
    let events = await this.getEvents(pagination, {
      status: 'ACTIVE',
      status_type: '=',
      hasFk: true,
    });
    return events;
  }

  async getMerchantEvents() {
    let res = await this.swsErp.getDocs<JJEvent>('Event', {
      status: 'ACTIVE',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'desc',
      fromMerchant: true,
    });
    return res.result.map((event) => this.populateEvent(event));
  }

  async getActivePointRule(eventId: number, amountExpense: number, pointExpense: number) {
    let res = await this.swsErp.getDocs<JJPointRule>('Point Rule', {
      event_id: eventId,
      event_id_type: '=',
      amountExpense: amountExpense,
      pointExpense: pointExpense,
      getActive: true,
    });
    return res.result[0];
  }

  async getActiveSnwRule(eventId: number, amountExpense: number, pointExpense: number) {
    let res = await this.swsErp.getDocs<JJScratchAndWinRule>('Scratch And Win Rule', {
      event_id: eventId,
      event_id_type: '=',
      amountExpense: amountExpense,
      pointExpense: pointExpense,
      getActive: true,
    });
    return res.result[0];
  }

  async getEventById(eventId: number, conditions: Conditions = {}) {
    let res = await this.swsErp.getDoc<JJEvent>('Event', eventId, {
      hasFk: true,
    });
    return this.populateEvent(res);
  }

  async getTicketDistributions(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJTicketDistribution>('Ticket Distribution', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      ...conditions,
    });
    return res.result.map((distribution) => this.populateTicketDistribution(distribution));
  }

  async getTicketDistributionById(distributionId: number) {
    let res = await this.swsErp.getDoc<JJTicketDistribution>('Ticket Distribution', distributionId);
    return this.populateTicketDistribution(res);
  }

  async getTickets(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJTicket>('Ticket', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      ...conditions,
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

  issueTickets(application: JJTicketDistributionApplication) {
    return this.swsErp.postDoc('Ticket Distribution Application', application);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Merchant
  // -----------------------------------------------------------------------------------------------------

  async getProducts() {
    let res = await this.swsErp.getDocs<JJProduct>('Product');
    return res.result.map((product) => this.populateProduct(product));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Content
  // -----------------------------------------------------------------------------------------------------

  async getSlideshowByCode(code: string) {
    let res = await this.swsErp.getDocs<JJSlideshow>('Slideshow', {
      code: code,
      code_type: '=',
      isActive: 1,
      isActive_type: '=',
    });
    return res.result.map((slideshow) => this.populateSlideshow(slideshow))[0];
  }

  async getAnnouncements() {
    let res = await this.swsErp.getDocs<JJAnnouncement>('Announcement', {
      isActive: 1,
      isActive_type: '=',
    });
    return res.result;
  }

  async getContentPagesByGroupCode(groupCode: string) {
    let res = await this.swsErp.getDocs<JJContentPage>('Content Page', {
      groupCode: groupCode,
    });
    return res.result;
  }

  async getContentPageById(pageId: number) {
    let res = await this.swsErp.getDoc<JJContentPage>('Content Page', pageId);
    return res;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Mapper
  // -----------------------------------------------------------------------------------------------------

  populateUser(user: JJUser) {
    if (!user) {
      return null;
    }
    user.roleTranslation = this.cmsUtils.parseCmsTranslation(user.translate?.role, user.role);
    return user;
  }

  populateProduct(product: JJProduct) {
    if (!product) {
      return null;
    }
    product.nameTranslation = this.cmsUtils.parseCmsTranslation(product.translate?.name, product.name);
    return product;
  }

  populateEvent(event: JJEvent) {
    if (!event) {
      return null;
    }
    event.nameTranslation = this.cmsUtils.parseCmsTranslation(event.translate?.name, event.name);
    return event;
  }

  populateTicketDistribution(distribution: JJTicketDistribution) {
    if (!distribution) {
      return null;
    }
    distribution.event = this.populateEvent(distribution.event);
    distribution.merchant = this.populateMerchant(distribution.merchant);
    distribution.product = this.populateProduct(distribution.product);
    distribution.freePoint = distribution.freePoint || 0;
    distribution.totalOfTickets = distribution.totalOfTickets || 0;
    distribution.totalOfSnwTickets = distribution.totalOfSnwTickets || 0;
    distribution.expense = distribution.expense || 0;
    distribution.pointExpense = distribution.pointExpense || 0;
    return distribution;
  }

  populateMerchant(merchant: JJMerchant) {
    if (!merchant) {
      return null;
    }
    merchant.fullAddress =
      `${merchant.addressLine1}` +
      `${merchant.addressLine2 ? ', ' + merchant.addressLine2 : ''}, ` +
      `${merchant.postalCode} ` +
      `${merchant.city}, ` +
      `${merchant.state} ` +
      `${merchant.country}`;
    return merchant;
  }

  populateSlideshow(slideshow: JJSlideshow) {
    if (!slideshow) {
      return null;
    }

    if (slideshow.items?.length) {
      slideshow.items = slideshow.items.map((item) => {
        item.messageTranslation = this.cmsUtils.parseCmsTranslation(item.message, item.message);
        return item;
      });
    }

    return slideshow;
  }
}
