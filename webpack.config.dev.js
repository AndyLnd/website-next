const Path = require('path');
const Autoprefixer = require('autoprefixer');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Utils = require('./src/helper/utils');

const Projects = require('./src/data/projects.json');
const Blogposts = require('./src/data/blogposts.json');

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
    new HtmlWebpackPlugin({
      inject: true,
      blogposts: Blogposts,
      template: Path.resolve(__dirname, 'src/index.ejs'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      projects: Utils.sortProjects(Projects),
      filename: 'portfolio.html',
      template: Path.resolve(__dirname, 'src/portfolio.ejs'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'imprint.html',
      template: Path.resolve(__dirname, 'src/imprint.ejs'),
    }),
    new CopyWebpackPlugin([
      { from: 'src/static', to: 'static' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.styl$/i,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
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
      },
    ]
  }
}
