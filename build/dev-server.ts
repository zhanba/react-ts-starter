import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import config from './webpack.config.dev'

const options = config.devServer!

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
  // tslint:disable-next-line:no-console
  console.log('dev server listening on port 5000')
})
