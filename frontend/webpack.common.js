const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
    // filename: '[name].[hash].bundle.js',
  },
  optimization: {
    // The SplitChunksPlugin extracts common dependencies into existing entry chunk or an entirely new chunk
    //
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     fix: true,
          //     cache: true
          //   }
          // }
        ],
        // JS in Vue script tags run when in node_modules https://vue-loader.vuejs.org/guide/pre-processors.html#excluding-node-modules
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
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
        use: ['vue-svg-icon-loader']
      }
    ]
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),

    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),

    new HtmlWebpackPlugin({
      title: 'A Periodic Table',
      filename: 'index.html',
      template: './index.html'
    })
  ]
};
