import * as fs from 'fs'
import lessToJs from 'less-vars-to-js'
import { resolve } from 'path'

function resolvePath(dir: string) {
  return resolve(__dirname, '..', dir)
}

const assetsPath = resolvePath('./src/assets')

// override antd theme
// https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f
const themeVariables = lessToJs(
  fs.readFileSync(resolve(assetsPath, 'style/ant-default-vars.less'), 'utf8')
)

const proxyTable = {
  '/test': {
    target: 'http://test.com:80',
    pathRewrite: { '^/': '/test' },
    secure: false,
    changeOrigin: true,
  },
}

const config = {
  path: {
    publicPath: '.',
    srcPath: resolvePath('src'),
    outputPath: resolvePath('../dist'),
    testPath: resolvePath('test'),
    rootPath: resolvePath(''),
    assetsPath,
  },
  themeVariables,
  proxyTable,
}

export default config
