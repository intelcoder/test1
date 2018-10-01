import { actionCreator } from '../../actions'

export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER'
export const toggleHamburger = () => actionCreator(TOGGLE_HAMBURGER)

export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'
export const toggleSearch = () => actionCreator(TOGGLE_SEARCH)

export const TOGGLE_DOCK = 'TOGGLE_DOCK'
export const toggleDock = dockIsOpen => actionCreator(TOGGLE_DOCK, { dockIsOpen })

export const SET_MOBILE = 'SET_MOBILE'
export const setMobile = isMobile => actionCreator(SET_MOBILE, { isMobile })

export const SET_MOBILE_TYPE = 'SET_MOBILE_TYPE'
export const setMobileType = mobileType => actionCreator(SET_MOBILE_TYPE, { mobileType })

export const SET_MOBILE_BROWSER = 'SET_MOBILE_BROWSER'
export const setMobileBrowser = mobileBrowser => actionCreator(SET_MOBILE_BROWSER, { mobileBrowser })

export const SET_SMALL_PREVIEW = 'SET_SMALL_PREVIEW'
export const setSmallPreview = isSmallPreview => actionCreator(SET_SMALL_PREVIEW, { isSmallPreview })

export const SET_SEARCH_PAGE = 'SET_SEARCH_PAGE'
export const setSearchPage = isSearchPage => actionCreator(SET_SEARCH_PAGE, { isSearchPage })

export const SET_INITIAL_GOOGLE_ANALYTICS = 'SET_INITIAL_GOOGLE_ANALYTICS'
export const setInitialGoogleAnalytics = () => actionCreator(SET_INITIAL_GOOGLE_ANALYTICS)

export const TOGGLE_METRIC = 'TOGGLE_METRIC'
export const toggleMetric = () => actionCreator(TOGGLE_METRIC)
