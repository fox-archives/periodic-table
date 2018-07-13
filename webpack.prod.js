const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ]
  },
  plugins: [
    //new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(['dist/*.*', 'dist/assets/*.*'])
  ]
});
