let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');

let merge = require('webpack-merge');
let common = require('./webpack.common.js');

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
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
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
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist/*.*', 'dist/assets/*.*']}),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
      // filename: '[name].[hash].bundle.css',
      // chunkFilename: '[name].[id].css'
    })
  ]
});
