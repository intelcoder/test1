const fs = require('fs')
const CWD = process.cwd()
const path = require('path')
const packageJson = require('../../package.json')
const configs = require('../../config/config.json')

const glob = require('glob')


// delete all the files with gz and delete if version is different
glob(path.resolve(CWD, './dist/' + '**(gz)'), {}, function(err, files) {
  files.forEach(function(path) {
    if(!path.match(packageJson.version)) {
      fs.unlink(path, function(err) {
      })
    }
  })
})

const siteName = configs.ALGOLIA_PREFIX.replace('_', '')
// generate sw file base on version and siteName
fs.readFile(path.resolve(CWD, './static/baseSw.js'), 'utf-8', function(err, data) {
  if(err) throw err
  const newContents = data
    .replace(/\$version/g, packageJson.version)
    .replace(/SITE_NAME/g, siteName)
  fs.writeFile(path.resolve(CWD, './static/sw.js'), newContents, 'utf-8', function(err) {
    if(err) throw err
  })
})

