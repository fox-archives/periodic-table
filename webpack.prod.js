const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [

    ]
  },
  plugins: [
    //new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(['dist/*.*', 'dist/assets/*.*'])
  ]
});
