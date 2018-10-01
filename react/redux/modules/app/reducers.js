import { browserStorage } from 'Redux/services/storage'
import {
  TOGGLE_HAMBURGER,
  TOGGLE_SEARCH,
  TOGGLE_DOCK,
  SET_MOBILE,
  SET_SMALL_PREVIEW,
  SET_SEARCH_PAGE,
  SET_INITIAL_GOOGLE_ANALYTICS,
  TOGGLE_METRIC,
  SET_MOBILE_TYPE,
  SET_MOBILE_BROWSER,
} from './actions'

const bs = browserStorage()

// TODO: metricIsImperial needs to be moved to a localstorage middleware than
// mutating reducers
const initialState = {
  hamburgerIsOpen: false,
  siteSearchIsOpen: false,
  dockIsOpen: null,
  isMobile: false,
  mobileType: null,
  mobileBrowser: null,
  isSmallPreview: true,
  isSearchPage: false,
  isGoogleAnalyticsInitialized: false,
  metricIsImperial: bs.getItem('metricIsImperial') ?
      (bs.getItem('metricIsImperial') == 'true') : // eslint-disable-line
    true,
}

function appReducer(state = initialState, action) {
  const reducerState = Object.assign({}, state)

  switch(action.type) {
    case TOGGLE_HAMBURGER:
      const isHamburgerOpen = state.hamburgerIsOpen
      reducerState.hamburgerIsOpen = !isHamburgerOpen
      break
    case TOGGLE_SEARCH:
      const siteSearchIsOpen = state.siteSearchIsOpen
      reducerState.siteSearchIsOpen = !siteSearchIsOpen
      break
    case TOGGLE_DOCK:
      const dockIsOpen = action.dockIsOpen
      reducerState.dockIsOpen = dockIsOpen
      break
    case SET_MOBILE:
      reducerState.isMobile = action.isMobile
      break
    case SET_MOBILE_TYPE:
      reducerState.mobileType = action.mobileType
      break
    case SET_MOBILE_BROWSER:
      reducerState.mobileBrowser = action.mobileBrowser
      break
    case SET_SMALL_PREVIEW:
      reducerState.isSmallPreview = action.isSmallPreview
      break
    case SET_SEARCH_PAGE:
      reducerState.isSearchPage = action.isSearchPage
      break
    case SET_INITIAL_GOOGLE_ANALYTICS:
      reducerState.isGoogleAnalyticsInitialized = true
      break
    case TOGGLE_METRIC:
      const isImperialMetric = !state.metricIsImperial
      reducerState.metricIsImperial = isImperialMetric

      bs.setItem('metricIsImperial', isImperialMetric)
      break
  }

  return reducerState
}

export default appReducer
