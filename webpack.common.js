const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const polyfills = [
  'core-js/fn/array/from',
  'core-js/fn/array/for-each'
];

module.exports = {
  entry: [
    ...polyfills,
    './assets/scripts/main.js',
    './assets/scss/main.scss'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/main.css'),
    new CopyWebpackPlugin([
      {
        from: './assets/favicons',
        to: '../favicons'
      },
      {
        from: './assets/svg',
        to: '../svg'
      }
    ])
  ]
};
