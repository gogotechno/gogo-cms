import { CmsTranslation } from "../cms.type";
import { DocUser, ErpDoc } from "../sws-erp.type";

export const COMPANY_CODE = "lucky";

export interface JJMerchant extends ErpDoc {
    name: string,
    logo?: string,
    officePhone: string,
    officeEmail: string,
    addressLine1: string,
    addressLine2?: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    code: string
}

export interface JJEvent extends ErpDoc {
    merchant_id?: number,
    name: string,
    highlight?: string,
    description?: string,
    tnc?: string,
    status?: EventStatus,
    startAt: Date,
    endAt?: Date,
    drawAt?: Date,
    prizes: JJEventPrize[]
}

export interface JJEventPrize extends ErpDoc {
    name: string,
    description?: string,
    worth: number,
    quantity?: number,
    level?: number,
    event_id: number
}

export enum EventStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ENDED = "ENDED"
}

export interface JJTicketDistributionApplication extends ErpDoc {
    merchant_id: number,
    event_id: number,
    customerFirstName: string,
    customerLastName: string,
    customerContactNo: string,
    billNo: string,
    ticketCount: number
}

export interface JJTicketDistribution extends ErpDoc {
    merchant_id: number,
    event_id: number,
    distributedAt: Date,
    distributedBy: number,
    customerFirstName: string,
    customerLastName: string,
    customerContactNo: string,
    billNo: string,
    application_id: number,
    tickets?: JJTicket[]
    totalOfTickets?: number
}

export interface JJTicket extends ErpDoc {
    serialNo: string,
    status: TicketStatus,
    event_id: number,
    merchant_id: number,
    ticket_distribution_id: number
}

export enum TicketStatus {
    VALID = "VALID",
    INVALID = "INVALID"
}

export interface JJUser extends ErpDoc {
    merchant_id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    profilePicture?: string,
    doc_user_id?: number,
    roleTranslation?: CmsTranslation,
    docUser?: DocUser
}

export interface JJUserRole extends ErpDoc {
    code: UserRole,
    name: string
}

export enum UserRole {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    MERCHANT_ADMIN = "MERCHANT_ADMIN"
}