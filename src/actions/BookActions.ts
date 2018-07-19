import {
  IBookDTO,
  IBookUpdateDTO,
  IHATEOASLink,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_BOOK_FAILURE = '[Book] Create Book Failure',
  CREATE_BOOK_REQUEST = '[Book] Create Book Request',
  CREATE_BOOK_SUCCESS = '[Book] Create Book Success',
  DELETE_BOOK_FAILURE = '[Book] Delete Book Failure',
  DELETE_BOOK_REQUEST = '[Book] Delete Book Request',
  DELETE_BOOK_SUCCESS = '[Book] Delete Book Success',
  LOAD_BOOK_FAILURE = '[Book] Load Book Failure',
  LOAD_BOOK_REQUEST = '[Book] Load Book Request',
  LOAD_BOOK_SUCCESS = '[Book] Load Book Success',
  LOAD_BOOKS_FAILURE = '[Book] Load Books Failure',
  LOAD_BOOKS_REQUEST = '[Book] Load Books Request',
  LOAD_BOOKS_SUCCESS = '[Book] Load Books Success',
  UPDATE_BOOK_FAILURE = '[Book] Update Book Failure',
  UPDATE_BOOK_REQUEST = '[Book] Update Book Request',
  UPDATE_BOOK_SUCCESS = '[Book] Update Book Success',
};

export const actions = {
  createBook: (book: INewBookDTO) => createAction(ActionTypes.CREATE_BOOK_REQUEST, book),
  createBookFailed: (book: INewBookDTO) => createAction(ActionTypes.CREATE_BOOK_FAILURE, book),
  createBookSucceeded: (id: number) => createAction(ActionTypes.CREATE_BOOK_SUCCESS, id),
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => createAction(ActionTypes.DELETE_BOOK_REQUEST, { data: book, link, route }),
  deleteBookFailed: () => createAction(ActionTypes.DELETE_BOOK_FAILURE),
  deleteBookSucceeded: (id: number) => createAction(ActionTypes.DELETE_BOOK_SUCCESS, id),
  loadBook: (id: number) => createAction(ActionTypes.LOAD_BOOK_REQUEST, id),
  loadBookFailed: (id: number) => createAction(ActionTypes.LOAD_BOOK_FAILURE, id),
  loadBookSucceeded: (book: IBookDTO) => createAction(ActionTypes.LOAD_BOOK_SUCCESS, book),
  loadBooks: (query?: string) => createAction(ActionTypes.LOAD_BOOKS_REQUEST, query),
  loadBooksFailed: () => createAction(ActionTypes.LOAD_BOOKS_FAILURE),
  loadBooksSucceeded: (books: IPageableCollectionDTO<IBookDTO>) => createAction(ActionTypes.LOAD_BOOKS_SUCCESS, books),
  updateBook: (book: IBookUpdateDTO, link: IHATEOASLink) => createAction(ActionTypes.UPDATE_BOOK_REQUEST, { data: book, link }),
  updateBookFailed: (book: IBookUpdateDTO) => createAction(ActionTypes.UPDATE_BOOK_FAILURE, book),
  updateBookSucceeded: (book: IBookDTO) => createAction(ActionTypes.UPDATE_BOOK_SUCCESS, book),
}

export type Actions = ActionsUnion<typeof actions>;