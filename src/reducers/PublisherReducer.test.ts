import { createAction } from '../actions';
import { ActionTypes } from '../actions/PublisherActions';
import { IPublisherDTO } from '../interfaces/dtos/PublisherDTO';
import {
  initialState,
  reducer,
} from './PublisherReducer';

describe('PublisherReducer', () => {
  describe('initialState', () => {
    it('should initialise "publishers" as an empty array', () => {
      expect(initialState.publishers).toHaveLength(0);
    });

    it('should initialise "currentPublisher" as an empty object', () => {
      expect(initialState.currentPublisher).toEqual({});
    });
  });

  describe('reducer', () => {
    const publishers: IPublisherDTO[] = [
      { id: 1 } as IPublisherDTO,
      { id: 2 } as IPublisherDTO,
      { id: 3 } as IPublisherDTO,
    ];
    const publisher: IPublisherDTO = {
      _links: {
        self: {
          href: '/api/v1/publishers/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo',
    };

    it('should handle DELETE_PUBLISHER_SUCCESS', () => {
      const action = createAction(ActionTypes.DELETE_PUBLISHER_SUCCESS, 1);
      const state = reducer(
        {
          ...initialState,
          publishers,
        },
        action
      );

      expect(state.publishers).not.toContainEqual(expect.objectContaining({
        id: 1,
      }));
    });

    it('should handle LOAD_PUBLISHER_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_PUBLISHER_SUCCESS, publisher);
      const state = reducer(initialState, action);

      expect(state.currentPublisher).toBe(publisher);
    });

    it('should handle LOAD_PUBLISHERS_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_PUBLISHERS_SUCCESS, publishers);
      const state = reducer(initialState, action);

      expect(state.publishers).toBe(publishers);
    });

    it('should handle UPDATE_PUBLISHER_SUCCESS', () => {
      const updatedPublisher: IPublisherDTO = {
        ...publisher,
        name: 'Bar',
      };
      const action = createAction(ActionTypes.UPDATE_PUBLISHER_SUCCESS, updatedPublisher);
      const state = reducer(
        {
          ...initialState,
          currentPublisher: publisher,
        },
        action
      );

      expect(state.currentPublisher).toBe(updatedPublisher);
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
