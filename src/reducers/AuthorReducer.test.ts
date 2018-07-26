import { createAction } from '../actions';
import { ActionTypes } from '../actions/AuthorActions';
import { IAuthorDTO } from '../interfaces/dtos/AuthorDTO';
import {
  initialState,
  reducer,
} from './AuthorReducer';

describe('AuthorReducer', () => {
  describe('initialState', () => {
    it('should initialise "authors" as an empty array', () => {
      expect(initialState.authors).toHaveLength(0);
    });

    it('should initialise "currentAuthor" as an empty object', () => {
      expect(initialState.currentAuthor).toEqual({});
    });
  });

  describe('reducer', () => {
    const authors: IAuthorDTO[] = [
      { id: 1 } as IAuthorDTO,
      { id: 2 } as IAuthorDTO,
      { id: 3 } as IAuthorDTO,
    ];
    const author: IAuthorDTO = {
      _links: {
        self: {
          href: '/api/v1/authors/1',
          method: 'GET',
        },
      },
      firstName: 'John',
      fullName: 'John Doe',
      id: 1,
      lastName: 'Doe',
    };

    it('should handle DELETE_AUTHOR_SUCCESS', () => {
      const action = createAction(ActionTypes.DELETE_AUTHOR_SUCCESS, 1);
      const state = reducer(
        {
          ...initialState,
          authors,
        },
        action
      );

      expect(state.authors).not.toContainEqual(expect.objectContaining({
        id: 1,
      }));
    });

    it('should handle LOAD_AUTHOR_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_AUTHOR_SUCCESS, author);
      const state = reducer(initialState, action);

      expect(state.currentAuthor).toBe(author);
    });

    it('should handle LOAD_AUTHORS_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_AUTHORS_SUCCESS, authors);
      const state = reducer(initialState, action);

      expect(state.authors).toBe(authors);
    });

    it('should handle UPDATE_AUTHOR_SUCCESS', () => {
      const updatedAuthor: IAuthorDTO = {
        ...author,
        firstName: 'Jane',
        fullName: 'Jane Doe',
      };
      const action = createAction(ActionTypes.UPDATE_AUTHOR_SUCCESS, updatedAuthor);
      const state = reducer(
        {
          ...initialState,
          currentAuthor: author,
        },
        action
      );

      expect(state.currentAuthor).toBe(updatedAuthor);
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
