import {
  Actions,
  ActionTypes,
} from '../actions/CategoryActions';
import { ICategoryDTO } from '../interfaces/dtos/CategoryDTO';

export interface IState {
  categories: ICategoryDTO[];
  currentCategory: ICategoryDTO;
}

export const initialState = {
  categories: [] as ICategoryDTO[],
  currentCategory: {},
} as IState;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case ActionTypes.LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case ActionTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case ActionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      return state;
  }
};