// webpack.config.js

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      /*publicPath: 'dist'*/
  },
   module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
         test: /\.vue$/,
         //exclude: /node_modules/,
         loader: 'vue-loader',
         /*options: {
           loaders: {
             scss: {
               loader: 'sass-loader'
             }
           }
         }*/
       },
       {
         test: /\.(sa|sc)ss$/,
         exclude: /node_modules/,
         use: [
           MiniCssExtractPlugin.loader,
           'css-loader',
           'sass-loader' // Loads a sass / scss file and compiles it to CSS
         ]
       },
       {
         test: /\.css$/,
         use: [
           MiniCssExtractPlugin.loader,
           'css-loader'
         ]
       },
        // File loader emits files in the output directory and (replaces url() and require() with a path that actually works in production also)
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
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
        chunckFilename: '[id].css'
      }),
      new CopyWebpackPlugin([
        { from: 'index.html', to: '' }
      ])
    ]
}
