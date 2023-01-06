import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const SWS_ERP_COMPANY = new InjectionToken<BehaviorSubject<string>>('SWS ERP Company Code');

export interface ChangePasswordDto {
  old_password: string;
  new_password: string;
}

export interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface Conditions {
  [key: string]: string | number | boolean | Date;
}

export interface AuthStateEvent {
  status: 'LOGGED_IN' | 'LOGGED_OUT';
}

export interface CreateResponse {
  doc_id: number;
  message: string;
  data: any;
}

export interface UpdateResponse {
  doc_id: number;
  message: string;
  data: any;
}

export interface UploadFileResponse {
  url: string;
}

export interface FindUserResponse<T = DocUser> {
  message: string;
  data: T;
}

export interface GenerateRefreshTokenResponse {
  data: any;
}

export interface GenerateAccessTokenResponse {
  data: any;
}

export interface GetPrintTemplateResponse {
  message: string;
  data: {
    htmls: string[];
    html: string;
  };
}

export interface Pageable<T = any> {
  total: number;
  result: T[];
}

export interface GetOptions {
  itemsPerPage?: number;
  currentPage?: number;
  sortBy?: string;
  sortType?: 'ASC' | 'DESC';
  hasPk?: boolean;
  hasFk?: boolean;
  [key: string]: any;
  [key: `${string}_type`]: '=' | '!=' | '<' | '<=' | '>' | '>=' | 'is null' | 'like';
}

export interface PostOptions {
  [key: string]: any;
}

export interface PutOptions {
  [key: string]: any;
}

export interface ErpDoc {
  doc_id?: number;
  doc_createdDate?: Date;
  doc_createdBy?: string;
  doc_lastModifiedDate?: Date;
  doc_lastModifiedBy?: string;
  doc_status?: DocStatus;
  doc_amend_from?: string;
  translate?: {
    [key: string]: string;
  };
}

export enum DocStatus {
  DRAFT = 'DRAFT',
  SUBMIT = 'SUBMIT',
  CANCEL = 'CANCEL',
}

export interface DocUser extends ErpDoc {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  doc_company: string;
  user_level: number;
  user_access?: DocUserAccess[];
}

export interface DocUserAccess extends ErpDoc {
  access_table: string;
  access_col: string;
  access_val: string;
  doc_user_id: string;
}

export interface Language extends ErpDoc {
  code: string;
  name: string;
}
