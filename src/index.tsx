import 'regenerator-runtime/runtime'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'
import configureStore from './configureStore'

const store = configureStore()

const render = (Component: React.ReactElement<any>) => {
  ReactDOM.render(<div>{Component}</div>, document.getElementById('root'))
}

render(<App store={store} />)
