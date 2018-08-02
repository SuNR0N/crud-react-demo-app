import {
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';
import { toastr } from 'react-redux-toastr';
import { runSaga } from 'redux-saga';
import {
  AllEffect,
  takeEvery,
} from 'redux-saga/effects';

import {
  createAction,
  IActionWithPayload,
} from '../actions';
import {
  Actions,
  ActionTypes,
} from '../actions/BookActions';
import {
  BooksApi,
  ResourceApi,
} from '../api';
import {
  IBookDTO,
  IBookUpdateDTO,
  IHATEOASLink,
  INewBookDTO,
  IPageableCollectionDTO,
  IResourceParams,
} from '../interfaces';
import {
  bookSagas,
  createBook,
  deleteBook,
  loadBook,
  loadBooks,
  paginateBooks,
  updateBook,
} from './BookSagas';

describe('BookSagas', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('deleteBook', () => {
    const deleteBookAction: IActionWithPayload<ActionTypes.DELETE_BOOK_REQUEST, IResourceParams<IBookDTO>> = createAction(
      ActionTypes.DELETE_BOOK_REQUEST,
      {
        data: {
          id: 1
        } as IBookDTO,
        link: {
          href: '/api/v1/books/1',
          method: 'DELETE', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', { status: 204 });
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteBook, deleteBookAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(deleteBookAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteBook, deleteBookAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Book] Delete Book Success',
        });
      });

      it('should dispatch a route change action if the route is defined within the payload', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteBook, {
          ...deleteBookAction,
          payload: {
            ...deleteBookAction.payload,
            route: 'foo',
          },
        }).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['foo'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteBook, deleteBookAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Book Deletion Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteBook, deleteBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Book] Delete Book Failure',
        });
      });
    });
  });

  describe('createBook', () => {
    const newBook: INewBookDTO = {
      isbn13: '1234567890123',
      title: 'FooBar',
    };
    const createBookAction: IActionWithPayload<ActionTypes.CREATE_BOOK_REQUEST, INewBookDTO> = createAction(
      ActionTypes.CREATE_BOOK_REQUEST,
      newBook,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', {
          headers: {
            Location: '/api/v1/books/1',
          },
          status: 201,
        });
      });

      it('should call the createBook function with the payload', async () => {
        const createBookSpy = jest.spyOn(BooksApi, 'createBook');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createBook, createBookAction).done;
  
        expect(createBookSpy).toHaveBeenCalledWith(createBookAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createBook, createBookAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Book] Create Book Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createBook, createBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/books'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createBook, createBookAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Book Creation Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createBook, createBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: newBook,
            message: 'Foo',
          },
          type: '[Book] Create Book Failure',
        });
      });
    });
  });

  describe('loadBook', () => {
    const loadBookAction: IActionWithPayload<ActionTypes.LOAD_BOOK_REQUEST, number> = createAction(
      ActionTypes.LOAD_BOOK_REQUEST,
      1
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const bookMock: IBookDTO = {
        _links: {
          self: {
            href: '/api/v1/books/1',
            method: 'GET',
          },
        },
        authors: [
          'John Doe',
          'Jane Doe',
        ],
        categories: ['Novel'],
        id: 1,
        isbn10: '1234567890',
        isbn13: '1234567890123',
        publicationDate: '2001-02-03',
        publishers: ['Publisher'],
        title: 'FooBar',
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(bookMock));
      });

      it('should call the getBook function with the payload', async () => {
        const getBookSpy = jest.spyOn(BooksApi, 'getBook');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBook, loadBookAction).done;
  
        expect(getBookSpy).toHaveBeenCalledWith(loadBookAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBook, loadBookAction).done;

        expect(dispatched).toContainEqual({
          payload: bookMock,
          type: '[Book] Load Book Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBook, loadBookAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Book Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBook, loadBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Book] Load Book Failure',
        });
      });
    });
  });

  describe('loadBooks', () => {
    const loadBooksAction: IActionWithPayload<ActionTypes.LOAD_BOOKS_REQUEST, string | undefined> = createAction(
      ActionTypes.LOAD_BOOKS_REQUEST,
      undefined,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const collectionMock: IPageableCollectionDTO<IBookDTO> = {
        content: [
          {
            _links: {
              self: {
                href: '/api/v1/books/1',
                method: 'GET',
              },
            },
            id: 1,
            title: 'Foo',
          } as IBookDTO,
          {
            _links: {
              self: {
                href: '/api/v1/books/2',
                method: 'GET',
              },
            },
            id: 2,
            title: 'Bar',
          } as IBookDTO,
        ],
        currentPage: 1,
        totalItems: 2,
        totalPages: 1,
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(collectionMock));
      });

      it('should call the getBooks function with the payload', async () => {
        const getBooksSpy = jest.spyOn(BooksApi, 'getBooks');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBooks, loadBooksAction).done;
  
        expect(getBooksSpy).toHaveBeenCalledWith(loadBooksAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBooks, loadBooksAction).done;

        expect(dispatched).toContainEqual({
          payload: collectionMock,
          type: '[Book] Load Books Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBooks, loadBooksAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Books Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadBooks, loadBooksAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Book] Load Books Failure',
        });
      });
    });
  });

  describe('updateBook', () => {
    const bookUpdate: IBookUpdateDTO = {
      title: 'Bar',
    };
    const updateBookAction: IActionWithPayload<ActionTypes.UPDATE_BOOK_REQUEST, IResourceParams<IBookUpdateDTO>> = createAction(
      ActionTypes.UPDATE_BOOK_REQUEST,
      {
        data: bookUpdate,
        id: 1,
        link: {
          href: '/api/v1/books/1',
          method: 'PATCH', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const updatedBook = {
        id: 1,
        title: 'Bar',
      } as IBookDTO;

      beforeEach(() => {
        mockResponseOnce(JSON.stringify(updatedBook));
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateBook, updateBookAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(updateBookAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateBook, updateBookAction).done;

        expect(dispatched).toContainEqual({
          payload: updatedBook,
          type: '[Book] Update Book Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateBook, updateBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/books/1'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateBook, updateBookAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Book Update Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateBook, updateBookAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: bookUpdate,
            id: 1,
            message: 'Foo',
          },
          type: '[Book] Update Book Failure',
        });
      });
    });
  });

  describe('paginateBooks', () => {
    const paginateBooksAction: IActionWithPayload<ActionTypes.PAGINATE_BOOKS_REQUEST, IResourceParams> = createAction(
      ActionTypes.PAGINATE_BOOKS_REQUEST,
      {
        link: {
          href: '/api/v1/books?offset=10&page-size=10',
          method: 'GET',
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const collectionMock: IPageableCollectionDTO<IBookDTO> = {
        content: [
          {
            _links: {
              self: {
                href: '/api/v1/books/1',
                method: 'GET',
              },
            },
            id: 1,
            title: 'Foo',
          } as IBookDTO,
          {
            _links: {
              self: {
                href: '/api/v1/books/2',
                method: 'GET',
              },
            },
            id: 2,
            title: 'Bar',
          } as IBookDTO,
        ],
        currentPage: 1,
        totalItems: 2,
        totalPages: 1,
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(collectionMock));
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, paginateBooks, paginateBooksAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(paginateBooksAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, paginateBooks, paginateBooksAction).done;

        expect(dispatched).toContainEqual({
          payload: collectionMock,
          type: '[Book] Paginate Books Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, paginateBooks, paginateBooksAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Books Pagination Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, paginateBooks, paginateBooksAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Book] Paginate Books Failure',
        });
      });
    });
  });

  describe('bookSagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = bookSagas();
      value = iterator.next().value;
    });

    it('should trigger createBook on CREATE_BOOK_REQUEST', async () => {      
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.CREATE_BOOK_REQUEST, createBook)
      );
    });

    it('should trigger deleteBook on DELETE_BOOK_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.DELETE_BOOK_REQUEST, deleteBook)
      );
    });

    it('should trigger loadBook on LOAD_BOOK_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_BOOK_REQUEST, loadBook)
      );
    });

    it('should trigger loadBooks on LOAD_BOOKS_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_BOOKS_REQUEST, loadBooks)
      );
    });

    it('should trigger paginateBooks on PAGINATE_BOOKS_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.PAGINATE_BOOKS_REQUEST, paginateBooks)
      );
    });

    it('should trigger updateBook on UPDATE_BOOK_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.UPDATE_BOOK_REQUEST, updateBook)
      );
    });
  });
});
