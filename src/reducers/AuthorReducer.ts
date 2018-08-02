import {
  Actions,
  ActionTypes,
} from '../actions/AuthorActions';
import { IAuthorDTO } from '../interfaces/dtos/AuthorDTO';

export interface IState {
  authors: IAuthorDTO[];
  currentAuthor: IAuthorDTO;
}

export const initialState = {
  authors: [] as IAuthorDTO[],
  currentAuthor: {},
} as IState;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: state.authors.filter((author) => author.id !== action.payload),
      };
    case ActionTypes.LOAD_AUTHOR_SUCCESS:
      return {
        ...state,
        currentAuthor: action.payload,
      };
    case ActionTypes.LOAD_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: action.payload,
      };
    case ActionTypes.UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        currentAuthor: action.payload,
      };
    default:
      return state;
  }
};