// webpack.config.js

const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
/*
// Configure the plugin
var extractPlugin = new ExtractTextPlugin({
  filename: 'main.bundle.css'
  // Setting up the relative path (where dev server can look for elements)
})*/
module.exports = {
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    publicPath: '/dist'
  },
   module: {
      rules: [
        // Change preset to 'env', but save that for later
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        },
        {
         test: /\.vue$/,
         exclude: /node_modules/,
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
         test: /\.(sa|sc|c)ss$/,
         exclude: /node_modules/,
         use: [
           MiniCssExtractPlugin.loader,
           'css-loader',
           //'postcss-loader',
           'sass-loader' // Loads a sass/scss file and compiles it t CSS
         ]
       },
       // This gets all of the files and puts them in a fonts folder into the dist
       // (fine tune this later)
       {
         test: /\.(png|woff|woff2|eot|ttf|svg)$/,
         exclude: /node_modules/,
         loader: 'file-loader',
         /*loader: 'url-loader?limit=100000',*/
         options: {
           name: '[name].[ext]',
           outputPath: 'assets'
         }
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
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].bundle.css',
        chunckFilename: '[id].css'
      })
    ]
}
