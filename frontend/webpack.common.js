import path from "path";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";

export default {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        // JS in Vue script tags run when in node_modules https://vue-loader.vuejs.org/guide/pre-processors.html#excluding-node-modules
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: ["babel-loader"]
      },
      // File loader emits files in the output-atom-tab-data directory and (replaces url() and require() with a path that actually works in production also)
      {
        type: "javascript/auto",
        test: /\.json$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./assets"
        }
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./assets"
        }
      },
      {
        test: /\.svg$/,
        use: ["vue-svg-icon-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "A Periodic Table",
      filename: "index.html",
      template: "./index.html"
    })
  ]
};
