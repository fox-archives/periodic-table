const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // JS in Vue script tags run when in node_modules https://vue-loader.vuejs.org/guide/pre-processors.html#excluding-node-modules
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      // File loader emits files in the output directory and (replaces url() and require() with a path that actually works in production also)
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets'
        }
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets'
        }
      },
      {
        test: /\.svg$/,
        use: [
          'vue-svg-icon-loader'
        ],
      }
    ]
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, 'src/styles/'),
      Components: path.resolve(__dirname, 'src/components')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'A Periodic Table',
      filename: 'index.html',
      template: './index.html'
    })
  ]
};
