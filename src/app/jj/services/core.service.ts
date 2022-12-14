import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CmsFile } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { ErpImagePipe } from 'src/app/sws-erp.pipe';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Conditions, DocStatus, GetOptions, Pagination, SWS_ERP_COMPANY } from 'src/app/sws-erp.type';
import { Currency } from '../modules/wallets/wallets.types';
import { SharedComponent } from '../shared';
import {
  CheckConversionResult,
  COMPANY_CODE,
  JJAnnouncement,
  JJBank,
  JJBankAccount,
  JJCapturePaymentRequest,
  JJCheckConversionRequest,
  JJContentPage,
  JJCustomer,
  JJDepositMethod,
  JJDepositRequest,
  JJEvent,
  JJEventPrize,
  JJEventStatus,
  JJFab,
  JJIssueMode,
  JJMerchant,
  JJMiniProgram,
  JJPinVerification,
  JJPointRule,
  JJProduct,
  JJScratchAndWinEvent,
  JJScratchAndWinPrize,
  JJScratchAndWinPrizeType,
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
  JJWalletCurrency,
  JJWalletStatementReport,
  JJWalletTransaction,
  JJWalletType,
  JJWinner,
  JJWithdrawMethod,
  JJWithdrawRequest,
  LANGUAGE_STORAGE_KEY,
  UserRole,
} from '../typings';
import { AuthDataService } from './auth-data.service';
import { CommonService } from './common.service';

@Injectable()
export class CoreService extends SharedComponent {
  private readonly SWS_ERP_COMPANY_TOKEN: BehaviorSubject<string>;
  private initialized = false;

  constructor(
    injector: Injector,
    private title: Title,
    private appUtils: AppUtils,
    private cmsUtils: CmsUtils,
    private erpImg: ErpImagePipe,
    private storage: LocalStorageService,
    private translate: TranslateService,
    private swsErp: SwsErpService,
    private common: CommonService,
    private authData: AuthDataService,
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

  async getTotal(docType: string, conditions: Conditions = {}) {
    let query: GetOptions = {
      itemsPerPage: 0,
      currentPage: 1,
      ...conditions,
    };
    const res = await this.swsErp.getDocs(docType, query);
    return res.total;
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

  async getUserByDocUserId(docUserId: number, conditions: Conditions = {}) {
    let query: GetOptions = {
      doc_user_id: docUserId,
      doc_user_id_type: '=',
      ...conditions,
    };
    const res = await this.swsErp.getDocs<JJUser>('User', query);
    return res.result[0];
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

  async getCustomerById(customerId: number, conditions: Conditions = {}) {
    let query = <GetOptions>conditions;
    const res = await this.swsErp.getDoc<JJCustomer>('Customer', customerId, query);
    return res;
  }

  async getCustomerByPhone(phone: string) {
    const res = await this.swsErp.getDocs<JJCustomer>('Customer', {
      phone: phone,
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

  async getAllWallets(conditions: Conditions = {}) {
    let query = <GetOptions>conditions;
    let res = await this.swsErp.getDocs<JJWallet>('Wallet', query);
    return res.result.map((wallet) => this.populateWallet(wallet));
  }

  createCapturePaymentRequest(request: JJCapturePaymentRequest) {
    return this.swsErp.postDoc('Capture Payment Request', request);
  }

  updateWallet(walletId: number, wallet: Partial<JJWallet>) {
    return this.swsErp.putDoc('Wallet', walletId, wallet);
  }

  async getWalletTypes() {
    const res = await this.swsErp.getDocs<JJWalletType>('Wallet Type');
    return res.result;
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

  declineDepositRequest(requestId: number) {
    return this.swsErp.postDoc('Deposit Approval', {
      deposit_request_id: requestId,
      status: 'DECLINED',
    });
  }

  approveDepositRequest(requestId: number) {
    return this.swsErp.postDoc('Deposit Approval', {
      deposit_request_id: requestId,
      status: 'APPROVED',
    });
  }

  async getDepositRequestById(requestId: number) {
    const res = await this.swsErp.getDoc<JJDepositRequest>('Deposit Request', requestId);
    return this.populateDepositRequest(res);
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
    return res.result.map((request) => this.populateDepositRequest(request));
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

  updateWithdrawRequest(requestId: number, request: Partial<JJWithdrawRequest>) {
    return this.swsErp.putDoc('Withdraw Request', requestId, request);
  }

  declineWithdrawRequest(requestId: number) {
    return this.swsErp.postDoc('Withdraw Approval', {
      withdraw_request_id: requestId,
      status: 'DECLINED',
    });
  }

  approveWithdrawRequest(requestId: number, attachments?: CmsFile[]) {
    return this.swsErp.postDoc('Withdraw Approval', {
      withdraw_request_id: requestId,
      status: 'APPROVED',
      attachments: attachments,
    });
  }

  async getWithdrawRequestById(requestId: number) {
    const res = await this.swsErp.getDoc<JJWithdrawRequest>('Withdraw Request', requestId);
    return this.populateWithdrawRequest(res);
  }

  async getWithdrawRequestByRefNo(refNo: string) {
    const res = await this.getWithdrawRequests(this.defaultPage, {
      refNo: refNo,
      refNo_type: '=',
    });
    return this.populateWithdrawRequest(res[0]);
  }

  async getWithdrawRequests(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJWithdrawRequest>('Withdraw Request', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result.map((request) => this.populateWithdrawRequest(request));
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

  async createCheckConversionRequest(request: JJCheckConversionRequest) {
    let res = await this.swsErp.postDoc('Check Conversion Request', request);
    return res.data as CheckConversionResult;
  }

  async getWalletStatementReports(pagination: Pagination, conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJWalletStatementReport>('Wallet Statement Report', {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    });
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Bank
  // -----------------------------------------------------------------------------------------------------

  async getRandomBankAccount() {
    const query: GetOptions = {
      isSystem: true,
      isRandom: true,
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

  async getBankById(bankId: number) {
    const res = await this.swsErp.getDoc<JJBank>('Bank', bankId);
    return res;
  }

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

  async getBankAccountById(accountId: number) {
    const res = await this.swsErp.getDoc<JJBankAccount>('Bank Account', accountId);
    return res;
  }

  async createBankAccount(account: JJBankAccount) {
    switch (this.authData.getUserRole()) {
      case 'CUSTOMER':
        account['customerId'] = this.authData.getCurrentUser().doc_id;
        break;
      case 'MERCHANT_ADMIN':
        account['merchantId'] = await this.authData.findMyMerchantId();
        break;
      default:
        account['isSystem'] = true;
        break;
    }
    return this.swsErp.postDoc('Bank Account', account);
  }

  updateBankAccount(accountId: number, account: Partial<JJBankAccount>) {
    return this.swsErp.putDoc('Bank Account', accountId, account);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Event
  // -----------------------------------------------------------------------------------------------------

  createEvent(event: JJEvent) {
    return this.swsErp.postDoc('Event', event);
  }

  updateEvent(eventId: number, event: Partial<JJEvent>) {
    return this.swsErp.putDoc('Event', eventId, event);
  }

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

  async getIssueModes() {
    const res = await this.swsErp.getDocs<JJIssueMode>('Issue Mode');
    return res.result;
  }

  async getOngoingEvents(pagination: Pagination, conditions: Conditions = {}) {
    if (conditions.withLocation) {
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
    let query = <GetOptions>conditions;
    const res = await this.swsErp.getDoc<JJEvent>('Event', eventId, query);
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
    const res = await this.swsErp.getDocs<JJContentPage>('Content Page', {
      groupCode: groupCode,
    });
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

  async getMiniPrograms(userRole: UserRole) {
    let res = await this.swsErp.getDocs<JJMiniProgram>('Mini Program', {
      userRole: userRole,
    });
    return res.result.map((program) => this.populateMiniPrograms(program));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Scratch and Win Event
  // -----------------------------------------------------------------------------------------------------

  createScratchRequest(request: JJScratchRequest, conditions: Conditions = {}) {
    let query = <GetOptions>conditions;
    return this.swsErp.postDoc('Scratch Request', request, query);
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

  createScratchAndWinEvent(event: JJScratchAndWinEvent) {
    return this.swsErp.postDoc('Scratch And Win Event', event);
  }

  updateScratchAndWinEvent(eventId: number, event: Partial<JJScratchAndWinEvent>) {
    return this.swsErp.putDoc('Scratch And Win Event', eventId, event);
  }

  async getScratchAndWinEvents(pagination: Pagination, conditions: Conditions = {}) {
    let query: GetOptions = {
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      sortBy: pagination.sortBy,
      sortType: pagination.sortOrder,
      ...conditions,
    };
    const res = await this.swsErp.getDocs<JJScratchAndWinEvent>('Scratch And Win Event', query);
    return res.result.map((event) => this.populateScratchAndWinEvent(event));
  }

  async getScratchAndWinEventById(eventId: number, conditions: Conditions = {}) {
    if (conditions.withLocation) {
      const coords = await this.common.getCurrentCoords();
      conditions.longitude = coords.longitude;
      conditions.latitude = coords.latitude;
      delete conditions.withLocation;
    }
    let query = <GetOptions>conditions;
    const res = await this.swsErp.getDoc<JJScratchAndWinEvent>('Scratch And Win Event', eventId, query);
    return this.populateScratchAndWinEvent(res);
  }

  async getScratchAndWinPrizes(conditions: Conditions = {}) {
    const res = await this.swsErp.getDocs<JJScratchAndWinPrize>('Scratch And Win Prize', {
      sortBy: 'worth',
      sortType: 'DESC',
      ...conditions,
    });
    return res.result;
  }

  async getScratchAndWinPrizeTypes() {
    const res = await this.swsErp.getDocs<JJScratchAndWinPrizeType>('Scratch And Win Prize Type');
    return res.result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Converter
  // -----------------------------------------------------------------------------------------------------

  convertToCurrency(currency: JJWalletCurrency) {
    if (!currency) {
      return null;
    }
    let displayCurrency: Currency = {
      code: currency.code,
      displaySymbol: currency.symbol,
      symbolPosition: currency.symbolPosition,
      precision: currency.digits,
    };
    return displayCurrency;
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
    let name = product.translate ? product.translate.name : product.name;
    product.nameTranslation = this.cmsUtils.parseCmsTranslation(name, product.name);
    return product;
  }

  populateEvent(event: JJEvent) {
    if (!event) {
      return null;
    }
    let name = event.translate ? event.translate.name : event.name;
    let highlight = event.translate ? event.translate.highlight : event.highlight;
    let description = event.translate ? event.translate.description : event.description;
    let tnc = event.translate ? event.translate.tnc : event.tnc;
    event.nameTranslation = this.cmsUtils.parseCmsTranslation(name, event.name);
    event.highlightTranslation = this.cmsUtils.parseCmsTranslation(highlight, event.highlight);
    event.descriptionTranslation = this.cmsUtils.parseCmsTranslation(description, event.description);
    event.tncTranslation = this.cmsUtils.parseCmsTranslation(tnc, event.tnc);
    event.drewAt = event.drawingResult?.drewAt;
    if (event.prizes?.length) {
      event.prizes = event.prizes.map((prize) => this.populateEventPrize(prize));
    }
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
    let name = prize.translate ? prize.translate.name : prize.name;
    prize.nameTranslation = this.cmsUtils.parseCmsTranslation(name, prize.name);
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
    wallet.displayCurrency = this.convertToCurrency(wallet.walletCurrency);
    wallet.icon = wallet.walletType?.icon;
    wallet.colors = wallet.walletType?.colors;
    return wallet;
  }

  populateDepositRequest(request: JJDepositRequest) {
    if (!request) {
      return null;
    }
    request.wallet = this.populateWallet(request.wallet);
    request.displayCurrency = this.convertToCurrency(request.convertedCurrency);
    request.attachments = request.attachments.map((attachment) => {
      attachment.previewUrl = this.erpImg.transform(attachment.previewUrl);
      return attachment;
    });
    return request;
  }

  populateWithdrawRequest(request: JJWithdrawRequest) {
    if (!request) {
      return null;
    }
    request.wallet = this.populateWallet(request.wallet);
    request.displayCurrency = this.convertToCurrency(request.convertedCurrency);
    request.attachments = request.attachments.map((attachment) => {
      attachment.previewUrl = this.erpImg.transform(attachment.previewUrl);
      return attachment;
    });
    return request;
  }

  populateScratchAndWinEvent(event: JJScratchAndWinEvent) {
    if (!event) {
      return null;
    }
    let name = event.translate ? event.translate.name : event.name;
    let tnc = event.translate ? event.translate.tnc : event.tnc;
    let congratMessage = event.translate ? event.translate.congratulationMessage : event.congratulationMessage;
    let thankYouMessage = event.translate ? event.translate.thankYouMessage : event.thankYouMessage;
    event.nameTranslation = this.cmsUtils.parseCmsTranslation(name, event.name);
    event.tncTranslation = this.cmsUtils.parseCmsTranslation(tnc, event.tnc);
    event.congratTranslation = this.cmsUtils.parseCmsTranslation(congratMessage, event.congratulationMessage);
    event.thankTranslation = this.cmsUtils.parseCmsTranslation(thankYouMessage, event.thankYouMessage);
    if (event.prizes) {
      event.prizes = event.prizes.map((prize) => this.populateScratchAndWinPrize(prize));
    }
    return event;
  }

  populateScratchAndWinPrize(prize: JJScratchAndWinPrize) {
    if (!prize) {
      return null;
    }
    let name = prize.translate ? prize.translate.name : prize.name;
    prize.nameTranslation = this.cmsUtils.parseCmsTranslation(name, prize.name);
    return prize;
  }

  populateScratchRequest(request: JJScratchRequest) {
    if (!request) {
      return null;
    }
    request.prize = this.populateScratchAndWinPrize(request.prize);
    return request;
  }

  populateMiniPrograms(program: JJMiniProgram) {
    if (!program) {
      return null;
    }
    program.colors = this.common.parseJson(program.colors);
    return program;
  }
}
