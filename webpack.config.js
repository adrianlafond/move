const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        loader: 'file-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      templateParameters: {
        title: 'Move!',
      },
    }),
    new CleanWebpackPlugin()
  ],
};
