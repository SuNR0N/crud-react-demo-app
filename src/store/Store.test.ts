import * as redux from 'redux';

import {
  IRootState,
  rootReducer,
} from '../reducers';
import { configureStore } from './Store';

describe('Store', () => {
  describe('configureStore', () => {
    const environmentVariables = process.env;
    let createStoreSpy: jest.SpyInstance;

    beforeEach(() => {
      process.env = { ...environmentVariables };
      createStoreSpy = jest.spyOn(redux, 'createStore');
    });

    afterEach(() => {
      jest.clearAllMocks();
      process.env = environmentVariables;
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
        request: {
          pendingRequests: {},
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
      const initialState = createStoreSpy.mock.calls[0][1];

      expect(initialState).toEqual({});
    });

    it('should call the createStore function with 3 middlewares in non production', () => {
      const applyMiddlewareSpy = jest.spyOn(redux, 'applyMiddleware');
      configureStore({} as IRootState);
      const middlewares = applyMiddlewareSpy.mock.calls[0];

      expect(middlewares).toHaveLength(3);
    });

    it('should call the createStore function with 2 middlewares in production', () => {
      process.env.NODE_ENV = 'production';
      const applyMiddlewareSpy = jest.spyOn(redux, 'applyMiddleware');
      configureStore({} as IRootState);
      const middlewares = applyMiddlewareSpy.mock.calls[0];

      expect(middlewares).toHaveLength(2);
    });
  });
});
