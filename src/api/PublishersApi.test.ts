import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import {
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces/dtos';
import { PublishersApi } from './PublishersApi';

describe('PublishersApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('getPublishers', () => {
    const publishersMock: IPublisherDTO[] = [];
    let publishers: IPublisherDTO[];

    describe('given it is called without a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(publishersMock));
        publishers = await PublishersApi.getPublishers();
      });
  
      it('should initiate a GET request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('GET');
      });
  
      it('should call "/api/v1/publishers"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/publishers');
      });

      it('should return the publishers', () => {   
        expect(publishers).toEqual(publishersMock);
      });
    });
    
    describe('given it is called with a query string', () => {
      beforeEach(async () => {
        mockResponseOnce(JSON.stringify(publishersMock));
        await PublishersApi.getPublishers('foo');
      });

      it('should append the query string to the URL', async () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/publishers?q=foo');
      });
    });
  });

  describe('getPublisher', () => {
    const publisherMock: IPublisherDTO = {
      _links: {
        self: {
          href: '/api/v1/publishers/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo'
    };
    let publisher: IPublisherDTO;

    beforeEach(async () => {
      mockResponseOnce(JSON.stringify(publisherMock));
      publisher = await PublishersApi.getPublisher(1);
    });

    it('should initiate a GET request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should call "/api/v1/publishers/1"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/publishers/1');
    });

    it('should return the publisher', () => {   
      expect(publisher).toEqual(publisherMock);
    });
  });

  describe('createPublisher', () => {
    const idMock = 13;
    const newPublisher: INewPublisherDTO = {
      name: 'Foo',
    };
    let id: number;

    describe('given the response contains a valid location header', () => {
      beforeEach(async () => {
        mockResponseOnce('', { headers: { 'Location' : `/api/v1/publishers/${idMock}` }});
        id = await PublishersApi.createPublisher(newPublisher);
      });
  
      it('should initiate a POST request', () => {   
        const { method } = mock.calls[0][0];
  
        expect(method).toBe('POST');
      });
  
      it('should call "/api/v1/publishers"', () => {   
        const { url } = mock.calls[0][0];
  
        expect(url).toBe('/api/v1/publishers');
      });

      it('should send the new publisher as the body of the request', () => {
        const { _bodyText: body } = mock.calls[0][0];
        
        expect(body).toEqual(JSON.stringify(newPublisher));
      });
  
      it('should return the id of the new publisher', () => {   
        expect(id).toBe(idMock);
      });
    });

    it('should throw an error if the response does not contain a location header', () => {
      mockResponseOnce('');

      expect(PublishersApi.createPublisher(newPublisher))
        .rejects.toEqual(new Error('Invalid location header'));
    });

    it('should throw an error if the location header is invalid', () => {
      mockResponseOnce('', { headers: { 'Location' : '/api/v1/publishers/foo' }});

      expect(PublishersApi.createPublisher(newPublisher))
        .rejects.toEqual(new Error('Invalid location header'));
    });
  });
});
