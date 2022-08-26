import { CmsDocument, CmsTranslation } from "../cms.type";

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
    organisedAt: Date,
    startAt: string,
    endAt: string,
    description: CmsTranslation,
    location: string,
    address: string,
    stateCode: string,
    countryCode: string,
    background: string,
    logo: string
}