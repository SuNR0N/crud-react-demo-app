import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  actions,
  ActionTypes,
} from '../actions/PublisherActions';
import { PublishersApi } from '../api/PublishersApi';

function* loadPublishers() {
  try {
    const publishers = yield call(PublishersApi.getPublishers);
    yield put(actions.loadPublishersSucceeded(publishers));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    yield put(actions.loadPublishersFailed());
  }
}

export function* publisherSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_PUBLISHERS_REQUEST, loadPublishers),
  ]);
}