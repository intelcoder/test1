import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { history, store } from 'Redux/store'
import rootSaga from 'Redux/rootSaga'
import AppRoot from './AppRoot'

import './stats'
import { rehydrateMarks } from 'react-imported-component';


store.runSaga(rootSaga)
const domRoot = document.getElementById('root')

const renderApp = () => {
  // To not render client site and go through urllookups if hostname is googleusercontent or etc.
  rehydrateMarks().then(() => {
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoot />
        </ConnectedRouter>
      </Provider>,
      domRoot,
    )
  })
}

renderApp()
