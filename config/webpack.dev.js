const { LoaderOptionsPlugin } = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

// style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      // style-loader, css-loader 구성
      {
        test: cssRegex,
        exclude: cssModuleRegex, // 모듈 파일 제외 설정
        use: ['style-loader', 'css-loader'],
      },
      // CSS Module ([filename].module.css)
      {
        test: cssModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LoaderOptionsPlugin({ debug: true }),
  ],
  devServer: {
    static: paths.build,
    compress: true,
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
})
