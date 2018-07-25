import {
  ICategoryDTO,
  IHATEOASLink,
  INewCategoryDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_CATEGORY_FAILURE = '[Category] Create Category Failure',
  CREATE_CATEGORY_REQUEST = '[Category] Create Category Request',
  CREATE_CATEGORY_SUCCESS = '[Category] Create Category Success',
  DELETE_CATEGORY_FAILURE = '[Category] Delete Category Failure',
  DELETE_CATEGORY_REQUEST = '[Category] Delete Category Request',
  DELETE_CATEGORY_SUCCESS = '[Category] Delete Category Success',
  LOAD_CATEGORY_FAILURE = '[Category] Load Category Failure',
  LOAD_CATEGORY_REQUEST = '[Category] Load Category Request',
  LOAD_CATEGORY_SUCCESS = '[Category] Load Category Success',
  LOAD_CATEGORIES_FAILURE = '[Category] Load Categories Failure',
  LOAD_CATEGORIES_REQUEST = '[Category] Load Categories Request',
  LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success',
  UPDATE_CATEGORY_FAILURE = '[Category] Update Category Failure',
  UPDATE_CATEGORY_REQUEST = '[Category] Update Category Request',
  UPDATE_CATEGORY_SUCCESS = '[Category] Update Category Success',
};

export const actions = {
  createCategory: (category: INewCategoryDTO) => createAction(
    ActionTypes.CREATE_CATEGORY_REQUEST,
    category
  ),
  createCategoryFailed: (category: INewCategoryDTO, message: string) => createAction(
    ActionTypes.CREATE_CATEGORY_FAILURE,
    {
      data: category,
      message,
    }
  ),
  createCategorySucceeded: (id: number) => createAction(
    ActionTypes.CREATE_CATEGORY_SUCCESS,
    id
  ),
  deleteCategory: (category: ICategoryDTO, link: IHATEOASLink, route?: string) => createAction(
    ActionTypes.DELETE_CATEGORY_REQUEST,
    {
      data: category,
      link,
      route,
    }
  ),
  deleteCategoryFailed: (id: number, message: string) => createAction(
    ActionTypes.DELETE_CATEGORY_FAILURE,
    {
      id,
      message,
    }
  ),
  deleteCategorySucceeded: (id: number) => createAction(
    ActionTypes.DELETE_CATEGORY_SUCCESS,
    id
  ),
  loadCategories: (query?: string) => createAction(
    ActionTypes.LOAD_CATEGORIES_REQUEST,
    query
  ),
  loadCategoriesFailed: (message: string) => createAction(
    ActionTypes.LOAD_CATEGORIES_FAILURE,
   { message }
  ),
  loadCategoriesSucceeded: (categories: ICategoryDTO[]) => createAction(
    ActionTypes.LOAD_CATEGORIES_SUCCESS,
    categories
  ),
  loadCategory: (id: number) => createAction(
    ActionTypes.LOAD_CATEGORY_REQUEST,
    id
  ),
  loadCategoryFailed: (id: number, message: string) => createAction(
    ActionTypes.LOAD_CATEGORY_FAILURE,
    {
      id,
      message,
    }
  ),
  loadCategorySucceeded: (category: ICategoryDTO) => createAction(
    ActionTypes.LOAD_CATEGORY_SUCCESS,
    category
  ),
  updateCategory: (category: INewCategoryDTO, id: number, link: IHATEOASLink) => createAction(
    ActionTypes.UPDATE_CATEGORY_REQUEST,
    {
      data: category,
      id,
      link,
    }
  ),
  updateCategoryFailed: (category: INewCategoryDTO, id: number, message: string) => createAction(
    ActionTypes.UPDATE_CATEGORY_FAILURE,
    {
      data: category,
      id,
      message,
    }
  ),
  updateCategorySucceeded: (category: ICategoryDTO) => createAction(
    ActionTypes.UPDATE_CATEGORY_SUCCESS,
    category
  ),
}

export type Actions = ActionsUnion<typeof actions>;