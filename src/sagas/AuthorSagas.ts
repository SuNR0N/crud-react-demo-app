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
} from '../actions/AuthorActions';
import { AuthorsApi } from '../api/AuthorsApi';

function* loadAuthor(action: IActionWithPayload<ActionTypes.LOAD_AUTHOR_REQUEST, number>) {
  try {
    const author = yield call(AuthorsApi.getAuthor, action.payload);
    yield put(actions.loadAuthorSucceeded(author));
  } catch (error) {
    yield put(actions.loadAuthorFailed(action.payload));
  }
}

function* loadAuthors(action: IActionWithPayload<ActionTypes.LOAD_AUTHORS_REQUEST, string | undefined>) {
  try {
    const authors = yield call(AuthorsApi.getAuthors, action.payload);
    yield put(actions.loadAuthorsSucceeded(authors));
  } catch (error) {
    yield put(actions.loadAuthorsFailed());
  }
}

export function* authorSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_AUTHOR_REQUEST, loadAuthor),
    takeEvery(ActionTypes.LOAD_AUTHORS_REQUEST, loadAuthors),
  ]);
}