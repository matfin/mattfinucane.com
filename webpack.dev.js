const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, './site/static/js/'),
    filename: 'main.js'
  }
});

