import dotenv from "dotenv";
import webpack from "webpack";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import DashboardPlugin from "webpack-dashboard/plugin";
import merge from "webpack-merge";

import common from "./webpack.common";

dotenv.config({ path: "../" });

export default merge.smart(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // Need to instantiate this when declaring hot: true as a property of the webpack-dev-server
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new DashboardPlugin()
  ],
  devServer: {
    open: false,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    compress: true,
    historyApiFallback: true,
    quiet: true,

    proxy: {
      changeOrigin: true,
      ignorePath: true,
      "/assets": {
        target: "http://server:3000"
      },
      "/data": {
        target: "http://server:3000"
      }
    }
  }
});
