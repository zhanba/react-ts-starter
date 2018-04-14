import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpackMerge from 'webpack-merge'
import config from './config'
import util from './util'
import commonConfig from './webpack.config.base'

// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366

const extractCss = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:5].css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development',
})

const extractLess = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development',
})

const extractModuleLess = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development',
})

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'production',
  entry: {
    app: './index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'history',
      'react-router-dom',
      'redux',
      'redux-saga',
      'axios',
      'react-loadable',
    ],
  },
  output: {
    path: config.path.outputPath,
    filename: 'js/[chunkhash:5].js',
    // filename: 'js/[name].[chunkhash:5].js',
    publicPath: config.path.publicPath,
    chunkFilename: 'js/[chunkhash:5].js',
    // chunkFilename: 'js/[name].[id].[chunkhash:5].js',
  },
  optimization: {
    runtimeChunk: true,
    occurrenceOrder: true, // To keep filename consistent between different modes (for example building only)
    splitChunks: {
      name: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/, // exclude antd default style
        use: extractCss.extract({
          use: [util.loaders.cssLoader],
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/, // exclude antd default style
        use: extractModuleLess.extract({
          use: [
            util.loaders.TypingsLessModulesLoader,
            util.loaders.postcssLoader,
            util.loaders.lessLoader,
          ],
        }),
      },
      {
        test: /\.less$/,
        include: /node_modules/, // exclude antd default style
        use: extractLess.extract({
          use: [util.loaders.cssLoader, util.loaders.postcssLoader, util.loaders.lessLoader],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([config.path.outputPath], {
      root: config.path.rootPath,
      verbose: true, // Write logs to console.
      allowExternal: true,
      exclude: ['WEB-INF'],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),
    extractCss,
    extractModuleLess,
    extractLess,
    new BundleAnalyzerPlugin(),
  ],
})

export default webpackConfig
