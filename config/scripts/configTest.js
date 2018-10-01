// this script checks if config.json has a missing config property

const chalk = require('chalk')
const config = require('../config')
const error = chalk.bold.red
const sampleConfig = require('../sample.config')

if(config) {
  const unMatch = Object.keys(sampleConfig).filter((key) => !(key in config))
  if(unMatch.length > 0) {
    console.log(chalk.bgRed(chalk.bold.black('You have missing config property. Check config.json')))
  }
  unMatch.forEach((item) => {
    console.log(`${error(item)}`)
  })
  console.log(' ')
}
