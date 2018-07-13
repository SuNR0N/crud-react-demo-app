import {
  Actions,
  ActionTypes,
} from '../actions/BookActions';
import {
  IBookDTO,
  IPageableCollectionDTO,
} from "../interfaces";

export interface IState {
  books: IPageableCollectionDTO<IBookDTO>,
  currentBook: IBookDTO,
}

export const initialState = {
  books: {
    content: [] as IBookDTO[],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  currentBook: {},
} as IState;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.CREATE_BOOK:
      return state;
    case ActionTypes.LOAD_BOOK_SUCCESS:
      return {
        ...state,
        currentBook: action.payload,
      }
    case ActionTypes.LOAD_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
      }
    default:
      return state;
  }
}