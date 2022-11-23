import { CmsTranslation } from 'src/app/cms.type';
import { DocUser, ErpDoc } from 'src/app/sws-erp.type';

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
  roleTranslation?: CmsTranslation;
  email: string;
  password: string;
  doc_user_id?: number;
  docUser?: DocUser;
  merchant_id: number;
  old_password?: string;
  new_password?: string;
}

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  MERCHANT_ADMIN = 'MERCHANT_ADMIN',
}
