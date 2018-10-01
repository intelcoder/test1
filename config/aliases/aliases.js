
var path = require('path')
var CWD = process.cwd()

module.exports = {
  '@CSSVars': path.resolve(CWD, './config/styles/cssvars/' + 'property'),

  'Config': path.resolve(CWD, './config/'),
  'Components': path.resolve(CWD, './react/components/'),
  'Containers': path.resolve(CWD, './react/containers/'),
  'Defaults': path.resolve(CWD, './react/defaults/'),
  'Utils': path.resolve(CWD, './react/utils'),
  'Layout': path.resolve(CWD, './react/containers/layout/'),
  'Pages': path.resolve(CWD, './react/containers/pages'),
  'Root': path.resolve(CWD, './react/containers/root'),
  'HeroMap': path.resolve(CWD, './react/components/GoogleMaps/HeroMapV2/'),
  'Redux': path.resolve(CWD, './react/redux/'),
  'Actions': path.resolve(CWD, './react/redux/actions'),
  'Modules': path.resolve(CWD, './react/redux/modules'),
  'Services': path.resolve(CWD, './react/redux/services'),

  'Static': path.resolve(CWD, './static/'),
}
