import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import {
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { AuthorsApi } from './AuthorsApi';

describe('AuthorsApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('getAuthors', () => {
    const authorsMock: IAuthorDTO[] = [];
    let authors: IAuthorDTO[];

    describe('given it is called without a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(authorsMock));
        authors = await AuthorsApi.getAuthors();
      });
  
      it('should initiate a GET request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('GET');
      });
  
      it('should call "/api/v1/authors"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/authors');
      });

      it('should return the authors', () => {   
        expect(authors).toEqual(authorsMock);
      });
    });
    
    describe('given it is called with a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(authorsMock));
        await AuthorsApi.getAuthors('foo');
      });

      it('should append the query string to the URL', async () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/authors?q=foo');
      });
    });
  });

  describe('getAuthor', () => {
    const authorMock: IAuthorDTO = {
      _links: {
        self: {
          href: '/api/v1/authors/1',
          method: 'GET',
        },
      },
      firstName: 'John',
      fullName: 'John Doe',
      id: 1337,
      lastName: 'Doe',
    };
    let author: IAuthorDTO;

    beforeEach(async () => {
      mockResponseOnce(JSON.stringify(authorMock));
      author = await AuthorsApi.getAuthor(1);
    });

    it('should initiate a GET request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should call "/api/v1/authors/1"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/authors/1');
    });

    it('should return the author', () => {   
      expect(author).toEqual(authorMock);
    });
  });

  describe('createAuthor', () => {
    const idMock = 13;
    const newAuthor: INewAuthorDTO = {
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'X',
    };
    let id: number;

    describe('given the response contains a valid location header', () => {
      beforeEach(async () => {
        mockResponseOnce('', { headers: { 'Location' : `/api/v1/authors/${idMock}` }});
        id = await AuthorsApi.createAuthor(newAuthor);
      });
  
      it('should initiate a POST request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('POST');
      });
  
      it('should call "/api/v1/authors"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/authors');
      });

      it('should send the new author as the body of the request', () => {
        const { _bodyText: body } = mock.calls[0][0];
        
        expect(body).toEqual(JSON.stringify(newAuthor));
      });
  
      it('should return the id of the new author', () => {   
        expect(id).toBe(idMock);
      });
    });

    it('should throw an error if the response does not contain a location header', () => {
      mockResponseOnce('');

      expect(AuthorsApi.createAuthor(newAuthor))
        .rejects.toEqual(new Error('Invalid location header'));
    });

    it('should throw an error if the location header is invalid', () => {
      mockResponseOnce('', { headers: { 'Location' : '/api/v1/authors/foo' }});

      expect(AuthorsApi.createAuthor(newAuthor))
        .rejects.toEqual(new Error('Invalid location header'));
    });
  });
});
