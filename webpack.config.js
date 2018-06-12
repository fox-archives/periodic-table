// webpack.config.js

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
   module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
         test: /\.vue$/,
         loader: 'vue-loader'
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
      new VueLoaderPlugin()
    ]
}
