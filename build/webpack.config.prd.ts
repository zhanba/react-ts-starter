import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpackMerge from 'webpack-merge'
import config from './config'
import util from './util'
import commonConfig from './webpack.config.base'

const webpackConfig = webpackMerge(commonConfig, {
  mode: 'production',
  entry: {
    app: './index.tsx',
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
        use: [MiniCssExtractPlugin.loader, util.loaders.cssLoader],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          util.loaders.cssLoader,
          util.loaders.postcssLoader,
          util.loaders.lessLoader,
        ],
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:6].css',
      chunkFilename: '[id].[contenthash:6].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),
    new BundleAnalyzerPlugin(),
  ],
})

export default webpackConfig
