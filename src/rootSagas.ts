import { all, fork } from 'redux-saga/effects';
import { rootSaga as templateSaga } from './view/Template/saga';

export default function* rootSaga() {
  yield all([fork(templateSaga)]);
}
