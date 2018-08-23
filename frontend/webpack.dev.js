const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
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
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  devServer: {
    port: 8080,

    // Automatically do not open the website at startup
    open: false,

    // Redirect all 404 errors to .html (so vue-router with mode: history works (without hashes))
    historyApiFallback: true,

    // Proxy URL to separate backend development server
    proxy: {
      '/': "http://localhost:3000"
    }
  }
});
