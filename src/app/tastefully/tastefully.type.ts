import { Timestamp } from '@angular/fire/firestore';
import { CmsDocument, CmsTranslation } from '../cms.type';

export interface TastefullyCustomer extends CmsDocument {
    giverMemberId: string;
    name: string;
    email: string;
    mobileNo: string;
    gender: 'M' | 'F' | 'S';
    dob: string;
    profilePic?: string;
}

export interface TastefullyFeed extends CmsDocument {
    code: string;
    title: CmsTranslation;
    content: CmsTranslation;
    thumbnail: string;
    fromNow?: string;
}

export interface TastefullyEvent extends CmsDocument {
    code: string;
    name: CmsTranslation;
    organisedAt: Timestamp;
    finishedAt: Timestamp;
    startAt: string;
    endAt: string;
    highlight: CmsTranslation;
    description: CmsTranslation;
    location: string;
    address: string;
    stateCode: string;
    countryCode: string;
    background: string;
    giftCardImage: string;
    thankYouMessage: CmsTranslation;
    freeGiftConfirmationMessage: CmsTranslation;
    freeGiftThankYouMessage: CmsTranslation;
    stateLogo?: string;
}

export interface TastefullyFreeGiftRegister extends CmsDocument {
    name: string;
    email: string;
    mobileNo: string;
    gender: 'M' | 'F' | 'S';
    dob: string;
    eventCode?: string;
}

export interface TastefullyFreeGiftActivation extends CmsDocument {
    name: string;
    mobileNo: string;
    email?: string;
    gender?: 'M' | 'F' | 'S';
    eventCode?: string;
    activatedAt: Date | Timestamp;
}

export interface TastefullyLanguage {
    code: string;
    label: CmsTranslation;
}
