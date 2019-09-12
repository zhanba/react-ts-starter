import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import config from './config'
import * as util from './util'
import commonConfig from './webpack.config.base'

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'development',
  entry: ['./index.tsx'],
  output: {
    path: config.path.outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    host: 'localhost',
    hot: true,
    disableHostCheck: true,
    proxy: config.proxyTable,
    overlay: {
      warnings: true,
      errors: true,
    },
    noInfo: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/, // exclude antd default style
        use: [util.styleLoader, util.cssLoader],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/, // exclude antd default style
        use: [
          util.styleLoader,
          util.typeCssModulesLoader,
          util.cssModulesLoader,
          util.postcssLoader,
          util.lessLoader,
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/, // parse antd style , no css modules option
        use: [util.styleLoader, util.cssLoader, util.postcssLoader, util.lessLoader],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve(config.path.rootPath, './tsconfig.json'),
      tslint: resolve(config.path.rootPath, './tslint.json'),
      watch: resolve(config.path.srcPath),
    }),
  ],
})

export default webpackConfig
