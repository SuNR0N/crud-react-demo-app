import { toastr } from 'react-redux-toastr';
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

export function* loadProfile() {
  try {
    const profile = yield call(AuthApi.getProfile);
    yield put(actions.loadProfileSucceeded(profile));
  } catch (error) {
    toastr.error('Profile Load Failed', error.message);
    yield put(actions.loadProfileFailed(error.message));
  }
}

export function* logOut() {
  try {
    yield call(AuthApi.logOut);
    yield put(actions.logOutSucceeded());
    window.location.reload(true);
  } catch (error) {
    toastr.error('Log Out Failed', error.message);
    yield put(actions.logOutFailed(error.message));
  }
}

export function* authSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_PROFILE_REQUEST, loadProfile),
    takeEvery(ActionTypes.LOG_OUT_REQUEST, logOut),
  ]);
}