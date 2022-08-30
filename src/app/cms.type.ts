import { Timestamp } from "@angular/fire/firestore"

export interface CmsDocument {
    updatedAt?: Timestamp,
    updatedBy?: string,
    createdAt?: Timestamp,
    createdBy?: string,
}

export interface CmsTranslation {
    en?: string,
    zh?: string,
    ms?: string
}

export interface CmsSite extends CmsDocument {
    domain: string,
    code: string,
    template: 'winbox99',
    defaultLanguage: string,
    domains: Array<string>,
    supportedLanguages: Array<string>,
}

export interface CmsSiteAttribute extends CmsDocument {
    code: string,
    label: CmsTranslation,
    value: string,
    options: Array<CmsSiteAttributeOption>
}

export interface CmsSiteAttributeOption {
    code: string,
    label: CmsTranslation,
    value: string,
}

export interface CmsNavigation extends CmsDocument {
    code: string,
    items: Array<CmsNavigationItem>
}

export interface CmsNavigationItem extends CmsDocument {
    path: string,
    name: CmsTranslation,
    isExternal: boolean,
    children: Array<CmsNavigationItem>,
}

export interface CmsSlideshow extends CmsDocument {
    code: string,
    items: Array<CmsSlideshowItem>
}

export interface CmsSlideshowItem extends CmsDocument {
    backgroundImage: string,
    buttons: Array<CmsSlideshowItemButton>,
    htmlContent: CmsTranslation
}

export interface CmsSlideshowItemButton extends CmsDocument {
    text: CmsTranslation,
    link: string,
}

export interface CmsList extends CmsDocument {
    code: string,
    title?: CmsTranslation,
    description?: CmsTranslation,
    backgroundImage: CmsTranslation,
    items: Array<CmsListItem>,
}

export interface CmsListItem extends CmsDocument {
    htmlContent: CmsTranslation,
    title: CmsTranslation,
    description?: CmsTranslation,
    thumbnail?: CmsTranslation,
    link?: string,
}

export interface CmsPage extends CmsDocument {
    htmlContent: CmsTranslation,
    title: CmsTranslation,
    fullscreen: boolean,
    edgeless: boolean
}

export interface CmsForm extends CmsDocument {
    code: string,
    name?: CmsTranslation,
    items: Array<CmsFormItem>
}

export interface CmsFormItem extends CmsDocument {
    code: string,
    label: CmsTranslation,
    type: CmsFormItemType,
    dataType?: string,
    required?: boolean,
    options?: Array<CmsFormItemOptions>,
    hidden?: boolean,
}

export type CmsFormItemType =
    'text' | 'number' | 'cms-translate' | 'cms-translate-editor' | 'array' |
    'email' | 'password' | 'checkbox' | 'select' | 'date' | 'time' | 'datetime'

export interface CmsFormItemOptions {
    code: string,
    label: CmsTranslation
}

export interface CmsFormValidation {
    valid: boolean,
    errors?: Array<CmsFormValidationError>
}

export interface CmsFormValidationError {
    error: any,
    message: string
}

export interface CmsSignInRequest extends CmsDocument {
    email: string,
    password: string,
    remember: boolean
}

export interface CmsTable extends CmsDocument {
    code: string,
    site: string | 'default',
    name: CmsTranslation,
    nameField: string,
    codeField: string,
}

export class CmsAdminChildPage {
    title: string = ''
}

export interface CmsUser extends CmsDocument {
    uid: string,
    displayName?: string,
    email?: string,
    phoneNumber?: string,
    ownedSites?: Array<string>,
}

export interface CmsExternalIntegration extends CmsDocument {
    code: string,
    name: string,
    apiUrl: string,
    appKey: string
}