import Express from 'express'
import handleRender from './handleRender'
var compression = require('compression')
global.window = undefined
global.document = {}

const path = require('path')
const app = new Express()
app.use(compression())

app.get('/loaderio-16e5bb23b4c42d39254b429bb56b8d38', function(req, res, next) {
  res.send("loaderio-16e5bb23b4c42d39254b429bb56b8d38");
});
app.get('/static/sw.js', function(req, res, next) {
  res.setHeader('Service-Worker-Allowed', '/');
  next()
})

// app.get('/dist/*.js.gz', function(req, res, next) {
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });
//
// app.get('/dist/*.css.gz', function(req, res, next) {
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.get('*.svg', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'image/svg+xml');
  next();
});

app.use('/static', Express.static(path.join(__dirname, '/../../static/')))
app.use('/dist', Express.static(path.join(__dirname, '/../../dist/')))

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204)
})
app.use(handleRender)
app.listen(3333, (error) => {
  if (error) console.error(error)
  else console.info(`App: listening on port ${3333}. Open up https://localhost:${3333}/ in your browser.`)
})

