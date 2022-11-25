import { CmsTranslation } from 'src/app/cms.type';
import { DocUser, ErpDoc } from 'src/app/sws-erp.type';

export interface MiniProgram {
  name: string;
  icon: string;
  link: string;
}

export type User = JJCustomer | JJUser;
export type UserType = 'MERCHANT' | 'CUSTOMER';

export interface JJCustomer extends ErpDoc {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
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
  merchant_id: number;

  prizes?: JJEventPrize[];

  nameTranslation?: CmsTranslation;

  totalOfTickets?: number;

  merchant?: JJMerchant;
}

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ENDED = 'ENDED',
}

export interface JJEventPrize extends ErpDoc {
  name: string;
  description: string;
  worth: number;
  quantity: number;
  level: number;
  event_id: number;

  // TO ADD
  thumbnailImage: string;
}

export interface JJWallet extends ErpDoc {
  walletNo: string;
  type: WalletType;

  walletBalance?: number;

  permissions?: JJWalletPermission[];
}

export enum WalletType {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
}

export interface JJWalletPermission extends ErpDoc {
  walletId: number;
  customerId?: number;
  merchantId?: number;
}

export interface JJProduct extends ErpDoc {
  code: string;
  name: string;

  nameTranslation?: CmsTranslation;
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

  freePoint: number;

  tickets?: JJTicket[];

  distributedByPerson?: DocUser;
  merchant?: JJMerchant;
  event?: JJEvent;
  customer?: JJCustomer;

  totalOfTickets?: number;
  totalOfSnwTickets?: number;

  product?: JJProduct;

  expense?: number;
  pointExpense?: number;
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

  ticket?: JJTicket;
  merchant?: JJMerchant;
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
}
