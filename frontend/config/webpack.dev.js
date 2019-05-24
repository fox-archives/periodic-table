let path = require('path');

let merge = require('webpack-merge');
let common = require('./webpack.common.js');
let webpack = require('webpack');

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
            implementation: require('dart-sass')
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // Need to instantiate this when declaring hot: true as a property of the webpack-dev-server
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    open: false,
    hot: true,
    host: 'localhost',
    port: 8080,
    compress: true,
    historyApiFallback: true,

    proxy: {
      '/assets': {
        target: 'http://localhost:3000'
      },
      '/element-data': {
        target: 'http://localhost:3000'
      },
      '/old': {
        target: 'http://localhost:3000'
      }
    }
  }
});
