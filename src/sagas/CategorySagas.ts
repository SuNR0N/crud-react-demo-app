import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  actions,
  ActionTypes,
} from '../actions/CategoryActions';
import { CategoriesApi } from '../api/CategoriesApi';

function* loadCategories() {
  try {
    const categories = yield call(CategoriesApi.getCategories);
    yield put(actions.loadCategoriesSucceeded(categories));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    yield put(actions.loadCategoriesFailed());
  }
}

export function* categorySagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_CATEGORIES_REQUEST, loadCategories),
  ]);
}