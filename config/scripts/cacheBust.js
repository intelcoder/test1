const fs = require('fs')
const CWD = process.cwd()
const path = require('path')
const packageJson = require('../../package.json')

fs.readFile(path.resolve(CWD, './package.json'), 'utf-8', (err, data) => {
  if(err) return null
  try {
    const version = packageJson.version
    if(version) {
      const [major, minor, patch] = version.split('.')
      let mj = Number(major)
      let mi = Number(minor)
      let p = Number(patch)
      if(p <= 8) {
        p += 1
      } else if(p > 8) {
        p = 0
        // for now only updating patch
        // if(mi <= 8) {
        //   mi += 1
        // } else if(mi > 8) {
        //   mi = 0
        //   mj += 1
        // }
      }
      const newVersion = [mj, mi, p].join('.')
      const output = data.replace(/\"version\": \"[0-9]{1,10}\.[0-9]\.[0-9]\"/, `"version": "${newVersion}"`)
      fs.writeFile(path.resolve(CWD, './package.json'), output, 'utf-8', (err) => {
        if(err) throw err
      })
    }
  } catch (e) {
    throw e
  }
})
