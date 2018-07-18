import { IHATEOASLink } from '../interfaces';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_AUTHOR_FAILURE = '[Author] Create Author Failure',
  CREATE_AUTHOR_REQUEST = '[Author] Create Author Request',
  CREATE_AUTHOR_SUCCESS = '[Author] Create Author Success',
  DELETE_AUTHOR_FAILURE = '[Author] Delete Author Failure',
  DELETE_AUTHOR_REQUEST = '[Author] Delete Author Request',
  DELETE_AUTHOR_SUCCESS = '[Author] Delete Author Success',
  LOAD_AUTHOR_FAILURE = '[Author] Load Author Failure',
  LOAD_AUTHOR_REQUEST = '[Author] Load Author Request',
  LOAD_AUTHOR_SUCCESS = '[Author] Load Author Success',
  LOAD_AUTHORS_FAILURE = '[Author] Load Authors Failure',
  LOAD_AUTHORS_REQUEST = '[Author] Load Authors Request',
  LOAD_AUTHORS_SUCCESS = '[Author] Load Authors Success',
  UPDATE_AUTHOR_FAILURE = '[Author] Update Author Failure',
  UPDATE_AUTHOR_REQUEST = '[Author] Update Author Request',
  UPDATE_AUTHOR_SUCCESS = '[Author] Update Author Success',
};

export const actions = {
  createAuthor: (author: INewAuthorDTO) => createAction(ActionTypes.CREATE_AUTHOR_REQUEST, author),
  createAuthorFailed: (author: INewAuthorDTO) => createAction(ActionTypes.CREATE_AUTHOR_FAILURE, author),
  createAuthorSucceeded: (id: number) => createAction(ActionTypes.CREATE_AUTHOR_SUCCESS, id),
  deleteAuthor: (author: IAuthorDTO, link: IHATEOASLink, route?: string) => createAction(ActionTypes.DELETE_AUTHOR_REQUEST, { data: author, link, route }),
  deleteAuthorFailed: () => createAction(ActionTypes.DELETE_AUTHOR_FAILURE),
  deleteAuthorSucceeded: (id: number) => createAction(ActionTypes.DELETE_AUTHOR_SUCCESS, id),
  loadAuthor: (id: number) => createAction(ActionTypes.LOAD_AUTHOR_REQUEST, id),
  loadAuthorFailed: (id: number) => createAction(ActionTypes.LOAD_AUTHOR_FAILURE, id),
  loadAuthorSucceeded: (author: IAuthorDTO) => createAction(ActionTypes.LOAD_AUTHOR_SUCCESS, author),
  loadAuthors: (query?: string) => createAction(ActionTypes.LOAD_AUTHORS_REQUEST, query),
  loadAuthorsFailed: () => createAction(ActionTypes.LOAD_AUTHORS_FAILURE),
  loadAuthorsSucceeded: (authors: IAuthorDTO[]) => createAction(ActionTypes.LOAD_AUTHORS_SUCCESS, authors),
  updateAuthor: (author: IAuthorUpdateDTO, link: IHATEOASLink) => createAction(ActionTypes.UPDATE_AUTHOR_REQUEST, { data: author, link }),
  updateAuthorFailed: (author: IAuthorUpdateDTO) => createAction(ActionTypes.UPDATE_AUTHOR_FAILURE, author),
  updateAuthorSucceeded: (author: IAuthorDTO) => createAction(ActionTypes.UPDATE_AUTHOR_SUCCESS, author),
}

export type Actions = ActionsUnion<typeof actions>;