const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLroot = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "views", "root.html"),
  filename: 'root.html',
  inject: 'body'
})
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [HTMLroot, new MiniCssExtractPlugin()],
  target: 'web',
  entry: { index: path.resolve(__dirname, "views","components", "Root.jsx") },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  output: {
    filename: 'babelRoot.js',
    path: path.resolve(__dirname,"views", "output")
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    inline: true,
    hot: true,
    watchContentBase: true
  }
};
