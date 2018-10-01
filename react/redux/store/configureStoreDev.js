import { createStore, applyMiddleware } from 'redux'
// import { compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
// Don't remove next line. It is needed for testing
// import logger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../rootReducer'


export default function configureStore(history = {}, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    initialState,
    // composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      // logger,
      routerMiddleware(history),
      // ),
    ),
  )

  if(module.hot) {
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
