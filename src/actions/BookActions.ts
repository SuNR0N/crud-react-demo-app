import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_BOOK = '[Book] Create Book',
  LOAD_BOOK_FAILURE = '[Book] Load Book Failure',
  LOAD_BOOK_REQUEST = '[Book] Load Book Request',
  LOAD_BOOK_SUCCESS = '[Book] Load Book Success',
  LOAD_BOOKS_FAILURE = '[Book] Load Books Failure',
  LOAD_BOOKS_REQUEST = '[Book] Load Books Request',
  LOAD_BOOKS_SUCCESS = '[Book] Load Books Success',
};

export const actions = {
  createBook: (book: INewBookDTO) => createAction(ActionTypes.CREATE_BOOK, book),
  loadBook: (id: number) => createAction(ActionTypes.LOAD_BOOK_REQUEST, id),
  loadBookFailed: (id: number) => createAction(ActionTypes.LOAD_BOOK_FAILURE, id),
  loadBookSucceeded: (book: IBookDTO) => createAction(ActionTypes.LOAD_BOOK_SUCCESS, book),
  loadBooks: () => createAction(ActionTypes.LOAD_BOOKS_REQUEST),
  loadBooksFailed: () => createAction(ActionTypes.LOAD_BOOKS_FAILURE),
  loadBooksSucceeded: (books: IPageableCollectionDTO<IBookDTO>) => createAction(ActionTypes.LOAD_BOOKS_SUCCESS, books),
}

export type Actions = ActionsUnion<typeof actions>;