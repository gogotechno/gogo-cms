import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Conditions, DocStatus, GetOptions, Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';
import {
  AccountOptions,
  COMPANY_CODE,
  JJAnnouncement,
  JJCapturePaymentRequest,
  JJContentPage,
  JJCustomer,
  JJEvent,
  JJEventPrize,
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
  JJWinner,
  LANGUAGE_STORAGE_KEY,
  WalletType,
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
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
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

  async getUserByDocUserId(docUserId: number, accountOptions: AccountOptions = {}) {
    let page: Pagination = {
      itemsPerPage: 1,
      currentPage: 1,
    };

    let conditions: Conditions = {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
      ...accountOptions,
    };

    let res = await this.getUsers(page, conditions);
    return res[0];
  }

  async getWalletsByMerchantId(merchantId: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      merchantId: merchantId,
      merchantId_type: '=',
    });
    return res.result.map((wallet) => this.populateWallet(wallet));
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
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result;
  }

  async getCustomerById(customerId: number, accountOptions: AccountOptions = {}) {
    let res = await this.swsErp.getDoc<JJCustomer>('Customer', customerId, {
      ...accountOptions,
    });
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
    return res.result.map((wallet) => this.populateWallet(wallet));
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

  async getWalletByNo(walletNo: number) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      walletNo: walletNo,
      walletNo_type: '=',
    });
    return res.result.map((wallet) => this.populateWallet(wallet))[0];
  }

  async getWalletTransactions(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJWalletTransaction>('Wallet Transaction', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      ...conditions,
    });
    return res.result.map((transaction) => this.populateWalletTransaction(transaction));
  }

  async getWalletTransactionsByWalletId(walletId: number, pagination: Pagination) {
    let res = await this.getWalletTransactions(pagination, {
      walletId: walletId,
      walletId_type: '=',
      sortBy: 'doc_createdDate',
      sortType: 'desc',
    });
    return res;
  }

  async getWalletTransactionById(transactionId: number) {
    let res = await this.swsErp.getDoc<JJWalletTransaction>('Wallet Transaction', transactionId);
    return this.populateWalletTransaction(res);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Event
  // -----------------------------------------------------------------------------------------------------

  async getEvents(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      ...conditions,
    });
    return res.result.map((event) => this.populateEvent(event));
  }

  async getOngoingEvents(pagination: Pagination, options: { withLocation?: boolean } = {}) {
    let conditions: Conditions = {};
    if (options['withLocation']) {
      let coordinates = await Geolocation.getCurrentPosition();
      conditions['longitude'] = coordinates.coords.longitude;
      conditions['latitude'] = coordinates.coords.latitude;
    }
    let events = await this.getEvents(pagination, {
      status: 'ACTIVE',
      status_type: '=',
      hasFk: true,
      ...conditions,
    });
    return events;
  }

  async getMerchantEvents() {
    let res = await this.swsErp.getDocs<JJEvent>('Event', {
      status: 'ACTIVE',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'DESC',
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
    if (conditions['withLocation']) {
      let coordinates = await Geolocation.getCurrentPosition();
      conditions['longitude'] = coordinates.coords.longitude;
      conditions['latitude'] = coordinates.coords.latitude;
      delete conditions['withLocation'];
    }
    let res = await this.swsErp.getDoc<JJEvent>('Event', eventId, <GetOptions>conditions);
    return this.populateEvent(res);
  }

  async getTicketDistributions(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJTicketDistribution>('Ticket Distribution', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
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
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      ...conditions,
    });
    return res.result;
  }

  async getWinners(pagination: Pagination, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs('Winner', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      ...conditions,
    });
    return res.result.map((winner) => this.populateWinner(winner));
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

  async getMerchants(pagination: Pagination, conditions: Conditions = {}) {
    if (conditions['withLocation']) {
      let coordinates = await Geolocation.getCurrentPosition();
      conditions['longitude'] = coordinates.coords.longitude;
      conditions['latitude'] = coordinates.coords.latitude;
      delete conditions['withLocation'];
    }
    let res = await this.swsErp.getDocs<JJMerchant>('Merchant', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy || null,
      sortType: pagination.sortOrder || null,
      ...conditions,
    });
    console.log(res);
    return res.result;
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
    product.nameTranslation = this.cmsUtils.parseCmsTranslation(
      product.translate ? product.translate.name : product.name,
      product.name,
    );
    return product;
  }

  populateEvent(event: JJEvent) {
    if (!event) {
      return null;
    }
    event.nameTranslation = this.cmsUtils.parseCmsTranslation(
      event.translate ? event.translate.name : event.name,
      event.name,
    );
    event.drewAt = event.drawingResult?.drewAt;
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
    distribution.freeSnwTickets = distribution.freeSnwTickets || 0;
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
    merchant.nameTranslation = this.cmsUtils.parseCmsTranslation(
      merchant.translate ? merchant.translate.name : merchant.name,
      merchant.name,
    );
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

  populateWalletTransaction(transaction: JJWalletTransaction) {
    if (!transaction) {
      return null;
    }

    transaction.amountText = transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`;
    return transaction;
  }

  populateEventPrize(prize: JJEventPrize) {
    if (!prize) {
      return null;
    }
    prize.nameTranslation = this.cmsUtils.parseCmsTranslation(
      prize.translate ? prize.translate.name : prize.name,
      prize.name,
    );
    return prize;
  }

  populateWinner(winner: JJWinner) {
    if (!winner) {
      return null;
    }
    winner.event = this.populateEvent(winner.event);
    winner.prize = this.populateEventPrize(winner.prize);
    winner.merchant = this.populateMerchant(winner.merchant);
    return winner;
  }

  populateWallet(wallet: JJWallet) {
    if (!wallet) {
      return null;
    }

    switch (wallet.type) {
      case WalletType.SNW:
        wallet.icon = 'gift';
        wallet.colors = {
          primary: '#FFC000',
          'primary-light': '#FFF2CC',
        };
        break;
      case WalletType.MERCHANT:
        wallet.icon = 'business';
        wallet.colors = {
          primary: '#70AD47',
          'primary-light': '#E2F0D9',
        };
      default:
        wallet.icon = 'wallet';
        break;
    }

    return wallet;
  }
}
