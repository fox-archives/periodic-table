let merge = require('webpack-merge');
let common = require('./webpack.common.js');
let webpack = require('webpack');
let path = require('path');

let CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge.smart(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader'
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }), // Minify JS
      new OptimizeCssAssetsPlugin(), // Minify CSS
      new CompressionPlugin() // Gzip JS and CSS
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*', 'dist/assets/*.*']),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
      // filename: '[name].[hash].bundle.css',
      // chunkFilename: '[name].[id].css'
    })
  ]
});
