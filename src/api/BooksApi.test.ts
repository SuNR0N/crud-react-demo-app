import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import { BooksApi } from './BooksApi';

describe('BooksApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('getBooks', () => {
    const collectionMock: IPageableCollectionDTO<IBookDTO> = {
      content: [],
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
    };
    let collection: IPageableCollectionDTO<IBookDTO>;

    describe('given it is called without a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(collectionMock));
        collection = await BooksApi.getBooks();
      });
  
      it('should initiate a GET request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('GET');
      });
  
      it('should call "/api/v1/books"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/books');
      });

      it('should return the collection', () => {   
        expect(collection).toEqual(collectionMock);
      });
    });
    
    describe('given it is called with a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(collectionMock));
        await BooksApi.getBooks('foo');
      });

      it('should append the query string to the URL', async () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/books?q=foo');
      });
    });
  });

  describe('getBook', () => {
    const bookMock: IBookDTO = {
      _links: {
        self: {
          href: '/api/v1/books/1',
          method: 'GET',
        },
      },
      authors: ['John Doe', 'Jane Doe'],
      categories: ['Category #1', 'Category #2'],
      id: 1,
      isbn10: '1234567890',
      isbn13: '1234567890123',
      publicationDate: '2001-02-03',
      publishers: ['Publisher'],
      title: 'FooBar',
    };
    let book: IBookDTO;

    beforeEach(async () => {
      mockResponseOnce(JSON.stringify(bookMock));
      book = await BooksApi.getBook(1);
    });

    it('should initiate a GET request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should call "/api/v1/books/1"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/books/1');
    });

    it('should return the book', () => {   
      expect(book).toEqual(bookMock);
    });
  });

  describe('createBook', () => {
    const idMock = 13;
    const newBook: INewBookDTO = {
      authors: [1],
      categories: [2, 3],
      isbn10: '1234567890',
      isbn13: '1234567890123',
      publicationDate: '2001-02-03',
      publishers: [4, 5, 6],
      title: 'FooBar',
    };
    let id: number;

    describe('given the response contains a valid location header', () => {
      beforeEach(async () => {
        mockResponseOnce('', { headers: { 'Location' : `/api/v1/books/${idMock}` }});
        id = await BooksApi.createBook(newBook);
      });
  
      it('should initiate a POST request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('POST');
      });
  
      it('should call "/api/v1/books"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/books');
      });

      it('should send the new book as the body of the request', () => {
        const { _bodyText: body } = mock.calls[0][0];
        
        expect(body).toEqual(JSON.stringify(newBook));
      });
  
      it('should return the id of the new book', () => {   
        expect(id).toBe(idMock);
      });
    });

    it('should throw an error if the response does not contain a location header', () => {
      mockResponseOnce('');

      expect(BooksApi.createBook(newBook))
        .rejects.toEqual(new Error('Invalid location header'));
    });

    it('should throw an error if the location header is invalid', () => {
      mockResponseOnce('', { headers: { 'Location' : '/api/v1/books/foo' }});

      expect(BooksApi.createBook(newBook))
        .rejects.toEqual(new Error('Invalid location header'));
    });
  });
});
