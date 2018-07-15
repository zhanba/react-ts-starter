import { routerReducer, RouterState } from 'react-router-redux'
import { combineReducers } from 'redux'
import { ITemplateState, reducer as templateReducer } from './view/Template/reducer'

export interface IGlobalState {
  routerReducer: RouterState
  template: ITemplateState
}

export default combineReducers<IGlobalState>({
  routerReducer,
  template: templateReducer,
})
