const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin('../css/main.css'),
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
