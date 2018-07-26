import { createAction } from '../actions';
import { ActionTypes } from '../actions/BookActions';
import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import {
  initialState,
  reducer,
} from './BookReducer';

describe('BookReducer', () => {
  describe('initialState', () => {
    it('should initialise "books" as an empty collection object', () => {
      expect(initialState.books).toEqual({
        content: [],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
      });
    });

    it('should initialise "currentBook" as an empty object', () => {
      expect(initialState.currentBook).toEqual({});
    });
  });

  describe('reducer', () => {
    const books: IPageableCollectionDTO<IBookDTO> = {
      content: [
        { id: 1 } as IBookDTO,
        { id: 2 } as IBookDTO,
        { id: 3 } as IBookDTO,
      ],
      currentPage: 1,
      totalItems: 3,
      totalPages: 1,
    };
    const book: IBookDTO = {
      _links: {
        self: {
          href: '/api/v1/books/1',
          method: 'GET',
        },
      },
      authors: [],
      categories: [],
      id: 1,
      isbn10: '1234567890',
      isbn13: '1234567890123',
      publicationDate: '2001-02-03',
      publishers: [],
      title: 'Foo',
    };

    it('should handle DELETE_BOOK_SUCCESS', () => {
      const action = createAction(ActionTypes.DELETE_BOOK_SUCCESS, 1);
      const state = reducer(
        {
          ...initialState,
          books,
        },
        action
      );

      expect(state.books.content).not.toContainEqual(expect.objectContaining({
        id: 1,
      }));
      expect(state.books.totalItems).toBe(books.totalItems - 1);
    });

    it('should handle LOAD_BOOK_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_BOOK_SUCCESS, book);
      const state = reducer(initialState, action);

      expect(state.currentBook).toBe(book);
    });

    it('should handle LOAD_BOOKS_SUCCESS', () => {
      const action = createAction(ActionTypes.LOAD_BOOKS_SUCCESS, books);
      const state = reducer(initialState, action);

      expect(state.books).toBe(books);
    });

    it('should handle PAGINATE_BOOKS_SUCCESS', () => {
      const action = createAction(ActionTypes.PAGINATE_BOOKS_SUCCESS, books);
      const state = reducer(initialState, action);

      expect(state.books).toBe(books);
    });

    it('should handle UPDATE_BOOK_SUCCESS', () => {
      const updatedBook: IBookDTO = {
        ...book,
        isbn13: '987654321098',
        title: 'Bar',
      };
      const action = createAction(ActionTypes.UPDATE_BOOK_SUCCESS, updatedBook);
      const state = reducer(
        {
          ...initialState,
          currentBook: book,
        },
        action
      );

      expect(state.currentBook).toBe(updatedBook);
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
