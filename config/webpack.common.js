const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const path = require('path');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: paths.src,
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    clean: true,
    assetModuleFilename: 'assets/[hash].[ext]?[query]',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: {version: 3, proposals: true},
                useBuiltIns: 'usage',
                shippedProposals: true,
                targets: {
                  browsers: ['>= 1%, not dead'],
                },
              },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel',
          ],
        },
        exclude: /node_modules/,
      },
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {
        test: /\.(ico|png|jpe?g|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new RefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: paths.public + '/index.html',
      favicon: paths.public + '/favicon.ico',
      filename: 'index.html',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },

};
