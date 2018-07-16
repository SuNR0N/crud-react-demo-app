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
} from '../actions/CategoryActions';
import { CategoriesApi } from '../api/CategoriesApi';

function* loadCategory(action: IActionWithPayload<ActionTypes.LOAD_CATEGORY_REQUEST, number>) {
  try {
    const category = yield call(CategoriesApi.getCategory, action.payload);
    yield put(actions.loadCategorySucceeded(category));
  } catch (error) {
    yield put(actions.loadCategoryFailed(action.payload));
  }
}

function* loadCategories() {
  try {
    const categories = yield call(CategoriesApi.getCategories);
    yield put(actions.loadCategoriesSucceeded(categories));
  } catch (error) {
    yield put(actions.loadCategoriesFailed());
  }
}

export function* categorySagas() {
  yield all([
    takeEvery(ActionTypes.LOAD_CATEGORY_REQUEST, loadCategory),
    takeEvery(ActionTypes.LOAD_CATEGORIES_REQUEST, loadCategories),
  ]);
}