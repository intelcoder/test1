import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import { REQUEST, SUCCESS, FAILURE } from './actions/constants'
// import { DEFAULTS_DATA } from './actions/defaults'

// ///
import appReducer from 'Modules/app/reducers'

const createReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    app: appReducer,
    ...asyncReducers,
  })

const rootReducer = combineReducers({
  router: routerReducer,
  // app
  app: appReducer,

})

export default createReducer
