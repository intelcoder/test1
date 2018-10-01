import React from 'react'
import Helmet from 'react-helmet'
import createHistory from 'history/createMemoryHistory'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import configureStore from 'Redux/store/configureStoreProd'
import rootSaga from 'Redux/rootSaga'
import { printDrainHydrateMarks } from 'react-imported-component'
import AppRoot from 'Containers/root/AppRoot'
import { renderDom } from 'Containers/root/html'

const handleRender = (req, res) => {
  const port = 3333
  const host = req.get('host').replace(/\:.*/, '')
  const urlPath = req.url

  const history = createHistory({
    initialEntries: [urlPath],
  })
  // const history = createHistory()
  const store = configureStore(history, {})

  const context = {}
  const htmlRoot = (
    <Provider store={store}>
      <StaticRouter location={urlPath} context={context}>
        <AppRoot />
      </StaticRouter>
    </Provider>
  )
  store
    .runSaga(rootSaga)
    .done.then(() => {
      const storeState = store.getState()
      const RTS = renderToString(htmlRoot) + printDrainHydrateMarks()
      const head = Helmet.renderStatic()
      console.log(printDrainHydrateMarks())

      res.status(200).send(renderDom(RTS, port, host, storeState, head))
    })
    .catch(e => {
      console.log(e.message)
      res.status(500).send(e.message)
    })

  renderToString(htmlRoot)
  console.log(printDrainHydrateMarks())

  store.close()
}

export default handleRender
