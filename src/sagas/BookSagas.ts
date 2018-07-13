import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  actions,
  ActionTypes,
} from '../actions/BookActions';
import { BooksApi } from '../api/BooksApi';

function* loadBooks() {
  try {
    const books = yield call(BooksApi.getBooks);
    yield put(actions.loadBooksSucceeded(books));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    yield put(actions.loadBooksFailed());
  }
}

export function* bookSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_BOOKS_REQUEST, loadBooks),
  ]);
}