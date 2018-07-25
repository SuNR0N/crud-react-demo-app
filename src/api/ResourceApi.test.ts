import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import { IResourceParams } from '../interfaces/ResourceParams';
import { ResourceApi } from './ResourceApi';

describe('ResourceApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('request', () => {
    const baseParams: IResourceParams = {
      link: {
        href: '/api/v1/foo/bar',
        method: 'GET',
      },
    };
    const responseMock = { foo: 'bar' };
    
    it('should call the url defined by its link parameter', async () => {
      mockResponseOnce(JSON.stringify(responseMock)); 
      await ResourceApi.request(baseParams);
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/foo/bar');
    });

    it('should use the HTTP method defined by its link parameter', async () => {
      mockResponseOnce(JSON.stringify(responseMock)); 
      await ResourceApi.request(baseParams);
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should not set the content type if no body is provided', async () => {
      mockResponseOnce(JSON.stringify(responseMock));
      await ResourceApi.request(baseParams);
      const { headers: { map: headersMap } } = mock.calls[0][0];

      expect(headersMap).toEqual({});
    });

    it('should set the content type to "application/json" if a body is provided', async () => {
      mockResponseOnce(JSON.stringify(responseMock));
      const params: IResourceParams = {
        ...baseParams,
        data: { foo: 'bar' },
        link: {
          ...baseParams.link,
          method: 'POST',
        },
      };   
      await ResourceApi.request(params);
      const { headers: { map: headersMap } } = mock.calls[0][0];

      expect(headersMap).toEqual({ 'content-type': 'application/json' });
    });

    it('should return undefined if the response is a 204', async () => {
      mockResponseOnce('', { status: 204 });   
      const response = await ResourceApi.request(baseParams);

      expect(response).toBeUndefined();
    });

    it('should return the parsed body if the response is not a 204', async () => {
      mockResponseOnce(JSON.stringify(responseMock));   
      const response = await ResourceApi.request(baseParams);

      expect(response).toEqual(responseMock);
    });
  });
});
