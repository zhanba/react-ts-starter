import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('tempalte')

export const actions = {
  componentMounted: actionCreator('COMPONENT_MOUNTED'),
  plus: actionCreator<number>('PLUS'),
  minus: actionCreator<number>('MINUS'),
}

export const asyncActions = {
  sync: actionCreator.async<unknown, unknown, unknown>('SYNC'),
}
