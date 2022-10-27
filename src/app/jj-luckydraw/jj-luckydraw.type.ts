import { CmsTranslation } from "../cms.type";
import { DocUser, ErpDoc } from "../sws-erp.type";

export const COMPANY_CODE = "lucky";

export const LANGUAGE_STORAGE_KEY = `${COMPANY_CODE}_LANGUAGE`;

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
    code: string,
    totalOfLatestTickets?: number,
    totalOfTickets?: number,
    totalOfWinners?: number,
    fullAddress?: string
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
    prizes?: JJEventPrize[],
    winner?: JJWinner[],
    drawingResult?: JJDrawingResult,
    winningSummary?: WinningSummary[],
    totalOfWinners?: number,
    minSpend: number
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

export interface JJDrawingResult extends ErpDoc {
    event_id: number,
    drewAt: Date,
    drewBy: string,
    event?: JJEvent
}

export interface WinningSummary {
    prize: JJEventPrize,
    winningNumbers: string[]
}

export interface JJTicketDistributionApplication extends ErpDoc {
    merchant_id: number,
    event_id: number,
    customerFirstName: string,
    customerLastName: string,
    customerContactNo: string,
    billNo: string,
    ticketCount: number,
    customer_id: number,
    expense: number
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
    totalOfTickets?: number,
    distributedByPerson?: DocUser,
    event?: JJEvent
}

export interface JJTicket extends ErpDoc {
    serialNo: string,
    status: TicketStatus,
    event_id: number,
    merchant_id: number,
    ticket_distribution_id: number,
    statusTranslation?: `CmsTranslation`,
    event?: JJEvent,
    ticket_distribution?: JJTicketDistribution
}

export enum TicketStatus {
    VALID = "VALID",
    INVALID = "INVALID"
}

export interface JJWinner extends ErpDoc {
    ticket_id: number,
    prize_id: number,
    quantity: number,
    status: "PENDING" | "DELIVERED",
    merchant_id?: number,
    drawing_result_id?: number,
    drawing_result?: JJDrawingResult,
    merchant?: JJMerchant,
    ticket?: JJTicket,
    event_prize?: JJEventPrize
}

export enum WinnerStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED"
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
    docUser?: DocUser,
    old_password?: string,
    new_password?: string,
    phone?: string
}

export interface JJUserRole extends ErpDoc {
    code: UserRole,
    name: string
}

export enum UserRole {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    MERCHANT_ADMIN = "MERCHANT_ADMIN"
}

export interface JJLanguage {
    code: string,
    label: CmsTranslation
}

export interface JJCustomer extends ErpDoc {
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    email?: string,
    role?: UserRole
}

export enum JJAppUserRole {
    MERCHANT = 'MERCHANT',
    CUSTOMER = 'CUSTOMER'
}

export interface JJProduct extends ErpDoc{
    code: string,
    name: string,
    nameTranslation?: CmsTranslation
}