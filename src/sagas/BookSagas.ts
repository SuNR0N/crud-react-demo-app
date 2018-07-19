import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  BookActions,
  BookActionTypes,
  IActionWithPayload,
} from '../actions';
import { BooksApi } from '../api/BooksApi';

function* loadBook(action: IActionWithPayload<BookActionTypes.LOAD_BOOK_REQUEST, number>) {
  try {
    const book = yield call(BooksApi.getBook, action.payload);
    yield put(BookActions.loadBookSucceeded(book));
  } catch (error) {
    yield put(BookActions.loadBookFailed(action.payload));
  }
}

function* loadBooks(action: IActionWithPayload<BookActionTypes.LOAD_BOOKS_REQUEST, string | undefined>) {
  try {
    const books = yield call(BooksApi.getBooks, action.payload);
    yield put(BookActions.loadBooksSucceeded(books));
  } catch (error) {
    yield put(BookActions.loadBooksFailed());
  }
}

export function* bookSagas() {
  yield all([
    takeEvery(BookActionTypes.LOAD_BOOK_REQUEST, loadBook),
    takeEvery(BookActionTypes.LOAD_BOOKS_REQUEST, loadBooks),
  ]);
}