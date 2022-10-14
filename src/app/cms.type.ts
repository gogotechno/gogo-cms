import { Timestamp } from "@angular/fire/firestore"
import { Pagination } from "./sws-erp.type"

export interface CmsDocument {
    updatedAt?: Timestamp,
    updatedBy?: string,
    createdAt?: Timestamp,
    createdBy?: string,
}

export interface CmsTranslation {
    [key: string]: string
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
    submitButtonText?: string,
    items: Array<CmsFormItem>
}

export interface CmsFormItem extends CmsDocument {
    code: string,
    label: CmsTranslation,
    labelPosition?: "fixed" | "floating" | "stacked",
    type: CmsFormItemType,
    dataType?: string,
    required?: boolean,
    hidden?: boolean,
    options?: Array<CmsFormItemOption>,
    minimum?: number,
    maximum?: number,
    minimumLength?: number,
    maximumLength?: number,
    matchWith?: string[]
}

export interface CmsFormItemOption {
    code: string,
    label: CmsTranslation
}

export type CmsFormItemType = 'text' | 'number' | 'array' | 'email' | 'password' | 'checkbox' | 'select' | 'date' | 'time' | 'datetime' | 'cms-translate' | 'cms-translate-editor';

export interface CmsFormValidation {
    valid: boolean,
    errors?: Array<CmsFormValidationError>
}

export interface CmsFormValidationError {
    error: any,
    message: string
}

export interface CmsFilter {
    items: Array<CmsFilterItem>
}

export interface CmsFilterItem {
    code: string,
    label: CmsTranslation,
    labelPosition?: "fixed" | "floating" | "stacked",
    type: CmsFilterItemType,
    icon?: string,
    img?: string,
    required?: boolean,
    hidden?: boolean,
    multiple?: boolean,
    operator?: Operator,
    dateType?: 'date' | 'time' | 'datetime',
    searchable?: boolean,
    selectConfig?: {
        labelFields: string[],
        labelSeparator?: string,
        codeFields: string[];
        codeSeparator?: string,
        noMoreText?: string;
        emptyText?: string;
        selectedItems?: any[];
    },
    selectHandler?: {
        onLoad: OnSelectLoad,
        onScrollToEnd: OnSelectScrollToEnd
    },
    options?: Array<CmsFilterItemOption>,
}

export type OnSelectLoad = () => Promise<[any[], Pagination]>;
export type OnSelectScrollToEnd = (pagination: Pagination) => Promise<[any[], Pagination]>;

export interface CmsFilterItemOption {
    code: string,
    label: CmsTranslation
}

export type CmsFilterItemType = 'text' | 'number' | 'checkbox' | 'radio' | 'select' | 'date' | 'time' | 'datetime' | 'date-between';

export const OPERATORS = ["=", "!=", "<", "<=", ">", ">="] as const;
export type OperatorTuple = typeof OPERATORS;
export type Operator = OperatorTuple[number];

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