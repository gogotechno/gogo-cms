import { CmsFile, CmsTranslation } from 'src/app/cms.type';
import { DocUser, ErpDoc } from 'src/app/sws-erp.type';
import { Currency } from '../modules/wallets/wallets.types';

export interface LiteralObject {
  [key: string]: any;
}

export type SmsTemplateCode =
  | 'CUSTOMER_NEW_PASSWORD'
  | 'CUSTOMER_RESET_PASSWORD'
  | 'CAPTURE_PAYMENT'
  | 'TICKET_DISTRIBUTION';

export interface BulletinGroup {
  code: string;
  label: CmsTranslation;
}

export interface Bulletin {
  title: CmsTranslation;
  description: CmsTranslation;
  thumbnailImage: string;
  backgroundImage: string;
  tags: string[];
  cardConfig: {
    backgroundColor: string;
    backgroundColorOpacity: number;
    textColor: string;
  };
  url: string;
  actionUrl: string;
  actionSuccessCallback: {
    label: CmsTranslation;
    refreshAreas: string[];
  };
  responseUrl: string;
  roles: string[];
}

export interface EventConfig {
  id: number;
  tags: string[];
}

export interface MiniProgram {
  name: string;
  icon: string;
  link: string;
  colors?: any;
}

export interface AccountOptions {
  checkWallet?: boolean;
}

export type User = JJCustomer | JJUser;
export type UserType = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';

export interface JJCustomer extends ErpDoc {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  totalOfTickets?: number;
  totalOfWinners?: number;
}

export interface JJUserRole extends ErpDoc {
  code: UserRole;
  name: string;
}

export interface JJUser extends ErpDoc {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
  doc_user_id: number;
  merchant_id: number;
  roleTranslation?: CmsTranslation;
  docUser?: DocUser;
  old_password?: string;
  new_password?: string;
}

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  MERCHANT_ADMIN = 'MERCHANT_ADMIN',
}

export interface JJEvent extends ErpDoc {
  name: string;
  highlight: string;
  description: string;
  tnc: string;
  status: EventStatus;
  startAt: Date;
  endAt: Date;
  drawAt: Date;
  thumbnailImage: string;
  backgroundImage: string;
  minSpend: number;
  merchant_id: number;
  merchant?: JJMerchant;
  prizes?: JJEventPrize[];
  pointRules?: JJPointRule[];
  scratchAndWinRules?: JJScratchAndWinRule[];
  distance?: number;
  nameTranslation?: CmsTranslation;
  totalOfTickets?: number;
  totalOfWinners?: number;
  totalOfGainedTickets?: number;
  totalOfGainedPoints?: number;
  totalOfGainedSnwTickets?: number;
  drawingResult?: JJDrawingResult;
  drewAt?: Date;
  showEndDateCountdown: boolean;
  showNearestStore: boolean;
  showCustomerTickets: boolean;
  winningSummary?: WinningSummaryDetails[];

  // app use only
  _status: string;
}

export interface WinningSummaryDetails {
  prize: JJEventPrize;
  winningNumbers: string[];
}

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ENDED = 'ENDED',
}

export interface JJEventStatus extends ErpDoc {
  code: string;
  name: string;
}

export interface JJTicketGenerationMethod extends ErpDoc {
  code: string;
  name: string;
}

export interface JJEventPrize extends ErpDoc {
  name: string;
  description: string;
  worth: number;
  quantity: number;
  level: number;
  event_id: number;
  thumbnailImage: string;
  nameTranslation: CmsTranslation;
}

export interface JJDrawingResult extends ErpDoc {
  drewAt: Date;
  drewBy: string;
  event_id: number;
  event?: JJEvent;
}

export interface JJWallet extends ErpDoc {
  walletNo: string;
  type: WalletType;
  walletBalance?: number;
  walletType?: JJWalletType;
  walletCurrency?: JJWalletCurrency;
  permissions?: JJWalletPermission[];
  pin?: string;
  customer?: JJCustomer;
  merchant?: JJMerchant;
  displayCurrency?: Currency;
  icon?: string;
  colors?: any;
}

export type WalletType = 'CUSTOMER' | 'MERCHANT' | 'SNW' | 'CASH';

export interface JJWalletType extends ErpDoc {
  code: WalletType;
  name: string;
  icon: string;
  colors: string;
  canDeposit: boolean;
  canWithdraw: boolean;
  canTransfer: boolean;
  canPay: boolean;
  canNegative: boolean;
  wallet_currency_id: number;
}

export interface JJWalletPermission extends ErpDoc {
  wallet_id: number;
  customer_id?: number;
  merchant_id?: number;
}

export interface JJProduct extends ErpDoc {
  code: string;
  name: string;
  nameTranslation?: CmsTranslation;
}

export interface JJTicketDistributionApplication extends ErpDoc {
  customerFirstName: string;
  customerLastName: string;
  customerContactNo: string;
  billNo: string;
  expense: number;
  pointExpense: number;
  ticketCount: number;
  freePoint: number;
  usedPointRule?: string;
  freeSnwTickets: number;
  usedSnwRule?: string;
  product_id: number;
  event_id: number | string;
  merchant_id: number | string;
  customer_id: number;
}

export interface JJTicketDistribution extends ErpDoc {
  distributedAt: Date;
  distributedBy: number;
  customerFirstName: string;
  customerLastName: string;
  customerContactNo: string;
  billNo: string;
  event_id: number;
  merchant_id: number;
  application_id: number;
  customer_id: number;
  tickets?: JJTicket[];
  distributedByPerson?: DocUser;
  merchant?: JJMerchant;
  event?: JJEvent;
  customer?: JJCustomer;
  totalOfTickets?: number;
  product?: JJProduct;
  expense?: number;
  pointExpense?: number;
  freePoint?: number;
  freeSnwTickets?: number;
}

export interface JJTicket extends ErpDoc {
  serialNo: string;
  status: TicketStatus;
  event_id: number;
  merchant_id: number;
  ticket_distribution_id: number;
  statusTranslation?: CmsTranslation;
}

export enum TicketStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface JJWinner extends ErpDoc {
  quantity: number;
  status: 'PENDING' | 'DELIVERED';
  prize_id: number;
  ticket_id: number;
  merchant_id?: number;
  drawing_result_id?: number;
  event_id: number;
  prize?: JJEventPrize;
  ticket?: JJTicket;
  merchant?: JJMerchant;
  customer?: JJCustomer;
  event?: JJEvent;
}

export interface JJMerchant extends ErpDoc {
  code: string;
  name: string;
  logo?: string;
  officePhone: string;
  officeEmail: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  totalOfLatestTickets?: number;
  totalOfTickets?: number;
  totalOfWinners?: number;
  fullAddress?: string;
  distance?: number;
  latitude?: string;
  longitude?: string;
  nameTranslation?: CmsTranslation;
}

export interface JJPointRule extends ErpDoc {
  minimumSpend: number;
  freePoint: number;
  merchantDailyLimit: number;
  eventDailyLimit: number;
  validFrom: Date;
  validTo: Date;
  priotity: number;
  isActive: boolean;
  issueMode: IssueMode;
  eventId: number;
}

export interface JJScratchAndWinRule extends ErpDoc {
  minimumSpend: number;
  freeTickets: number;
  merchantDailyLimit: number;
  eventDailyLimit: number;
  validFrom: Date;
  validTo: Date;
  priotity: number;
  isActive: boolean;
  issueMode: IssueMode;
  eventId: number;
}

export enum IssueMode {
  AMOUNT_PAID = 'AMOUNT_PAID',
  AMOUNT_POINT_PAID = 'AMOUNT_POINT_PAID',
}

export interface JJWalletTransaction extends ErpDoc {
  wallet_id: number;
  refNo: string;
  amount: number;
  description: string;
  reference1: string;
  reference2: string;
  reference3: string;
  amountText: string;
}

export interface JJCapturePaymentRequest extends ErpDoc {
  fromWallet: number;
  toWallet: number;
  amount: number;
  refNo: string;
  description: string;
  reference1?: string;
  reference2?: string;
  reference3?: string;
  fromWalletNo?: string;
}

export interface CapturePaymentRequestExtras {
  request: JJCapturePaymentRequest;
  customerInfo: {
    customer: JJCustomer;
    currentBalance: number;
    transaction: JJWalletTransaction;
  };
}

export interface JJSlideshow extends ErpDoc {
  code: string;
  title: string;
  isActive: boolean;
  items: JJSlideshowItem[];
}

export interface JJSlideshowItem extends ErpDoc {
  message: string;
  content: string;
  backgroundImage: string;
  isActive: boolean;
  sequence: number;
  url: string;
  messageTranslation?: CmsTranslation;
}

export interface JJAnnouncement extends ErpDoc {
  title: string;
  message: string;
  content: string;
  isActive: boolean;
  validFrom: Date;
  validTo: Date;
  sequence: number;
}

export interface JJContentPage extends ErpDoc {
  code: string;
  title: string;
  content: string;
  icon: string;
  isActive: boolean;
}

export interface JJFab extends ErpDoc {
  code: string;
  title: string;
  icon: string;
  url: string;
  isActive: boolean;
  extras: FabExtras;
}

export interface FabExtras {
  count?: number;
}

export interface JJScratchAndWinEvent extends ErpDoc {
  name: string;
  startAt: Date;
  endAt: Date;
  tnc: string;
  isActive: boolean;
  pricePerScratch: number;
  logo: string;
  coverImage: string;
  backgroundImage: string;
  cardBackgroundImage: string;
  scratchAreaPlaceholderImage: string;
  congratulationImage: string;
  congratulationBackgroundImage: string;
  congratulationMessage: string;
  thankYouImage: string;
  thankYouBackgroundImage: string;
  thankYouMessage: string;
  merchant_id: number;
  prizes?: JJScratchAndWinPrize[];
  merchant?: JJMerchant;
  distance?: number;
}

export interface JJScratchAndWinPrize extends ErpDoc {
  name: string;
  worth: number;
  thumbnailImage: string;
  backgroundImage: string;
  sequence: number;
  type: 'WALLET' | 'GIFT';
  walletType: WalletType;
  chance: number;
  totalLimit: number;
  dailyLimit: number;
  userLimit: number;
  isActive: boolean;
  isDefault: boolean;
  scratch_and_win_event_id: number;
  nameTranslation?: CmsTranslation;
}

export interface JJScratchRequest extends ErpDoc {
  scratch_and_win_event_id: number;
  customer_id: number;
  wallet_id: number;
  spend: number;
  status: 'PROCESSING' | 'COMPLETED';
  scratch_and_win_prize_id: number | null;
  customer?: JJCustomer;
  prize?: JJScratchAndWinPrize;
}

export interface ScratchRequestExtras {
  prize: JJScratchAndWinPrize;
}

export interface JJDepositRequest extends ErpDoc {
  wallet_id?: number;
  amount: number;
  refNo: string;
  description?: string | null;
  reference1?: string | null;
  reference2?: string | null;
  reference3?: string | null;
  status?: DepositRequestStatus;
  deposit_method_id: number;
  bank_account_id?: number;
  attachments?: CmsFile[];
  walletNo?: string;
  bankAccount?: JJBankAccount;
  depositMethod?: JJDepositMethod;
  wallet?: JJWallet;
}

export type DepositRequestStatus = 'PENDING_PAYMENT' | 'PROCESSING' | 'APPROVED' | 'DECLINED';

export interface JJDepositMethod extends ErpDoc {
  name: string;
  description: string;
  isActive: boolean;
  isVisible: boolean;
}

export interface JJWithdrawRequest extends ErpDoc {
  wallet_id: number;
  amount: number;
  refNo: string;
  description?: string | null;
  reference1?: string | null;
  reference2?: string | null;
  reference3?: string | null;
  status: WithdrawRequestStatus;
}

export type WithdrawRequestStatus = 'PROCESSING' | 'APPROVED' | 'DECLINED';

export interface JJWithdrawMethod {
  name: string;
  description: string;
  isActive: boolean;
  isVisible: boolean;
}

export interface JJBank extends ErpDoc {
  name: string;
}

export interface JJBankAccount extends ErpDoc {
  accountNo: string;
  holderName: string;
  isActive: boolean;
  isDefault: boolean;
  bank_id: number;
  bank?: JJBank;
  bankName?: string;
}

export interface JJTransferRequest extends ErpDoc {
  fromWallet?: number;
  toWallet?: number;
  refNo: string;
  amount: number;
  description?: string | null;
  reference1?: string | null;
  reference2?: string | null;
  reference3?: string | null;
  effectiveDate?: Date;
  fromWalletNo?: string;
  toWalletNo?: string;
  fromWalletPin?: string;
}

export interface JJWalletCurrency extends ErpDoc {
  code: string;
  label: string;
  symbol: string;
  symbolPosition: 'START' | 'END';
  digits: number;
  isDefault: boolean;
}

export interface JJWalletCurrencyConversion extends ErpDoc {
  from_wallet_currency_id: number;
  to_wallet_currency_id: number;
  factor: number;
}

export interface JJWalletTypePermission extends ErpDoc {
  from_wallet_type_id: number;
  to_wallet_type_id: number;
  canTransfer: number;
}

export interface JJPinVerification extends ErpDoc {
  walletNo: string;
  walletPin: string;
}
