const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (_, argv) => {
  const mode = argv.mode || "development";

  return {
    mode: mode,
    entry: {
      bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true,
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "src"),
      },
      port: 8384,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.njk$/,
          use: [
            {
              loader: "simple-nunjucks-loader",
              options: {},
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Consent String Decoder",
        filename: "index.html",
        template: "src/template.html",
      }),

      // new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    //   watch: true, // Enable watch mode
  };
};
