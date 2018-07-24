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
  PAGINATE_BOOKS_FAILURE = '[Book] Paginate Books Failure',
  PAGINATE_BOOKS_REQUEST = '[Book] Paginate Books Request',
  PAGINATE_BOOKS_SUCCESS = '[Book] Paginate Books Success',
  UPDATE_BOOK_FAILURE = '[Book] Update Book Failure',
  UPDATE_BOOK_REQUEST = '[Book] Update Book Request',
  UPDATE_BOOK_SUCCESS = '[Book] Update Book Success',
};

export const actions = {
  createBook: (book: INewBookDTO) => createAction(ActionTypes.CREATE_BOOK_REQUEST, book),
  createBookFailed: (book: INewBookDTO, message: string) => createAction(
    ActionTypes.CREATE_BOOK_FAILURE,
    {
      data: book,
      message,
    }
  ),
  createBookSucceeded: (id: number) => createAction(ActionTypes.CREATE_BOOK_SUCCESS, id),
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => createAction(
    ActionTypes.DELETE_BOOK_REQUEST,
    {
      data: book,
      link,
      route,
    }
  ),
  deleteBookFailed: (id: number, message: string) => createAction(
    ActionTypes.DELETE_BOOK_FAILURE,
    {
      id,
      message,
    }
  ),
  deleteBookSucceeded: (id: number) => createAction(ActionTypes.DELETE_BOOK_SUCCESS, id),
  loadBook: (id: number) => createAction(ActionTypes.LOAD_BOOK_REQUEST, id),
  loadBookFailed: (id: number, message: string) => createAction(
    ActionTypes.LOAD_BOOK_FAILURE,
    {
      id,
      message,
    }
  ),
  loadBookSucceeded: (book: IBookDTO) => createAction(ActionTypes.LOAD_BOOK_SUCCESS, book),
  loadBooks: (query?: string) => createAction(ActionTypes.LOAD_BOOKS_REQUEST, query),
  loadBooksFailed: (message: string) => createAction(
    ActionTypes.LOAD_BOOKS_FAILURE,
    { message }
  ),
  loadBooksSucceeded: (books: IPageableCollectionDTO<IBookDTO>) => createAction(ActionTypes.LOAD_BOOKS_SUCCESS, books),
  paginateBooks: (link: IHATEOASLink) => createAction(
    ActionTypes.PAGINATE_BOOKS_REQUEST,
    { link }
  ),
  paginateBooksFailed: (message: string) => createAction(
    ActionTypes.PAGINATE_BOOKS_FAILURE,
    { message }
  ),
  paginateBooksSucceeded: (books: IPageableCollectionDTO<IBookDTO>) => createAction(ActionTypes.PAGINATE_BOOKS_SUCCESS, books),
  updateBook: (book: IBookUpdateDTO, id: number, link: IHATEOASLink) => createAction(
    ActionTypes.UPDATE_BOOK_REQUEST,
    {
      data: book,
      id,
      link,
    }
  ),
  updateBookFailed: (book: IBookUpdateDTO, id: number, message: string) => createAction(
    ActionTypes.UPDATE_BOOK_FAILURE,
    {
      data: book,
      id,
      message,
    }
  ),
  updateBookSucceeded: (book: IBookDTO) => createAction(ActionTypes.UPDATE_BOOK_SUCCESS, book),
}

export type Actions = ActionsUnion<typeof actions>;