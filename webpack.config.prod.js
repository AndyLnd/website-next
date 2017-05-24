const Path = require('path');
const Autoprefixer = require('autoprefixer');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WepbackHelper = require('./webpack-helper');

module.exports = {
  devtool: 'eval',
  entry: [
    'normalize.css',
    Path.resolve(__dirname, 'src/scripts/index.js'),
    Path.resolve(__dirname, 'src/stylus/index.styl')
  ],
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname,
        postcss: [
          Autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            grid: true
          })
        ]
      }
    }),
    WepbackHelper.getIndexHtmlPlugin(),
    WepbackHelper.getPortfolioHtmlPlugin(),
    WepbackHelper.getImprintHtmlPlugin(),
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static' }
    ]),
    new Webpack.optimize.UglifyJsPlugin({
      beautify: false,
      sourceMap: true
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.styl$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      }, {
        test: /\.ejs$/,
        use: [ 'ejs-compiled-loader' ]
      }]
  }
}
