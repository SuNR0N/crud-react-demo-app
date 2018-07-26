import {
  AuthActionTypes,
  AuthorActionTypes,
  BookActionTypes,
  CategoryActionTypes,
  createAction,
  PublisherActionTypes,
} from '../actions';
import {
  IAuthorUpdateDTO,
  IBookUpdateDTO,
  INewAuthorDTO,
  INewBookDTO,
  INewCategoryDTO,
  INewPublisherDTO,
} from '../interfaces/dtos';
import {
  initialState,
  reducer,
} from './ErrorReducer';

describe('ErrorReducer', () => {
  describe('initialState', () => {
    it('should initialise "errors" as an empty array', () => {
      expect(initialState.errors).toHaveLength(0);
    });
  });

  describe('reducer', () => {
    const dateMock = 1532597010564;

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => dateMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should handle LOAD_PROFILE_FAILURE', () => {
      const action = createAction(AuthActionTypes.LOAD_PROFILE_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Auth] Load Profile Failure',
      });
    });

    it('should handle LOG_OUT_FAILURE', () => {
      const action = createAction(AuthActionTypes.LOG_OUT_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Auth] Log Out Failure',
      });
    });

    it('should handle CREATE_AUTHOR_FAILURE', () => {
      const author: INewAuthorDTO = {
        firstName: 'John',
        lastName: 'Doe',
      };
      const action = createAction(AuthorActionTypes.CREATE_AUTHOR_FAILURE, {
        data: author,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: author,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Author] Create Author Failure',
      });
    });

    it('should handle DELETE_AUTHOR_FAILURE', () => {
      const action = createAction(AuthorActionTypes.DELETE_AUTHOR_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Author] Delete Author Failure',
      });
    });

    it('should handle LOAD_AUTHOR_FAILURE', () => {
      const action = createAction(AuthorActionTypes.LOAD_AUTHOR_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Author] Load Author Failure',
      });
    });

    it('should handle LOAD_AUTHORS_FAILURE', () => {
      const action = createAction(AuthorActionTypes.LOAD_AUTHORS_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Author] Load Authors Failure',
      });
    });

    it('should handle UPDATE_AUTHOR_FAILURE', () => {
      const author: IAuthorUpdateDTO = {
        firstName: 'Jane',
      };
      const action = createAction(AuthorActionTypes.UPDATE_AUTHOR_FAILURE, {
        data: author,
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: author,
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Author] Update Author Failure',
      });
    });

    it('should handle CREATE_BOOK_FAILURE', () => {
      const book: INewBookDTO = {
        isbn13: '1234567890123',
        title: 'Foo',
      };
      const action = createAction(BookActionTypes.CREATE_BOOK_FAILURE, {
        data: book,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: book,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Create Book Failure',
      });
    });

    it('should handle DELETE_BOOK_FAILURE', () => {
      const action = createAction(BookActionTypes.DELETE_BOOK_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Delete Book Failure',
      });
    });

    it('should handle LOAD_BOOK_FAILURE', () => {
      const action = createAction(BookActionTypes.LOAD_BOOK_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Load Book Failure',
      });
    });

    it('should handle LOAD_BOOKS_FAILURE', () => {
      const action = createAction(BookActionTypes.LOAD_BOOKS_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Load Books Failure',
      });
    });

    it('should handle PAGINATE_BOOKS_FAILURE', () => {
      const action = createAction(BookActionTypes.PAGINATE_BOOKS_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Paginate Books Failure',
      });
    });

    it('should handle UPDATE_BOOK_FAILURE', () => {
      const book: IBookUpdateDTO = {
        title: 'Bar',
      };
      const action = createAction(BookActionTypes.UPDATE_BOOK_FAILURE, {
        data: book,
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: book,
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Book] Update Book Failure',
      });
    });

    it('should handle CREATE_CATEGORY_FAILURE', () => {
      const category: INewCategoryDTO = {
        name: 'Foo',
      };
      const action = createAction(CategoryActionTypes.CREATE_CATEGORY_FAILURE, {
        data: category,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: category,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Category] Create Category Failure',
      });
    });

    it('should handle DELETE_CATEGORY_FAILURE', () => {
      const action = createAction(CategoryActionTypes.DELETE_CATEGORY_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Category] Delete Category Failure',
      });
    });

    it('should handle LOAD_CATEGORIES_FAILURE', () => {
      const action = createAction(CategoryActionTypes.LOAD_CATEGORIES_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Category] Load Categories Failure',
      });
    });

    it('should handle LOAD_CATEGORY_FAILURE', () => {
      const action = createAction(CategoryActionTypes.LOAD_CATEGORY_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Category] Load Category Failure',
      });
    });

    it('should handle UPDATE_CATEGORY_FAILURE', () => {
      const category: INewCategoryDTO = {
        name: 'Bar',
      };
      const action = createAction(CategoryActionTypes.UPDATE_CATEGORY_FAILURE, {
        data: category,
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: category,
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Category] Update Category Failure',
      });
    });

    it('should handle CREATE_PUBLISHER_FAILURE', () => {
      const publisher: INewPublisherDTO = {
        name: 'Foo',
      };
      const action = createAction(PublisherActionTypes.CREATE_PUBLISHER_FAILURE, {
        data: publisher,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: publisher,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Publisher] Create Publisher Failure',
      });
    });

    it('should handle DELETE_PUBLISHER_FAILURE', () => {
      const action = createAction(PublisherActionTypes.DELETE_PUBLISHER_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Publisher] Delete Publisher Failure',
      });
    });

    it('should handle LOAD_PUBLISHER_FAILURE', () => {
      const action = createAction(PublisherActionTypes.LOAD_PUBLISHER_FAILURE, {
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Publisher] Load Publisher Failure',
      });
    });

    it('should handle LOAD_PUBLISHERS_FAILURE', () => {
      const action = createAction(PublisherActionTypes.LOAD_PUBLISHERS_FAILURE, {
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        message: 'Foo',
        timestamp: dateMock,
        type: '[Publisher] Load Publishers Failure',
      });
    });

    it('should handle UPDATE_PUBLISHER_FAILURE', () => {
      const publisher: INewPublisherDTO = {
        name: 'Bar',
      };
      const action = createAction(PublisherActionTypes.UPDATE_PUBLISHER_FAILURE, {
        data: publisher,
        id: 1,
        message: 'Foo',
      });
      const state = reducer(initialState, action);

      expect(state.errors).toContainEqual({
        data: publisher,
        id: 1,
        message: 'Foo',
        timestamp: dateMock,
        type: '[Publisher] Update Publisher Failure',
      });
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
