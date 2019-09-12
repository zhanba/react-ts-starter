import { SagaIterator } from 'redux-saga';
import { fork, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from '../../util/saga';
import { actions, asyncActions } from './actions';

const syncWorker = bindAsyncAction(asyncActions.sync)(function*(params): SagaIterator {
  yield null;
  return null;
});

function* syncSaga(action: Action<any>): SagaIterator {
  yield fork(syncWorker, action.payload);
}

export function* rootSaga(): SagaIterator {
  yield takeEvery(actions.componentMounted, syncSaga);
}
