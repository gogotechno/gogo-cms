import { Timestamp } from "@angular/fire/firestore";
import { CmsDocument, CmsTranslation } from "../cms.type";

export interface TastefullyCustomer extends CmsDocument {
    name: string,
    mobileNo: string,
    giverMemberId: string,
    profilePic?: string
}

export interface TastefullyFeed extends CmsDocument {
    code: string,
    title: CmsTranslation,
    content: CmsTranslation,
    thumbnail: string,
    fromNow?: string
}

export interface TastefullyEvent extends CmsDocument {
    code: string,
    name: CmsTranslation,
    organisedAt: Timestamp,
    finishedAt: Timestamp,
    startAt: string,
    endAt: string,
    highlight: CmsTranslation,
    description: CmsTranslation,
    location: string,
    address: string,
    stateCode: string,
    countryCode: string,
    background: string,
    giftCardImage: string,
    thankYouMessage: CmsTranslation,
    freeGiftConfirmationMessage: CmsTranslation,
    stateLogo?: string,
}

export interface TastefullyFreeGiftRegister extends CmsDocument {
    name: string
    mobileNo: string,
    email?: string,
    gender?: "M" | "F",
    eventCode?: string
}

export interface TastefullyFreeGiftActivation extends CmsDocument {
    name: string
    mobileNo: string,
    email?: string,
    gender?: "M" | "F",
    eventCode?: string,
    activatedAt: Date | Timestamp
}

export interface TastefullyLanguage {
    code: string,
    label: CmsTranslation
}
