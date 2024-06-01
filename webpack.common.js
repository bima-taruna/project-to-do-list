const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    user: "./src/user.js",
    storage: "./src/storage.js",
    modal: "./src/component/modal.js",
    project: "./src/project.js",
    allProjectDOM: "./src/allProjectDOM.js",
    card: "./src/component/card.js",
    searchDOM: "./src/helper/searchDOM.js",
    projectModal: "./src/component/projectModal.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Listly",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.woff2?$/i,
        type: "asset/resource",
        dependency: { not: ["url"] },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
