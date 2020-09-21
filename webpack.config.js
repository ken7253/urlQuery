const path = require("path");
module.exports = {
  entry: {
    urlQuery: "./src/main.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "urlQuery.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
};
