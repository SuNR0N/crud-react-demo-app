import { createAction } from '../actions';
import { ActionTypes } from '../actions/CategoryActions';
import { ICategoryDTO } from '../interfaces/dtos/CategoryDTO';
import {
  initialState,
  reducer,
} from './CategoryReducer';

describe('CategoryReducer', () => {
  describe('initialState', () => {
    it('should initialise "categories" as an empty array', () => {
      expect(initialState.categories).toHaveLength(0);
    });

    it('should initialise "currentCategory" as an empty object', () => {
      expect(initialState.currentCategory).toEqual({});
    });
  });

  describe('reducer', () => {
    const categories: ICategoryDTO[] = [
      { id: 1 } as ICategoryDTO,
      { id: 2 } as ICategoryDTO,
      { id: 3 } as ICategoryDTO,
    ];
    const category: ICategoryDTO = {
      _links: {
        self: {
          href: '/api/v1/categories/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo',
    };

    it('should handle DELETE_CATEGORY_SUCCESS', () => {
      const action = createAction(ActionTypes.DELETE_CATEGORY_SUCCESS, 1);
      const state = reducer(
        {
          ...initialState,
          categories,
        },
        action
      );

      expect(state.categories).not.toContainEqual(expect.objectContaining({
        id: 1,
      }));
    });

    it('should handle LOAD_CATEGORY_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_CATEGORY_SUCCESS, category);
      const state = reducer(initialState, action);

      expect(state.currentCategory).toBe(category);
    });

    it('should handle LOAD_CATEGORIES_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_CATEGORIES_SUCCESS, categories);
      const state = reducer(initialState, action);

      expect(state.categories).toBe(categories);
    });

    it('should handle UPDATE_CATEGORY_SUCCESS', () => {
      const updatedCategory: ICategoryDTO = {
        ...category,
        name: 'Bar',
      };
      const action = createAction(ActionTypes.UPDATE_CATEGORY_SUCCESS, updatedCategory);
      const state = reducer(
        {
          ...initialState,
          currentCategory: category,
        },
        action
      );

      expect(state.currentCategory).toBe(updatedCategory);
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
