import {
  mock,
  mockRejectOnce,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import { HttpError } from '../errors/HttpError';
import { HttpClient } from './HttpClient';

describe('HttpClient', () => {
  beforeEach(() => {
    resetMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('request', () => {
    it('should include the credentials in the request', async () => {
      mockResponseOnce('');
      await HttpClient.request('/foo/bar');
      const { credentials } = mock.calls[0][0];

      expect(credentials).toBe('include');
    });

    it('should call the prepareRequestWithBody function if the body is an object', async () => {
      mockResponseOnce('');
      const body = { foo: 'bar' };
      const prepareRequestWithBodySpy = jest.spyOn(HttpClient as any, 'prepareRequestWithBody');
      await HttpClient.request('/foo/bar', { 
        body: body as any,
        method: 'POST',
      });

      expect(prepareRequestWithBodySpy.mock.calls[0][0]).toBe(body);
    });

    it('should not call the prepareRequestWithBody function if the body does not exist', async () => {
      mockResponseOnce('');
      const prepareRequestWithBodySpy = jest.spyOn(HttpClient as any, 'prepareRequestWithBody');
      await HttpClient.request('/foo/bar');

      expect(prepareRequestWithBodySpy).not.toHaveBeenCalled();
    });

    it('should return the response if the request succeeds', async () => {
      const resposeMock = 'FooBar';
      mockResponseOnce(resposeMock);
      const response = await HttpClient.request('/foo/bar');

      expect(response).toEqual(expect.objectContaining({
        _bodyInit: resposeMock,
        _bodyText: resposeMock,
        headers: {
          map: {
            'content-type': 'text/plain;charset=UTF-8',
          },
        },
        ok: true,
        status: 200,
        statusText: 'OK',
      }));
    });

    it('should throw an HttpError if the response is not OK', async () => {
      mockResponseOnce('FooBar', { status: 404, statusText: 'Not Found' });

      expect(HttpClient.request('/foo/bar'))
        .rejects.toEqual(new HttpError(404, 'Not Found', 'FooBar'));
    });

    it('should throw an error if the fetch fails', () => {
      const error = new Error('Unknown');
      mockRejectOnce(error);

      expect(HttpClient.request('/foo/bar'))
        .rejects.toBe(error);
    });
  });

  describe('get', () => {
    it('should call the request function with the "GET" method', async () => {
      mockResponseOnce('');
      await HttpClient.get('/foo/bar');
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });
  });

  describe('patch', () => {
    const body = { foo: 'bar' };
    
    beforeEach(async () => {
      mockResponseOnce('');
      await HttpClient.patch('/foo/bar', body);
    });
    
    it('should call the request function with the "PATCH" method', async () => {    
      const { method } = mock.calls[0][0];

      expect(method).toBe('PATCH');
    });

    it('should add the body to the request', () => {
      const { _bodyText: bodyText } = mock.calls[0][0];

      expect(bodyText).toBe(JSON.stringify(body));
    });
  });

  describe('put', () => {
    const body = { foo: 'bar' };
    
    beforeEach(async () => {
      mockResponseOnce('');
      await HttpClient.put('/foo/bar', body);
    });

    it('should call the request function with the "PUT" method', () => {
      const { method } = mock.calls[0][0];

      expect(method).toBe('PUT');
    });

    it('should add the body to the request', () => {
      const { _bodyText: bodyText } = mock.calls[0][0];

      expect(bodyText).toBe(JSON.stringify(body));
    });
  });

  describe('post', () => {
    const body = { foo: 'bar' };
    
    beforeEach(async () => {
      mockResponseOnce('');
      await HttpClient.post('/foo/bar', body);
    });

    it('should call the request function with the "POST" method', () => {
      const { method } = mock.calls[0][0];

      expect(method).toBe('POST');
    });

    it('should add the body to the request', () => {
      const { _bodyText: bodyText } = mock.calls[0][0];

      expect(bodyText).toBe(JSON.stringify(body));
    });
  });

  describe('delete', () => {
    it('should call the request function with the "DELETE" method', async () => {
      mockResponseOnce('');
      await HttpClient.delete('/foo/bar');
      const { method } = mock.calls[0][0];

      expect(method).toBe('DELETE');
    });
  });

  describe('prepareRequestWithBody', () => {
    describe('given the body is an object', () => {
      const body = { foo: 'bar' };
      let requestInit: RequestInit;

      beforeEach(() => {
        requestInit = (HttpClient as any).prepareRequestWithBody(body, 'POST');
      });

      it('should set the provided HTTP method', () => {
        expect(requestInit.method).toBe('POST');
      });

      it('should stringify the body', () => {
        expect(requestInit.body).toBe(JSON.stringify(body));
      });

      it('should set the content type header to "application/json"', () => {
        expect(requestInit.headers).toEqual({ 'Content-Type': 'application/json'});
      });
    });

    describe('given the body is not an object', () => {
      const body = 'FooBar';
      let requestInit: RequestInit;

      beforeEach(() => {
        requestInit = (HttpClient as any).prepareRequestWithBody(body, 'POST');
      });
      
      it('should set the provided HTTP method', () => {
        expect(requestInit.method).toBe('POST');
      });

      it('should set the body as is', () => {
        expect(requestInit.body).toBe(body);
      });

      it('should not set the content type header', () => {
        expect(requestInit.headers).toBeUndefined();
      });
    });
  });
});
