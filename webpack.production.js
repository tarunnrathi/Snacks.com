const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
var ExtractTextPlugin = require("mini-css-extract-plugin");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const LinkTypePlugin = require("html-webpack-link-type-plugin").HtmlWebpackLinkTypePlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  target: "web",
  mode: "production",
  entry: ["babel-polyfill", path.join(__dirname, "/src/index.js")],
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.join(__dirname, "./build"),
    pathinfo: false,
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              ["transform-class-properties"],
              ["@babel/plugin-proposal-object-rest-spread"],
              ["@babel/plugin-transform-arrow-functions", { spec: true }],
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-transform-parameters"],
              ["@babel/plugin-transform-function-name"],
            ],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          ExtractTextPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [ExtractTextPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif|woff|woff2|eot|ttf)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new TransferWebpackPlugin([{ from: "public" }]),
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      scriptLoading: "defer",
      minify: true,
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ExtractTextPlugin({
      filename: "style/[name].[contenthash].css",
      allChunks: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
    new LinkTypePlugin({
      "*.css": "text/css",
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as(entry) {
        if (/\.css$/.test(entry)) return "style";
        if (/\.woff$/.test(entry)) return "font";
        if (/\.png$/.test(entry)) return "image";
        return "script";
      },
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
        },
      },
      minSize: 30000,
      maxAsyncRequests: 5,
      maxAsyncRequests: 3, 
    },
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          ie8: true,
          compress: true,
          warnings: true,
          format: {
            comments: false,
          },
        },
      }),
    ],
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,  
  },
};
