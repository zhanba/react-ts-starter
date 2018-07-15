import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducers from '../rootReducer'
import sagas from '../rootSagas'

import { routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createHashHistory'

export const history = createHistory()

const sagaMiddleware = createSagaMiddleware()
const routerReduxMiddleware = routerMiddleware(history)

const middlewares = [sagaMiddleware, routerReduxMiddleware]

let enhancer: StoreEnhancer

if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(applyMiddleware(...middlewares))
}

if (process.env.NODE_ENV === 'production') {
  enhancer = compose(applyMiddleware(...middlewares))
}

export default function configureStore() {
  const store = createStore(reducers, enhancer)
  sagaMiddleware.run(sagas)
  return store
}
