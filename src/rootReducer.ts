import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { TemplateState, reducer as templateReducer } from './view/Template/reducer';

export interface GlobalState {
  router: RouterState;
  template: TemplateState;
}

export default (history: History) =>
  combineReducers<GlobalState>({
    router: connectRouter(history),
    template: templateReducer,
  });
