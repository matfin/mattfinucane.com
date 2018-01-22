const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'main.js'
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /\/node_modules/
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
