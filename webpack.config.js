const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/yt_stream_smoother.ts",
  output: {
    filename: "yt_stream_smoother.js",
    path: path.resolve(__dirname, "dist"),
    iife: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "assets", to: "./" }],
    }),
  ],
};
