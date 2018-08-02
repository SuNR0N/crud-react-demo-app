import {
  BookActionTypes,
  createAction,
} from '../actions';
import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import {
  initialState,
  IState,
  reducer,
} from './RequestReducer';

describe('RequestReducer', () => {
  describe('initialState', () => {
    it('should initialise "pendingRequests" as an empty object', () => {
      expect(initialState.pendingRequests).toEqual({});
    });
  });

  describe('reducer', () => {
    let state: IState;

    beforeEach(() => {
      state = {
        pendingRequests: {},
      };
    })
    
    describe('given it receives a REQUEST', () => {
      it('should set the request count for the given request to 1 if it does not exist', () => {
        const action = createAction(BookActionTypes.LOAD_BOOKS_REQUEST, undefined);
        const newState = reducer(state, action);
  
        expect(newState.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST]).toBe(1);
      });

      it('should increase the request count for the given request if it already exists', () => {
        state.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST] = 1;
        const action = createAction(BookActionTypes.LOAD_BOOKS_REQUEST, undefined);
        const newState = reducer(state, action);
  
        expect(newState.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST]).toBe(2);
      });
    });

    describe('given it receives a SUCCESS', () => {
      it('should decrease the request count for the matching request', () => {
        state.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST] = 1;
        const collectionMock: IPageableCollectionDTO<IBookDTO> = {
          content: [],
          currentPage: 1,
          totalItems: 1,
          totalPages: 1,
        };
        const action = createAction(BookActionTypes.LOAD_BOOKS_SUCCESS, collectionMock);
        const newState = reducer(state, action);
  
        expect(newState.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST]).toBe(0);
      });
    });

    describe('given it receives a FAILURE', () => {
      it('should decrease the request count for the matching request', () => {
        state.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST] = 1;
        const action = createAction(BookActionTypes.LOAD_BOOKS_FAILURE, { message: 'Foo' });
        const newState = reducer(state, action);
  
        expect(newState.pendingRequests[BookActionTypes.LOAD_BOOKS_REQUEST]).toBe(0);
      });
    });

    it('should handle an unknown action', () => {
      const newState = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(newState).toBe(initialState);
    });
  });
});
