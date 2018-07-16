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
} from '../actions/BookActions';
import { BooksApi } from '../api/BooksApi';

function* loadBook(action: IActionWithPayload<ActionTypes.LOAD_BOOK_REQUEST, number>) {
  try {
    const book = yield call(BooksApi.getBook, action.payload);
    yield put(actions.loadBookSucceeded(book));
  } catch (error) {
    yield put(actions.loadBookFailed(action.payload));
  }
}

function* loadBooks() {
  try {
    const books = yield call(BooksApi.getBooks);
    yield put(actions.loadBooksSucceeded(books));
  } catch (error) {
    yield put(actions.loadBooksFailed());
  }
}

export function* bookSagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_BOOK_REQUEST, loadBook),
    takeEvery(ActionTypes.LOAD_BOOKS_REQUEST, loadBooks),
  ]);
}