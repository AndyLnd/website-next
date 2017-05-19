const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Utils = require('./src/helper/utils');
const title = require('./package.json').title;
const description = require('./package.json').description;
const projects = Utils.sortProjects(require('./src/data/projects.json'));
const awards = require('./src/data/awards.json');
const blogposts = require('./src/data/blogposts.json');
const teasers = require('./src/data/teasers.json');

function getIndexHtmlPlugin() {
  return new HtmlWebpackPlugin({
      inject: true,
      template: Path.resolve(__dirname, 'src/index.ejs'),
      siteUrl: 'https://webkid.io/',
      title,
      description,
      blogposts,
      teasers
  })
}

function getPortfolioHtmlPlugin() {
  return new HtmlWebpackPlugin({
    inject: true,
    filename: 'portfolio.html',
    template: Path.resolve(__dirname, 'src/portfolio.ejs'),
    siteUrl: 'https://webkid.io/portfolio',
    title,
    description,
    projects,
    awards
  });
}

function getImprintHtmlPlugin() {
  return new HtmlWebpackPlugin({
    inject: true,
    filename: 'imprint.html',
    template: Path.resolve(__dirname, 'src/imprint.ejs'),
    siteUrl: 'https://webkid.io/imprint',
    title,
    description
  });
}

function getStyleguideHtmlPlugin() {
  return new HtmlWebpackPlugin({
    inject: true,
    filename: 'styleguide.html',
    template: Path.resolve(__dirname, 'src/styleguide.ejs'),
    siteUrl: 'https://webkid.io/styleguide',
    title,
    description
  });
}

module.exports = {
  getIndexHtmlPlugin,
  getPortfolioHtmlPlugin,
  getImprintHtmlPlugin,
  getStyleguideHtmlPlugin
}