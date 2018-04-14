import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import config from './config'
import util from './util'

const baseConfig = {
  context: config.path.srcPath,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [config.path.srcPath, 'node_modules'],
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   use: 'source-map-loader',
      // },
      {
        test: /\.js$/,
        use: util.loaders.babelLoader,
        exclude: /(node_modules|dist)/,
      },
      {
        test: /\.tsx?$/,
        use: [util.loaders.babelLoader, util.loaders.tsLoader],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Output file name.
      favicon: './assets/favicon.ico',
      template: './assets/index.html', // Use our HTML file as a template for the new one.
      inject: true,
    }),
    new CopyWebpackPlugin([{ from: config.path.assetsPath, to: 'assets' }]),
    new webpack.ContextReplacementPlugin(/view/, path.resolve(config.path.rootPath, './src/view')),
  ],
}

export default baseConfig
