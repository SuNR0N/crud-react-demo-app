import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../interfaces/dtos';
import { CategoriesApi } from './CategoriesApi';

describe('CategoriesApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('getCategories', () => {
    const categoriesMock: ICategoryDTO[] = [];
    let categories: ICategoryDTO[];

    describe('given it is called without a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(categoriesMock));
        categories = await CategoriesApi.getCategories();
      });
  
      it('should initiate a GET request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('GET');
      });
  
      it('should call "/api/v1/categories"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/categories');
      });

      it('should return the categories', () => {   
        expect(categories).toEqual(categoriesMock);
      });
    });
    
    describe('given it is called with a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(categoriesMock));
        await CategoriesApi.getCategories('foo');
      });

      it('should append the query string to the URL', async () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/categories?q=foo');
      });
    });
  });

  describe('getCategory', () => {
    const categoryMock: ICategoryDTO = {
      _links: {
        self: {
          href: '/api/v1/categories/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo'
    };
    let category: ICategoryDTO;

    beforeEach(async () => {
      mockResponseOnce(JSON.stringify(categoryMock));
      category = await CategoriesApi.getCategory(1);
    });

    it('should initiate a GET request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should call "/api/v1/categories/1"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/categories/1');
    });

    it('should return the category', () => {   
      expect(category).toEqual(categoryMock);
    });
  });

  describe('createCategory', () => {
    const idMock = 13;
    const newCategory: INewCategoryDTO = {
      name: 'Foo',
    };
    let id: number;

    describe('given the response contains a valid location header', () => {
      beforeEach(async () => {
        mockResponseOnce('', { headers: { 'Location' : `/api/v1/categories/${idMock}` }});
        id = await CategoriesApi.createCategory(newCategory);
      });
  
      it('should initiate a POST request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('POST');
      });
  
      it('should call "/api/v1/categories"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/categories');
      });

      it('should send the new category as the body of the request', () => {
        const { _bodyText: body } = mock.calls[0][0];
        
        expect(body).toEqual(JSON.stringify(newCategory));
      });
  
      it('should return the id of the new category', () => {   
        expect(id).toBe(idMock);
      });
    });

    it('should throw an error if the response does not contain a location header', () => {
      mockResponseOnce('');

      expect(CategoriesApi.createCategory(newCategory))
        .rejects.toEqual(new Error('Invalid location header'));
    });

    it('should throw an error if the location header is invalid', () => {
      mockResponseOnce('', { headers: { 'Location' : '/api/v1/categories/foo' }});

      expect(CategoriesApi.createCategory(newCategory))
        .rejects.toEqual(new Error('Invalid location header'));
    });
  });
});
