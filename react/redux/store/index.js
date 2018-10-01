import createBrowserHistory from 'history/createBrowserHistory'
import configureStoreDev from 'Redux/store/configureStoreDev'
import configureStoreProd from 'Redux/store/configureStoreProd'


let _history // eslint-disable-line
let _store // eslint-disable-line
let initialState = {}

if(typeof (window) !== 'undefined') {
  initialState = window.__INITIAL_STATE__

  _history = createBrowserHistory()


  if(process.env.NODE_ENV === 'production') {
    _store = configureStoreProd(_history, initialState)
  } else {
    _store = configureStoreDev(_history, initialState)
  }
}

export const history = _history
export const store = _store
