import * as redux from 'redux';

import {
  IRootState,
  rootReducer,
} from '../reducers';
import { configureStore } from './Store';

describe('Store', () => {
  describe('configureStore', () => {
    let createStoreSpy: jest.SpyInstance;

    beforeEach(() => {
      createStoreSpy = jest.spyOn(redux, 'createStore');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call the createStore function with the rootReducer', () => {
      configureStore();
      const [ reducer ] = createStoreSpy.mock.calls[0];
      
      expect(reducer).toBe(rootReducer);
    });

    it('should call the createStore function with the initial state if called without an argument', () => {
      configureStore();
      const [
        reducer,
        initialState,
      ] = createStoreSpy.mock.calls[0];

      expect(initialState).toEqual({
        auth: {
          profile: null,
        },
        author: {
          authors: [],
          currentAuthor: {},
        },
        book: {
          books: {
            content: [],
            currentPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
          currentBook: {},
        },
        category: {
          categories: [],
          currentCategory: {},
        },
        error: {
          errors: [],
        },
        form: {},
        publisher: {
          currentPublisher: {},
          publishers: [],
        },
        router: {
          location: null,
        },
        toastr: {
          toastrs: [],
        },
      });
    });

    it('should call the createStore function with the provided state if called with an argument', () => {
      configureStore({} as IRootState);
      const [
        reducer,
        initialState,
      ] = createStoreSpy.mock.calls[0];

      expect(initialState).toEqual({});
    });

    it('should call the createStore function with the middlewares', () => {
      configureStore({} as IRootState);
      const [
        reducer,
        initialState,
        middlewares,
      ] = createStoreSpy.mock.calls[0];

      expect(middlewares).toEqual(expect.any(Function));
    });
  });
});
