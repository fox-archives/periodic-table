const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

// Unique to Production Environment
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(), // Minify JS
      new OptimizeCssAssetsPlugin(), // Minify CSS
      new CompressionPlugin(), // Gzip JS and CSS
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
