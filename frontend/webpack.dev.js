const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    // Need to instantiate this when declaring hot: true as a property of the webpack-dev-server
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // Automatically do not open the website at startup
    open: false,
    hot: true,
    host: 'localhost',
    port: 8080,
    compress: true,

    // Proxy URL to separate backend development server
    proxy: {
      // changeOrigin: true, // All this does is rewrite the origin of the hostheader (localhost:8080) to the target URL (localhost:3000)
      // '/api/*': {
      //   target: 'http://localhost:3000/api'
      // }
      '/': {
        target: 'http://localhost:3000/'
      }
    },
    // This makes is so when you press 'back' button on browser, it goes back to the previous route without refreshing the page
    historyApiFallback: true
  }
});
