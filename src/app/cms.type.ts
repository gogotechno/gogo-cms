export interface CmsTranslation {
    en?: string,
    zh?: string,
    ms?: string
}

export interface CmsSite {
    domain: string,
    code: string,
    template: 'winbox99',
    defaultLanguage: string,
    domains: Array<string>,
}
export interface CmsNavigation {
    code: string,
    items: Array<CmsNavigationItem>
}
export interface CmsNavigationItem {
    path: string,
    name: CmsTranslation,
    isExternal: boolean
}
export interface CmsSlideshow {
    code: string,
    items: Array<CmsSlideshowItem>
}
export interface CmsSlideshowItem {
    backgroundImage: string,
}

export interface CmsList {
    code: string,
    items: Array<CmsListItem>
}

export interface CmsListItem {
    htmlContent: CmsTranslation,
    title: CmsTranslation
}

export interface CmsPage {
    htmlContent: CmsTranslation,
    title: CmsTranslation,
    fullscreen: boolean,
    edgeless: boolean
}

export interface CmsForm {
    code: string,
    site: string,
    items: Array<CmsFormItem>
}

export interface CmsFormItem {
    code: string,
    label: CmsTranslation,
    type: 'string' | 'number' | 'cms-translate' | 'array' | 'email' | 'password',
    dataType: string,
}

export interface CmsSignInRequest {
    email: string,
    password: string,
    remember: boolean
}

export interface CmsTable {
    code: string,
    site: string | 'default',
    name: CmsTranslation,
    nameField: string,
    codeField: string,   
}

export class CmsAdminChildPage {
    title: string = '';
}