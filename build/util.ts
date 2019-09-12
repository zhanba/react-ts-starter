import tsImportPluginFactory from 'ts-import-plugin'
import config from './config'

export const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
}

export const tsLoader = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        }),
      ],
    }),
  },
}

export const styleLoader = {
  loader: 'style-loader', // creates style nodes from JS strings
}

export const cssLoader = {
  loader: 'css-loader', // translates CSS into CommonJS
}

export const cssModulesLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    modules: true,
  },
}

export const typeCssModulesLoader = 'css-modules-typescript-loader'

export const postcssLoader = 'postcss-loader'

export const lessLoader = {
  loader: 'less-loader',
  options: {
    modifyVars: config.themeVariables,
    javascriptEnabled: true,
  },
}
