const ENV = process.env.NODE_ENV
const fs = require('fs')
const path = require('path')
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc')))
const aliases = require('../aliases/aliases.js')

const CSS_ALIAS = '@CSSVars'
const CSS_PATH = aliases[CSS_ALIAS]


if(ENV === 'development') {
  require('babel-core/register')(config)
  require('./server.dev')
} else if(ENV === 'production') {
  require('css-modules-require-hook')({
    // generateScopedName: '[name]__[local]___[hash:base64:5]', // for debugging, change needed in conf.prod
    generateScopedName: '[hash:base64:5]',
    preprocessCss: function (css, filename) {
      const re = new RegExp(CSS_ALIAS, 'g')
      return css.replace(re, CSS_PATH)
    },
  })
  require('babel-core/register')(config)
  require('./server.prod')
}

console.log('===[ '+ENV.toUpperCase()+' SERVER STARTED ]===')
