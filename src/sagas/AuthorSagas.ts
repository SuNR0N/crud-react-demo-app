import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  actions,
  ActionTypes,
} from '../actions/AuthorActions';
import { AuthorsApi } from '../api/AuthorsApi';

function* loadAuthors() {
  try {
    const authors = yield call(AuthorsApi.getAuthors);
    yield put(actions.loadAuthorsSucceeded(authors));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    yield put(actions.loadAuthorsFailed());
  }
}

export function* authorSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_AUTHORS_REQUEST, loadAuthors),
  ]);
}