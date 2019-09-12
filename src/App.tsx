import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './configureStore';
import MainLayout from './layout/MainLayout';
import { withLayout } from './layout/withLayout';
import { loadView } from './util/loader';

export interface Props {
  store: any;
}

const Template = loadView('Template');

const App = (props: Props) => (
  <Provider store={props.store}>
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Router>
          <Switch>
            <Route exact path="/" component={withLayout(Template, MainLayout)} />
          </Switch>
        </Router>
      </ConnectedRouter>
    </LocaleProvider>
  </Provider>
);

export default App;
