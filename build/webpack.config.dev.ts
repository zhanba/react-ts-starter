import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import config from './config'
import util from './util'
import commonConfig from './webpack.config.base'

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'development',
  entry: ['./index.dev.tsx'],
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
        use: [util.loaders.styleLoader, util.loaders.cssLoader],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/, // exclude antd default style
        use: [
          util.loaders.styleLoader,
          util.loaders.TypingsLessModulesLoader,
          util.loaders.postcssLoader,
          util.loaders.lessLoader,
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/, // parse antd style , no css modules option
        use: [
          util.loaders.styleLoader,
          util.loaders.cssLoader,
          util.loaders.postcssLoader,
          util.loaders.lessLoader,
        ],
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
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
      skipSuccessful: true,
    }),
  ],
})

export default webpackConfig
