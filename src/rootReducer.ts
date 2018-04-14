import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { ITemplateState, reducer as templateReducer } from './view/Template/reducer'

export interface IGlobalState {
  template: ITemplateState
}

export default combineReducers<IGlobalState>({
  routerReducer,
  template: templateReducer,
})
