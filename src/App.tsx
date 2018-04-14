import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import MainLayout from './layout/MainLayout'
import { withLayout } from './layout/withLayout'
import { history } from './redux/configureStore'
import { loadView } from './util/loader'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export interface IProps {
  store: any
}

const Template = loadView('Template')

const App = (props: IProps) => (
  <Provider store={props.store}>
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Router>
          <Switch>
            <Route exact path="/" component={withLayout(Template, MainLayout)} />
            />
          </Switch>
        </Router>
      </ConnectedRouter>
    </LocaleProvider>
  </Provider>
)

export default App
