import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_CATEGORY = '[Category] Create Category',
  LOAD_CATEGORY_FAILURE = '[Category] Load Category Failure',
  LOAD_CATEGORY_REQUEST = '[Category] Load Category Request',
  LOAD_CATEGORY_SUCCESS = '[Category] Load Category Success',
  LOAD_CATEGORIES_FAILURE = '[Category] Load Categories Failure',
  LOAD_CATEGORIES_REQUEST = '[Category] Load Categories Request',
  LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success',
};

export const actions = {
  createCategory: (category: INewCategoryDTO) => createAction(ActionTypes.CREATE_CATEGORY, category),
  loadCategories: () => createAction(ActionTypes.LOAD_CATEGORIES_REQUEST),
  loadCategoriesFailed: () => createAction(ActionTypes.LOAD_CATEGORIES_FAILURE),
  loadCategoriesSucceeded: (categories: ICategoryDTO[]) => createAction(ActionTypes.LOAD_CATEGORIES_SUCCESS, categories),
  loadCategory: (id: number) => createAction(ActionTypes.LOAD_CATEGORY_REQUEST, id),
  loadCategoryFailed: (id: number) => createAction(ActionTypes.LOAD_CATEGORY_FAILURE, id),
  loadCategorySucceeded: (category: ICategoryDTO) => createAction(ActionTypes.LOAD_CATEGORY_SUCCESS, category),
}

export type Actions = ActionsUnion<typeof actions>;