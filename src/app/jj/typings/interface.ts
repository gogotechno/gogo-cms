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
  merchant_id: number;
  prizes?: JJEventPrize[];
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
