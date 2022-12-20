import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Conditions, DocStatus, GetOptions, Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';
import { SharedComponent } from '../shared';
import {
  AccountOptions,
  COMPANY_CODE,
  JJAnnouncement,
  JJBank,
  JJBankAccount,
  JJCapturePaymentRequest,
  JJContentPage,
  JJCustomer,
  JJDepositMethod,
  JJDepositRequest,
  JJEvent,
  JJEventPrize,
  JJEventStatus,
  JJFab,
  JJMerchant,
  JJPinVerification,
  JJPointRule,
  JJProduct,
  JJScratchAndWinEvent,
  JJScratchAndWinPrize,
  JJScratchAndWinRule,
  JJScratchRequest,
  JJSlideshow,
  JJTicket,
  JJTicketDistribution,
  JJTicketDistributionApplication,
  JJTicketGenerationMethod,
  JJTransferRequest,
  JJUser,
  JJUserRole,
  JJWallet,
  JJWalletTransaction,
  JJWinner,
  JJWithdrawMethod,
  JJWithdrawRequest,
  LANGUAGE_STORAGE_KEY,
} from '../typings';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService extends SharedComponent {
  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;
  private initialized = false;

  constructor(
    injector: Injector,
    private title: Title,
    private appUtils: AppUtils,
    private cmsUtils: CmsUtils,
    private storage: LocalStorageService,
    private translate: TranslateService,
    private swsErp: SwsErpService,
    private common: CommonService,
  ) {
    super();
    this.SWS_ERP_COMPANY_TOKEN = injector.get(SWS_ERP_COMPANY);
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.title.setTitle('JJ Member');
    this.appUtils.loadTemplateTheme('jj');
    this.SWS_ERP_COMPANY_TOKEN.next(COMPANY_CODE);
    const storedLang = await this.storage.get(LANGUAGE_STORAGE_KEY);
    if (storedLang) {
      await this.translate.use(storedLang).toPromise();
    }
    this.initialized = true;
  }

  async getUserRoles() {
    const res = await this.swsErp.getDocs<JJUserRole>('User Role');
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ User
  // -----------------------------------------------------------------------------------------------------

  async getUsers(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJUser>('User', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result.map((user) => this.populateUser(user));
  }

  async getUserById(userId: number) {
    const res = await this.swsErp.getDoc<JJUser>('User', userId);
    return res;
  }

  async getUserByDocUserId(docUserId: number, accountOptions: AccountOptions = {}) {
    const conditions: Conditions = {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
      ...accountOptions,
    };

    const res = await this.getUsers(this.defaultPage, conditions);
    return res[0];
  }

  async getWalletsByMerchantId(merchantId: number, conditions: Conditions = {}) {
    let query: GetOptions = {
      merchant_id: merchantId,
      merchant_id_type: '=',
      ...conditions,
    };
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', query);
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
    const res = await this.swsErp.getDocs<JJCustomer>('Customer', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      doc_status: DocStatus.SUBMIT,
      doc_status_type: '=',
      ...conditions,
    });
    return res.result;
  }

  async getCustomerById(customerId: number, accountOptions: AccountOptions = {}) {
    const res = await this.swsErp.getDoc<JJCustomer>('Customer', customerId, {
      ...accountOptions,
    });
    return res;
  }

  async getCustomerByPhone(phone: string) {
    const res = await this.swsErp.getDocs<JJCustomer>('Customer', {
      phone,
      phone_type: '=',
    });
    return res.result[0];
  }

  async getWalletsByCustomerId(customerId: number, conditions: Conditions = {}) {
    let query: GetOptions = {
      customer_id: customerId,
      customer_id_type: '=',
      ...conditions,
    };
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', query);
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

  updateWallet(walletId: number, wallet: Partial<JJWallet>) {
    return this.swsErp.putDoc('Wallet', walletId, wallet);
  }

  async getWalletByNo(walletNo: string, conditions: Conditions = {}) {
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', {
      walletNo: walletNo,
      walletNo_type: '=',
      ...conditions,
    });
    return res.result.map((wallet) => this.populateWallet(wallet))[0];
  }

  async getWalletTransactions(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJWalletTransaction>('Wallet Transaction', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result.map((transaction) => this.populateWalletTransaction(transaction));
  }

  async getWalletTransactionsByWalletId(walletId: number, pagination: Pagination) {
    const res = await this.getWalletTransactions(pagination, {
      wallet_id: walletId,
      wallet_id_type: '=',
      sortBy: 'doc_createdDate',
      sortType: 'desc',
    });
    return res;
  }

  async getWalletTransactionById(transactionId: number) {
    const res = await this.swsErp.getDoc<JJWalletTransaction>('Wallet Transaction', transactionId);
    return this.populateWalletTransaction(res);
  }

  createDepositRequest(request: JJDepositRequest) {
    return this.swsErp.postDoc('Deposit Request', request);
  }

  updateDepositRequest(requestId: number, request: Partial<JJDepositRequest>) {
    return this.swsErp.putDoc('Deposit Request', requestId, request);
  }

  async getDepositRequestById(requestId: number) {
    const res = await this.swsErp.getDoc<JJDepositRequest>('Deposit Request', requestId);
    return res;
  }

  async getDepositRequestByRefNo(refNo: string) {
    const res = await this.getDepositRequests(this.defaultPage, {
      refNo: refNo,
      refNo_type: '=',
    });
    return this.populateDepositRequest(res[0]);
  }

  async getDepositRequests(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJDepositRequest>('Deposit Request', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  async getDepositMethods() {
    const res = await this.swsErp.getDocs<JJDepositMethod>('Deposit Method', {
      isVisible: 1,
      isVisible_type: '=',
    });
    return res.result;
  }

  createWithdrawRequest(request: JJWithdrawRequest) {
    return this.swsErp.postDoc('Withdraw Request', request);
  }

  async getWithdrawRequestById(requestId: number) {
    const res = await this.swsErp.getDoc<JJWithdrawRequest>('Withdraw Request', requestId);
    return res;
  }

  async getWithdrawRequests(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJWithdrawRequest>('Withdraw Request', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  async getWithdrawMethods() {
    const res = await this.swsErp.getDocs<JJWithdrawMethod>('Withdraw Method', {
      isVisible: 1,
      isVisible_type: '=',
    });
    return res.result;
  }

  createTransferRequest(request: JJTransferRequest) {
    return this.swsErp.postDoc('Transfer Request', request);
  }

  createPinVerification(verification: JJPinVerification) {
    return this.swsErp.postDoc('Pin Verification', verification);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Bank
  // -----------------------------------------------------------------------------------------------------

  async getDefaultBankAccount() {
    const query: GetOptions = {
      default: true,
      random: true,
    };
    const res = await this.swsErp.getDocs<JJBankAccount>('Bank Account', query);
    return res.result[0];
  }

  async getBanks(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJBank>('Bank', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  /**
   * let accounts = await this.core.getBankAccounts(this.accountsPage, {
   *  customer_id: this.auth.currentUser.doc_id
   * })
   */
  async getBankAccounts(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJBankAccount>('Bank Account', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  /**
   * this.accountId = params.id;
   * 
   * onSubmit(data) {
   *  // CONFIRM ALERT
   *  await this.core.updateBankAccount(this.accountId, data);
   * }
   */
  updateBankAccount(accountId: number, account: JJBankAccount) {
    return this.swsErp.putDoc('Bank Account', accountId, account);
  }

  /**
   * onSubmit(data) {
   *  // CONFIRM ALERT
   *  // data: { accountNo: "12345", bank_id: 1, holderName: "Tan Zhi De" }
   *  let account: JJBankAccount = {
   *    ...data,
   *    customerId: this.auth.currentUser.doc_id
   *  }
   *  await this.core.createBankAccount();
   * }
   */
  createBankAccount(account: JJBankAccount) {
    return this.swsErp.postDoc('Bank Account', account);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Event
  // -----------------------------------------------------------------------------------------------------

  async getEvents(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJEvent>('Event', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result.map((event) => this.populateEvent(event));
  }

  async getEventStatuses() {
    const res = await this.swsErp.getDocs<JJEventStatus>('Event Status');
    return res.result;
  }

  async getTicketGenerationMethods() {
    const res = await this.swsErp.getDocs<JJTicketGenerationMethod>('Ticket Generation Method');
    return res.result;
  }

  async getOngoingEvents(pagination: Pagination, options: { withLocation?: boolean } = {}) {
    const conditions: Conditions = {};
    if (options.withLocation) {
      const coords = await this.common.getCurrentCoords();
      conditions.longitude = coords.longitude;
      conditions.latitude = coords.latitude;
      delete conditions.withLocation;
    }
    const events = await this.getEvents(pagination, {
      status: 'ACTIVE',
      status_type: '=',
      hasFk: true,
      ...conditions,
    });
    return events;
  }

  async getMerchantEvents() {
    const res = await this.swsErp.getDocs<JJEvent>('Event', {
      status: 'ACTIVE',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'DESC',
      fromMerchant: true,
    });
    return res.result.map((event) => this.populateEvent(event));
  }

  async getActivePointRule(eventId: number, amountExpense: number, pointExpense: number) {
    const res = await this.swsErp.getDocs<JJPointRule>('Point Rule', {
      event_id: eventId,
      event_id_type: '=',
      amountExpense,
      pointExpense,
      getActive: true,
    });
    return res.result[0];
  }

  async getActiveSnwRule(eventId: number, amountExpense: number, pointExpense: number) {
    const res = await this.swsErp.getDocs<JJScratchAndWinRule>('Scratch And Win Rule', {
      event_id: eventId,
      event_id_type: '=',
      amountExpense,
      pointExpense,
      getActive: true,
    });
    return res.result[0];
  }

  async getEventById(eventId: number, conditions: Conditions = {}) {
    if (conditions.withLocation) {
      const coords = await this.common.getCurrentCoords();
      conditions.longitude = coords.longitude;
      conditions.latitude = coords.latitude;
      delete conditions.withLocation;
    }
    const res = await this.swsErp.getDoc<JJEvent>('Event', eventId, <GetOptions>conditions);
    return this.populateEvent(res);
  }

  async getTicketDistributions(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJTicketDistribution>('Ticket Distribution', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result.map((distribution) => this.populateTicketDistribution(distribution));
  }

  async getTicketDistributionById(distributionId: number) {
    const res = await this.swsErp.getDoc<JJTicketDistribution>('Ticket Distribution', distributionId);
    return this.populateTicketDistribution(res);
  }

  async getTickets(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJTicket>('Ticket', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  async getWinners(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs('Winner', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
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
    const res = await this.swsErp.getDocs<JJProduct>('Product');
    return res.result.map((product) => this.populateProduct(product));
  }

  async getMerchants(pagination: Pagination, conditions: Conditions = {}) {
    if (conditions.withLocation) {
      const coords = await this.common.getCurrentCoords();
      conditions.longitude = coords.longitude;
      conditions.latitude = coords.latitude;
      delete conditions.withLocation;
    }
    const res = await this.swsErp.getDocs<JJMerchant>('Merchant', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    console.log(res);
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Content
  // -----------------------------------------------------------------------------------------------------

  async getSlideshowByCode(code: string) {
    const res = await this.swsErp.getDocs<JJSlideshow>('Slideshow', {
      code,
      code_type: '=',
      isActive: 1,
      isActive_type: '=',
    });
    return res.result.map((slideshow) => this.populateSlideshow(slideshow))[0];
  }

  async getAnnouncements() {
    const res = await this.swsErp.getDocs<JJAnnouncement>('Announcement', {
      isActive: 1,
      isActive_type: '=',
    });
    return res.result;
  }

  async getContentPagesByGroupCode(groupCode: string) {
    const res = await this.swsErp.getDocs<JJContentPage>('Content Page', { groupCode });
    return res.result;
  }

  async getContentPageById(pageId: number) {
    const res = await this.swsErp.getDoc<JJContentPage>('Content Page', pageId);
    return res;
  }

  async getFabsByGroupCode(groupCode: string, conditions: Conditions = {}) {
    let query: GetOptions = {
      groupCode: groupCode,
      ...conditions,
    };
    let res = await this.swsErp.getDocs<JJFab>('FAB', query);
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Scratch and Win Event
  // -----------------------------------------------------------------------------------------------------

  createScratchRequest(request: JJScratchRequest) {
    return this.swsErp.postDoc('Scratch Request', request);
  }

  async getScratchRequests(pagination: Pagination, conditions: Conditions = {}) {
    let query: GetOptions = {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    };
    let res = await this.swsErp.getDocs<JJScratchRequest>('Scratch Request', query);
    return res.result.map((request) => this.populateScratchRequest(request));
  }

  async getScratchAndWinEventById(eventId: number, options: { withLocation?: boolean } = {}) {
    const conditions: Conditions = {};
    if (options.withLocation) {
      const coords = await this.common.getCurrentCoords();
      conditions.longitude = coords.longitude;
      conditions.latitude = coords.latitude;
      delete conditions.withLocation;
    }
    const res = await this.swsErp.getDoc<JJScratchAndWinEvent>(
      'Scratch And Win Event',
      eventId,
      <GetOptions>conditions,
    );
    return res;
  }

  async getScratchAndWinPrizes(conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJScratchAndWinPrize>('Scratch And Win Prize', {
      sortBy: 'worth',
      sortType: 'DESC',
      ...conditions,
    });
    return res.result;
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
    if (wallet.walletCurrency) {
      wallet.displayCurrency = {
        code: wallet.walletCurrency.code,
        displaySymbol: wallet.walletCurrency.symbol,
        symbolPosition: wallet.walletCurrency.symbolPosition,
        precision: wallet.walletCurrency.digits,
      };
    }
    if (wallet.walletType) {
      wallet.icon = wallet.walletType.icon;
      wallet.colors = wallet.walletType.colors;
    }
    return wallet;
  }

  populateDepositRequest(request: JJDepositRequest) {
    if (!request) {
      return null;
    }
    request.wallet = this.populateWallet(request.wallet);
    return request;
  }

  populateScratchAndWinPrize(prize: JJScratchAndWinPrize) {
    if (!prize) {
      return null;
    }
    prize.nameTranslation = this.cmsUtils.parseCmsTranslation(
      prize.translate ? prize.translate.name : prize.name,
      prize.name,
    );
    return prize;
  }

  populateScratchRequest(request: JJScratchRequest) {
    if (!request) {
      return null;
    }
    request.prize = this.populateScratchAndWinPrize(request.prize);
    return request;
  }
}
