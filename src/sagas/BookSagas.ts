import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
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
import {
  BooksApi,
  ResourceApi,
} from '../api';
import { RouteConfig } from '../config/RouteConfig';
import {
  IBookDTO,
  IBookUpdateDTO,
  INewBookDTO,
  IResourceParams,
} from '../interfaces';

export function* deleteBook(action: IActionWithPayload<BookActionTypes.DELETE_BOOK_REQUEST, IResourceParams<IBookDTO>>) {
  try {
    yield call(ResourceApi.request, action.payload);
    yield put(BookActions.deleteBookSucceeded(action.payload.data!.id));
    if (action.payload.route) {
      yield put(push(action.payload.route));
    }
  } catch (error) {
    toastr.error('Book Deletion Failed', error.message);
    yield put(BookActions.deleteBookFailed(action.payload.data!.id, error.message));
  }
}

export function* createBook(action: IActionWithPayload<BookActionTypes.CREATE_BOOK_REQUEST, INewBookDTO>) {
  try {
    const id = yield call(BooksApi.createBook, action.payload);
    yield put(BookActions.createBookSucceeded(id));
    yield put(push(RouteConfig.books));
  } catch (error) {
    toastr.error('Book Creation Failed', error.message);
    yield put(BookActions.createBookFailed(action.payload, error.message));
  }
}

export function* loadBook(action: IActionWithPayload<BookActionTypes.LOAD_BOOK_REQUEST, number>) {
  try {
    const book = yield call(BooksApi.getBook, action.payload);
    yield put(BookActions.loadBookSucceeded(book));
  } catch (error) {
    toastr.error('Book Load Failed', error.message);
    yield put(BookActions.loadBookFailed(action.payload, error.message));
  }
}

export function* loadBooks(action: IActionWithPayload<BookActionTypes.LOAD_BOOKS_REQUEST, string | undefined>) {
  try {
    const books = yield call(BooksApi.getBooks, action.payload);
    yield put(BookActions.loadBooksSucceeded(books));
  } catch (error) {
    toastr.error('Books Load Failed', error.message);
    yield put(BookActions.loadBooksFailed(error.message));
  }
}

export function* updateBook(action: IActionWithPayload<BookActionTypes.UPDATE_BOOK_REQUEST, IResourceParams<IBookUpdateDTO>>) {
  try {
    const book: IBookDTO = yield call(ResourceApi.request, action.payload);
    yield put(BookActions.updateBookSucceeded(book));
    yield put(push(RouteConfig.viewBook.replace(':id', String(book.id))));
  } catch (error) {
    toastr.error('Book Update Failed', error.message);
    yield put(BookActions.updateBookFailed(action.payload.data!, action.payload.id!, error.message));
  }
}

export function* paginateBooks(action: IActionWithPayload<BookActionTypes.PAGINATE_BOOKS_REQUEST, IResourceParams>) {
  try {
    const books = yield call(ResourceApi.request, action.payload);
    yield put(BookActions.paginateBooksSucceeded(books));
  } catch (error) {
    toastr.error('Books Pagination Failed', error.message);
    yield put(BookActions.paginateBooksFailed(error.message));
  }
}

export function* bookSagas() {
  yield all([
    takeEvery(BookActionTypes.CREATE_BOOK_REQUEST, createBook),
    takeEvery(BookActionTypes.DELETE_BOOK_REQUEST, deleteBook),
    takeEvery(BookActionTypes.LOAD_BOOK_REQUEST, loadBook),
    takeEvery(BookActionTypes.LOAD_BOOKS_REQUEST, loadBooks),
    takeEvery(BookActionTypes.PAGINATE_BOOKS_REQUEST, paginateBooks),
    takeEvery(BookActionTypes.UPDATE_BOOK_REQUEST, updateBook),
  ]);
}