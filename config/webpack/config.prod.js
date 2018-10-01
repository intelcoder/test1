/*/ ENV VARS /*/
const CWD = process.cwd()
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  mode: 'production',
  devtool: false,
  entry: ['babel-polyfill', path.resolve(CWD, './react/containers/root/root.prod.js')],

  // optimization: {
  //   noEmitOnErrors: false,
  //   minimize: false,
  // },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /react-flexbox-grid/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              modules: true,
              // minimize: false,
              minimize: true,
              // localIdentName: '[name]__[local]___[hash:base64:5]' // for debugging, change needed in server.all
              localIdentName: '[hash:base64:5]'
            }
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
          },
        ]
      }
      //
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({ // this causing react-router to stop working in prod
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    // }),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
    }),
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.svg|\.html$/,
    //   threshold: 0,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true,
    // }),
  ]
}
