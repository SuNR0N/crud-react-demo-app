import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  CategoryActions,
  CategoryActionTypes,
  IActionWithPayload,
} from '../actions';
import {
  CategoriesApi,
  ResourceApi,
} from '../api';
import { RouteConfig } from '../config/RouteConfig';
import {
  ICategoryDTO,
  INewCategoryDTO,
  IResourceParams,
} from '../interfaces';

function* deleteCategory(action: IActionWithPayload<CategoryActionTypes.DELETE_CATEGORY_REQUEST, IResourceParams<ICategoryDTO>>) {
  try {
    yield call(ResourceApi.request, action.payload);
    yield put(CategoryActions.deleteCategorySucceeded(action.payload.data!.id));
    if (action.payload.route) {
      yield put(push(action.payload.route));
    }
  } catch (error) {
    toastr.error('Category Deletion Failed', error.message);
    yield put(CategoryActions.deleteCategoryFailed(action.payload.data!.id, error.message));
  }
}

function* createCategory(action: IActionWithPayload<CategoryActionTypes.CREATE_CATEGORY_REQUEST, INewCategoryDTO>) {
  try {
    const id = yield call(CategoriesApi.createCategory, action.payload);
    yield put(CategoryActions.createCategorySucceeded(id));
    yield put(push(RouteConfig.categories));
  } catch (error) {
    toastr.error('Category Creation Failed', error.message);
    yield put(CategoryActions.createCategoryFailed(action.payload, error.message));
  }
}

function* loadCategory(action: IActionWithPayload<CategoryActionTypes.LOAD_CATEGORY_REQUEST, number>) {
  try {
    const category = yield call(CategoriesApi.getCategory, action.payload);
    yield put(CategoryActions.loadCategorySucceeded(category));
  } catch (error) {
    toastr.error('Category Load Failed', error.message);
    yield put(CategoryActions.loadCategoryFailed(action.payload, error.message));
  }
}

function* loadCategories(action: IActionWithPayload<CategoryActionTypes.LOAD_CATEGORIES_REQUEST, string | undefined>) {
  try {
    const categories = yield call(CategoriesApi.getCategories, action.payload);
    yield put(CategoryActions.loadCategoriesSucceeded(categories));
  } catch (error) {
    toastr.error('Categories Load Failed', error.message);
    yield put(CategoryActions.loadCategoriesFailed(error.message));
  }
}

function* updateCategory(action: IActionWithPayload<CategoryActionTypes.UPDATE_CATEGORY_REQUEST, IResourceParams<INewCategoryDTO>>) {
  try {
    const category: ICategoryDTO = yield call(ResourceApi.request, action.payload);
    yield put(CategoryActions.updateCategorySucceeded(category));
    yield put(push(RouteConfig.viewCategory.replace(':id', String(category.id))));
  } catch (error) {
    toastr.error('Category Update Failed', error.message);
    yield put(CategoryActions.updateCategoryFailed(action.payload.data!, action.payload.id!, error.message));
  }
}

export function* categorySagas() {
  yield all([
    takeEvery(CategoryActionTypes.CREATE_CATEGORY_REQUEST, createCategory),
    takeEvery(CategoryActionTypes.DELETE_CATEGORY_REQUEST, deleteCategory),
    takeEvery(CategoryActionTypes.LOAD_CATEGORY_REQUEST, loadCategory),
    takeEvery(CategoryActionTypes.LOAD_CATEGORIES_REQUEST, loadCategories),
    takeEvery(CategoryActionTypes.UPDATE_CATEGORY_REQUEST, updateCategory),
  ]);
}