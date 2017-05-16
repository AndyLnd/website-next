const Path = require('path');
const Autoprefixer = require('autoprefixer');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Utils = require('./src/helper/utils');

const pageTitle = require('./package.json').title;
const pageDescription = require('./package.json').description;
const Blogposts = require('./src/data/blogposts.json');
const Projects = require('./src/data/projects.json');

module.exports = {
  devtool: 'eval',
  entry: [
    'normalize.css',
    'mapbox-gl/dist/mapbox-gl.css',
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
        postcss: {
          Autoprefixer
        }
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      blogposts: Blogposts,
      filename: 'index.html',
      template: Path.resolve(__dirname, 'src/index.ejs'),
      title: pageTitle,
      description: pageDescription,
      siteUrl: "https://webkid.io/"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      projects: Utils.sortProjects(Projects),
      filename: 'portfolio.html',
      template: Path.resolve(__dirname, 'src/portfolio.ejs'),
      title: pageTitle,
      description: pageDescription,
      siteUrl: 'https://webkid.io/portfolio'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'imprint.html',
      template: Path.resolve(__dirname, 'src/imprint.ejs'),
      title: pageTitle,
      description: pageDescription,
      siteUrl: 'https://webkid.io/imprint'
    }),
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
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      },
      {
        test: /\.ejs$/,
        use: [ 'ejs-compiled-loader' ]
      }
    ]
  }
}
