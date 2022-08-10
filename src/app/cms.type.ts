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
