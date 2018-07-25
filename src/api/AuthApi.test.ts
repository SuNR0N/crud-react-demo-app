import {
  mock,
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';

import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { AuthApi } from './AuthApi';

describe('AuthApi', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('getProfile', () => {
    const mockProfile: IProfileDTO = {
      avatarUrl: 'http://www.example.com/john_doe.png',
      email: 'john.doe@dummy.com',
      id: 1337,
      name: 'John Doe',
      username: 'J0hn_D03',
    };
    let profile: IProfileDTO;
    
    beforeEach(async () => {
      mockResponseOnce(JSON.stringify(mockProfile));
      profile = await AuthApi.getProfile();
    });

    it('should initiate a GET request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('GET');
    });

    it('should call "/api/v1/auth/profile"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/auth/profile');
    });

    it('should return the profile', () => {   
      expect(profile).toEqual(mockProfile);
    });
  });

  describe('logOut', () => {
    beforeEach(async () => {
      mockResponseOnce('');
      await AuthApi.logOut();
    });

    it('should initiate a POST request', () => {   
      const { method } = mock.calls[0][0];

      expect(method).toBe('POST');
    });

    it('should call "/api/v1/auth/logout"', () => {   
      const { url } = mock.calls[0][0];

      expect(url).toBe('/api/v1/auth/logout');
    });

    it('should send an empty string as the body of the request', () => {
      const { _bodyText: body } = mock.calls[0][0];
      
      expect(body).toBe('');
    });
  });
});
