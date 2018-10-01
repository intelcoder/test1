import Express from 'express'
import http from 'http'
import { renderDom } from '../../react/containers/root/html'
import { DEV_PORT } from '../config.json'


const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('../webpack/config.com')
const compiler = webpack(webpackConfig)

const app = new Express()

const server = new http.Server(app)
const publicPath = 'http://:'+DEV_PORT+webpackConfig.output.publicPath

app.get('/static/sw.js', function(req, res, next) {
  res.setHeader('Service-Worker-Allowed', '/');
  next()
})

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204)
})

app.use(webpackDevMiddleware(compiler, {
  stats: "minimal",
  publicPath: publicPath,
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log, //false
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000
}))

app.use('/static', Express.static(path.join(__dirname, '/../../static/')))
app.use('/dist', Express.static(path.join(__dirname, '/../../dist/')))

app.get(/.*/, (req, res) => {
  const domain = req.get('host').replace(/\:.*/, '')
  res.end(renderDom('', DEV_PORT, domain))
})

server.listen(DEV_PORT, '', () => {
  const host = server.address().address
  console.log('Node Express Server is running on [ http://*.localhost:%s ] where * is anything you want.', DEV_PORT)
  console.log('Browsers other than Chrome will need a record in your "/etc/hosts" file.')
  console.log('For mobile testing, use your computer\'s network name (not IP), which will likely be [ something.local:%s ].', DEV_PORT)
  console.log('On a Mac, you can find your network name in System Preferences->Sharing.')
  console.log('')
})
