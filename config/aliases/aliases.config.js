var path = require('path')
var CWD = process.cwd()
var aliases = require('./aliases.js')

module.exports = {
  resolve: {
    alias: aliases
  }
}
