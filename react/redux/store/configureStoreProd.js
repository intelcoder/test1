import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware, { END } from 'redux-saga'
import createReducer from 'Redux/rootReducer'


export default function configureStore(history = {}, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  )
  store.asyncReducers = {}
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(createReducer(store.asyncReducers))
    return store
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
