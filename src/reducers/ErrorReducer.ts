import {
  ActionsUnion,
  AuthActions,
  AuthActionTypes,
  AuthorActions,
  AuthorActionTypes,
  BookActions,
  BookActionTypes,
  CategoryActions,
  CategoryActionTypes,
  PublisherActions,
  PublisherActionTypes,
} from '../actions';
import { IErrorLogEntry } from '../interfaces/ErrorLogEntry';

export interface IState {
  errors: IErrorLogEntry[],
}

export const initialState = {
  errors: [] as IErrorLogEntry[],
} as IState;

type Actions =
  ActionsUnion<typeof AuthActions> |
  ActionsUnion<typeof AuthorActions> |
  ActionsUnion<typeof BookActions> |
  ActionsUnion<typeof CategoryActions> |
  ActionsUnion<typeof PublisherActions>;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case AuthActionTypes.LOAD_PROFILE_FAILURE:
    case AuthActionTypes.LOG_OUT_FAILURE:
    case AuthorActionTypes.CREATE_AUTHOR_FAILURE:
    case AuthorActionTypes.DELETE_AUTHOR_FAILURE:
    case AuthorActionTypes.LOAD_AUTHOR_FAILURE:
    case AuthorActionTypes.LOAD_AUTHORS_FAILURE:
    case AuthorActionTypes.UPDATE_AUTHOR_FAILURE:
    case BookActionTypes.CREATE_BOOK_FAILURE:
    case BookActionTypes.DELETE_BOOK_FAILURE:
    case BookActionTypes.LOAD_BOOK_FAILURE:
    case BookActionTypes.LOAD_BOOKS_FAILURE:
    case BookActionTypes.UPDATE_BOOK_FAILURE:
    case CategoryActionTypes.CREATE_CATEGORY_FAILURE:
    case CategoryActionTypes.DELETE_CATEGORY_FAILURE:
    case CategoryActionTypes.LOAD_CATEGORIES_FAILURE:
    case CategoryActionTypes.LOAD_CATEGORY_FAILURE:
    case CategoryActionTypes.UPDATE_CATEGORY_FAILURE:
    case PublisherActionTypes.CREATE_PUBLISHER_FAILURE:
    case PublisherActionTypes.DELETE_PUBLISHER_FAILURE:
    case PublisherActionTypes.LOAD_PUBLISHER_FAILURE:
    case PublisherActionTypes.LOAD_PUBLISHERS_FAILURE:
    case PublisherActionTypes.UPDATE_PUBLISHER_FAILURE:
      return {
        ...state,
        errors: [
          ...state.errors,
          {
            ...action.payload,
            timestamp: Date.now(),
            type: action.type,
          },
        ],
      };
    default:
      return state;
  }
}