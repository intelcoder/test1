const CWD = process.cwd()
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3333/__webpack_hmr',
      path.resolve(CWD, './react/containers/root/root.dev.js'),
    ],
  },

  module: {
    rules: [
      // ESLint disabled to decrease initial build time
      // Copy pre-commit file from ./git-hooks into ./.git/hooks/
      // to run eslint test before pushing your code

      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   include: /react/,
      //   exclude: /node_modules/,
      //   options: {
      //     fix: false,
      //     emitWarning: true,
      //     failOnError: false,
      //     configFile: path.resolve(CWD, './config/.eslintrc.js'),
      //     ignorePath: path.resolve(CWD, './config/.eslintignore'),
      //   },
      // },
      {
        test: /\.css$/,
        exclude: /react-flexbox-grid/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              localIdentName: '[path]__[name]__[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-modules-values')(),
                require('postcss-nested')(),
                require('autoprefixer')(),
              ]
            }
          }
        ]
      },
      //
    ]
  },

  plugins: [
    // new webpack.LoaderOptionsPlugin({ options: {} }), // fixes eslint with webpack 4
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
