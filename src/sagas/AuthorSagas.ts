import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  AuthorActions,
  AuthorActionTypes,
  IActionWithPayload,
} from '../actions';
import {
  AuthorsApi,
  ResourceApi,
} from '../api';
import { RouteConfig } from '../config/RouteConfig';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  INewAuthorDTO,
  IResourceParams,
} from '../interfaces';

export function* deleteAuthor(action: IActionWithPayload<AuthorActionTypes.DELETE_AUTHOR_REQUEST, IResourceParams<IAuthorDTO>>) {
  try {
    yield call(ResourceApi.request, action.payload);
    yield put(AuthorActions.deleteAuthorSucceeded(action.payload.data!.id));
    if (action.payload.route) {
      yield put(push(action.payload.route));
    }
  } catch (error) {
    toastr.error('Author Deletion Failed', error.message);
    yield put(AuthorActions.deleteAuthorFailed(action.payload.data!.id, error.message));
  }
}

export function* createAuthor(action: IActionWithPayload<AuthorActionTypes.CREATE_AUTHOR_REQUEST, INewAuthorDTO>) {
  try {
    const id = yield call(AuthorsApi.createAuthor, action.payload);
    yield put(AuthorActions.createAuthorSucceeded(id));
    yield put(push(RouteConfig.authors));
  } catch (error) {
    toastr.error('Author Creation Failed', error.message);
    yield put(AuthorActions.createAuthorFailed(action.payload, error.message));
  }
}

export function* loadAuthor(action: IActionWithPayload<AuthorActionTypes.LOAD_AUTHOR_REQUEST, number>) {
  try {
    const author = yield call(AuthorsApi.getAuthor, action.payload);
    yield put(AuthorActions.loadAuthorSucceeded(author));
  } catch (error) {
    toastr.error('Author Load Failed', error.message);
    yield put(AuthorActions.loadAuthorFailed(action.payload, error.message));
  }
}

export function* loadAuthors(action: IActionWithPayload<AuthorActionTypes.LOAD_AUTHORS_REQUEST, string | undefined>) {
  try {
    const authors = yield call(AuthorsApi.getAuthors, action.payload);
    yield put(AuthorActions.loadAuthorsSucceeded(authors));
  } catch (error) {
    toastr.error('Authors Load Failed', error.message);
    yield put(AuthorActions.loadAuthorsFailed(error.message));
  }
}

export function* updateAuthor(action: IActionWithPayload<AuthorActionTypes.UPDATE_AUTHOR_REQUEST, IResourceParams<IAuthorUpdateDTO>>) {
  try {
    const author: IAuthorDTO = yield call(ResourceApi.request, action.payload);
    yield put(AuthorActions.updateAuthorSucceeded(author));
    yield put(push(RouteConfig.viewAuthor.replace(':id', String(author.id))));
  } catch (error) {
    toastr.error('Author Update Failed', error.message );
    yield put(AuthorActions.updateAuthorFailed(action.payload.data!, action.payload.id!, error.message));
  }
}

export function* authorSagas() {
  yield all([
    takeEvery(AuthorActionTypes.CREATE_AUTHOR_REQUEST, createAuthor),
    takeEvery(AuthorActionTypes.DELETE_AUTHOR_REQUEST, deleteAuthor),
    takeEvery(AuthorActionTypes.LOAD_AUTHOR_REQUEST, loadAuthor),
    takeEvery(AuthorActionTypes.LOAD_AUTHORS_REQUEST, loadAuthors),
    takeEvery(AuthorActionTypes.UPDATE_AUTHOR_REQUEST, updateAuthor),
  ]);
}