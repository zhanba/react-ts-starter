import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { ITemplateState, reducer as templateReducer } from './view/Template/reducer'

export interface IGlobalState {
  router: RouterState
  template: ITemplateState
}

export default (history: History) =>
  combineReducers<IGlobalState>({
    router: connectRouter(history),
    template: templateReducer,
  })
