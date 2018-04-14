import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, asyncActions } from './actions'

export interface ITemplateState {
  count: number
}

const INITIAL_STATE: ITemplateState = {
  count: 0,
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.plus, (state, payload) => {
    return { ...state, count: state.count + payload }
  })
  .case(actions.minus, (state, payload) => {
    return { ...state, count: state.count - payload }
  })
  .case(asyncActions.sync.done, (state, payload) => {
    return { ...state }
  })
