
const CWD = process.cwd()
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const SvgToJsonPlugin = require('svg-to-json-webpack-plugin')

const development = require('./config.dev.js')
const production = require('./config.prod.js')
const aliases = require('../aliases/aliases.js')

const THEME_NAME = 'property'
const ignores = ['property', 'condos', 'mrloft'].filter(name => THEME_NAME !== name)
const ignoreRegex = new RegExp(`(${ignores.join('|')}).css`)

const distPath = process.env.NODE_ENV === 'production' ? 'dist' : 'dist'

const common = {
  output: {
    path: path.resolve(CWD, distPath),
    publicPath: `/${distPath}/`,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: aliases
  },

  stats: {
    warnings: false,
    children: false,
  },

  optimization: {
    splitChunks: {
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react'],
            plugins: [
              'transform-decorators-legacy',
              'transform-runtime',
              'syntax-dynamic-import',
              'react-imported-component/babel',
            ]
          }
        }],
      },
      { test: ignoreRegex, loader: 'ignore-loader' }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.WatchIgnorePlugin([/static\/spritesheet\.json$/]),

    new SvgToJsonPlugin({
      src: path.resolve(CWD, './static/svg/**/*.svg'),
      prefix: 'icon-',
      filename: 'spritesheet.json',
      outputPath: path.resolve(CWD, 'static')
    })
  ],
}

if      (process.env.NODE_ENV === 'development')  module.exports = merge(development, common)
else if (process.env.NODE_ENV === 'production')   module.exports = merge(production, common)

