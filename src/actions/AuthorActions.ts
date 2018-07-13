import {
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_AUTHOR = '[Author] Create Author',
  LOAD_AUTHOR_FAILURE = '[Author] Load Author Failure',
  LOAD_AUTHOR_REQUEST = '[Author] Load Author Request',
  LOAD_AUTHOR_SUCCESS = '[Author] Load Author Success',
  LOAD_AUTHORS_FAILURE = '[Author] Load Authors Failure',
  LOAD_AUTHORS_REQUEST = '[Author] Load Authors Request',
  LOAD_AUTHORS_SUCCESS = '[Author] Load Authors Success',
};

export const actions = {
  createAuthor: (author: INewAuthorDTO) => createAction(ActionTypes.CREATE_AUTHOR, author),
  loadAuthor: (id: number) => createAction(ActionTypes.LOAD_AUTHOR_REQUEST, id),
  loadAuthorFailed: (id: number) => createAction(ActionTypes.LOAD_AUTHOR_FAILURE, id),
  loadAuthorSucceeded: (author: IAuthorDTO) => createAction(ActionTypes.LOAD_AUTHOR_SUCCESS, author),
  loadAuthors: () => createAction(ActionTypes.LOAD_AUTHORS_REQUEST),
  loadAuthorsFailed: () => createAction(ActionTypes.LOAD_AUTHORS_FAILURE),
  loadAuthorsSucceeded: (authors: IAuthorDTO[]) => createAction(ActionTypes.LOAD_AUTHORS_SUCCESS, authors),
}

export type Actions = ActionsUnion<typeof actions>;