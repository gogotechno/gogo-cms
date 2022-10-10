import { ErpDoc } from "../sws-erp.type";

export const COMPANY_CODE = "lucky";

export interface Merchant extends ErpDoc {
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

export interface Event extends ErpDoc {
    merchant_id?: number,
    name: string,
    highlight?: string,
    description?: string,
    tnc?: string,
    status?: EventStatus,
    startAt: Date,
    endAt?: Date,
    drawAt?: Date,
    prizes: EventPrize[]
}

export interface EventPrize extends ErpDoc {
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

export interface TicketDistributionApplication extends ErpDoc {
    merchant_id: number,
    event_id: number,
    customerFirstName: string,
    customerLastName: string,
    customerContactNo: string,
    billNo: string,
    ticketCount: number
}