import { push } from 'react-router-redux';
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
} from '../actions/AuthorActions';
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

function* deleteAuthor(action: IActionWithPayload<ActionTypes.DELETE_AUTHOR_REQUEST, IResourceParams<IAuthorDTO>>) {
  try {
    yield call(ResourceApi.request, action.payload);
    yield put(actions.deleteAuthorSucceeded(action.payload.data!.id));
    if (action.payload.route) {
      yield put(push(action.payload.route));
    }
  } catch (error) {
    yield put(actions.deleteAuthorFailed());
  }
}

function* createAuthor(action: IActionWithPayload<ActionTypes.CREATE_AUTHOR_REQUEST, INewAuthorDTO>) {
  try {
    const id = yield call(AuthorsApi.createAuthor, action.payload);
    yield put(actions.createAuthorSucceeded(id));
    yield put(push(RouteConfig.authors));
  } catch (error) {
    yield put(actions.createAuthorFailed(action.payload));
  }
}

function* loadAuthor(action: IActionWithPayload<ActionTypes.LOAD_AUTHOR_REQUEST, number>) {
  try {
    const author = yield call(AuthorsApi.getAuthor, action.payload);
    yield put(actions.loadAuthorSucceeded(author));
  } catch (error) {
    yield put(actions.loadAuthorFailed(action.payload));
  }
}

function* loadAuthors(action: IActionWithPayload<ActionTypes.LOAD_AUTHORS_REQUEST, string | undefined>) {
  try {
    const authors = yield call(AuthorsApi.getAuthors, action.payload);
    yield put(actions.loadAuthorsSucceeded(authors));
  } catch (error) {
    yield put(actions.loadAuthorsFailed());
  }
}

function* updateAuthor(action: IActionWithPayload<ActionTypes.UPDATE_AUTHOR_REQUEST, IResourceParams<IAuthorUpdateDTO>>) {
  try {
    const author: IAuthorDTO = yield call(ResourceApi.request, action.payload);
    yield put(actions.updateAuthorSucceeded(author));
    yield put(push(RouteConfig.viewAuthor.replace(':id', String(author.id))));
  } catch (error) {
    yield put(actions.updateAuthorFailed(action.payload.data!));
  }
}

export function* authorSagas() {
  yield all([
    takeEvery(ActionTypes.CREATE_AUTHOR_REQUEST, createAuthor),
    takeEvery(ActionTypes.DELETE_AUTHOR_REQUEST, deleteAuthor),
    takeEvery(ActionTypes.LOAD_AUTHOR_REQUEST, loadAuthor),
    takeEvery(ActionTypes.LOAD_AUTHORS_REQUEST, loadAuthors),
    takeEvery(ActionTypes.UPDATE_AUTHOR_REQUEST, updateAuthor),
  ]);
}