const Path = require('path');
const Autoprefixer = require('autoprefixer');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const WepbackHelper = require('./webpack-helper');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer:
  {
    contentBase: './build',
    compress: true,
    hot: true,
    port: 3000,
    inline: true
  },
  entry: [
    'normalize.css',
    Path.resolve(__dirname, 'src/stylus/index.styl'),
    Path.resolve(__dirname, 'src/scripts/index.js')
  ],
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          Autoprefixer
        ]
      }
    }),
    new Webpack.HotModuleReplacementPlugin(),
    WepbackHelper.getIndexHtmlPlugin(),
    WepbackHelper.getPortfolioHtmlPlugin(),
    WepbackHelper.getImprintHtmlPlugin(),
    WepbackHelper.getStyleguideHtmlPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static' }
    ])
  ],
  module: {
    rules: [{
        test: /\.styl$/i,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }, {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
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
