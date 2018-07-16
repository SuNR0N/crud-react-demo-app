import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  actions,
  ActionTypes,
} from '../actions/AuthActions';
import { AuthApi } from '../api/AuthApi';

function* loadProfile() {
  try {
    const profile = yield call(AuthApi.getProfile);
    yield put(actions.loadProfileSucceeded(profile));
  } catch (error) {
    yield put(actions.loadProfileFailed());
  }
}

function* logOut() {
  try {
    yield call(AuthApi.logOut);
    yield put(actions.logOutSucceeded());
    window.location.reload(true);
  } catch (error) {
    yield put(actions.logOutFailed());
  }
}

export function* authSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_PROFILE_REQUEST, loadProfile),
    takeEvery(ActionTypes.LOG_OUT_REQUEST, logOut),
  ]);
}