import {
  Reducer,
  ReducersMapObject,
} from 'redux';

describe('RootReducer', () => {
  describe('rootReducer', () => {
    let reducersMapObject: ReducersMapObject;
    let authReducer: Reducer;
    let authorReducer: Reducer;
    let bookReducer: Reducer;
    let categoryReducer: Reducer;
    let errorReducer: Reducer;
    let formReducer: Reducer;
    let publisherReducer: Reducer;
    let requestReducer: Reducer;
    let routerReducer: Reducer;
    let toastrReducer: Reducer;

    beforeAll(async() => {
      const combineReducersMock = jest.fn();
      jest.resetModules();
      jest.doMock('redux', () => ({
        combineReducers: combineReducersMock,
      }));
      authReducer = (await import('./AuthReducer')).reducer;
      authorReducer = (await import('./AuthorReducer')).reducer;
      bookReducer = (await import('./BookReducer')).reducer;
      categoryReducer = (await import('./CategoryReducer')).reducer;
      errorReducer = (await import('./ErrorReducer')).reducer;
      formReducer = (await import('redux-form')).reducer;
      publisherReducer = (await import('./PublisherReducer')).reducer;
      requestReducer = (await import('./RequestReducer')).reducer;
      routerReducer = (await import('react-router-redux')).routerReducer;
      toastrReducer = (await import('react-redux-toastr')).reducer;
      await import('./RootReducer');
      reducersMapObject = combineReducersMock.mock.calls[0][0];
    });

    it('should include the AutReducer as "auth"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        auth: authReducer,
      }));
    });

    it('should include the AuthorReducer as "author"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        author: authorReducer,
      }));
    });

    it('should include the BookReducer as "book"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        book: bookReducer,
      }));
    });

    it('should include the CategoryReducer as "category"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        category: categoryReducer,
      }));
    });

    it('should include the ErrorReducer as "error"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        error: errorReducer,
      }));
    });

    it('should include the FormReducer as "form"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        form: formReducer,
      }));
    });

    it('should include the PublisherReducer as "publisher"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        publisher: publisherReducer,
      }));
    });

    it('should include the RequestReducer as "request"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        request: requestReducer,
      }));
    });

    it('should include the RouterReducer as "router"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        router: routerReducer,
      }));
    });

    it('should include the ToastrReducer as "toastr"', () => {
      expect(reducersMapObject).toEqual(expect.objectContaining({
        toastr: toastrReducer,
      }));
    });
  });
});
