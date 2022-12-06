const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LinkTypePlugin = require("html-webpack-link-type-plugin")
  .HtmlWebpackLinkTypePlugin;
// const PreloadWebpackPlugin = require("preload-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-source-map",
  entry: ["babel-polyfill", path.join(__dirname, "/src/index.js")],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "js/[name].[hash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ExtractTextPlugin({
      filename: "style/[name].[hash].css",
      allChunks: true,
    }),
    new LinkTypePlugin({
      "*.css": "text/css",
    }),
    // new PreloadWebpackPlugin({
    //   rel: "preload",
    //   as(entry) {
    //     if (/\.css$/.test(entry)) return "style";
    //     if (/\.woff$/.test(entry)) return "font";
    //     if (/\.png$/.test(entry)) return "image";
    //     return "script";
    //   },
    // }),
  ],
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
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]",
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)$/,
        loader: "file-loader",
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: true,
  //       cache: true,
  //       extractComments: false,
  //       terserOptions: {
  //         ecma: 5,
  //         ie8: true,
  //         compress: true,
  //         warnings: true,
  //         format: {
  //           comments: false,
  //         },
  //       },
  //     }),
  //   ],
  // },
};
