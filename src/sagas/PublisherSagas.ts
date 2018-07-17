import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { IActionWithPayload } from '../actions/ActionHelpers';
import {
  actions,
  ActionTypes,
} from '../actions/PublisherActions';
import { PublishersApi } from '../api/PublishersApi';

function* loadPublisher(action: IActionWithPayload<ActionTypes.LOAD_PUBLISHER_REQUEST, number>) {
  try {
    const publisher = yield call(PublishersApi.getPublisher, action.payload);
    yield put(actions.loadPublisherSucceeded(publisher));
  } catch (error) {
    yield put(actions.loadPublisherFailed(action.payload));
  }
}

function* loadPublishers(action: IActionWithPayload<ActionTypes.LOAD_PUBLISHERS_REQUEST, string | undefined>) {
  try {
    const publishers = yield call(PublishersApi.getPublishers, action.payload);
    yield put(actions.loadPublishersSucceeded(publishers));
  } catch (error) {
    yield put(actions.loadPublishersFailed());
  }
}

export function* publisherSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_PUBLISHER_REQUEST, loadPublisher),
    takeEvery(ActionTypes.LOAD_PUBLISHERS_REQUEST, loadPublishers),
  ]);
}