import 'react-hot-loader/patch'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { history, store } from 'Redux/store'
import rootSaga from 'Redux/rootSaga'
import AppRoot from 'Root/AppRoot'


store.runSaga(rootSaga)
const domRoot = document.getElementById('root')


const renderApp = () => {
  // console.log("************")
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoot />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    domRoot,
  )
}
if(module.hot) {
  module.hot.accept()
  setImmediate(() => {
    unmountComponentAtNode(domRoot)
    renderApp()
  })
}


renderApp()
