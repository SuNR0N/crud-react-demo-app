import { 
  API_PREFIX,
  DATE_FORMAT,
  GITHUB_OAUTH_URL,
  TOASTR_TIMEOUT,
} from './config';

describe('config', () => {
  describe('API_PREFIX', () => {
    it('should be "/api/v1"', () => {
      expect(API_PREFIX).toBe('/api/v1');
    });
  });

  describe('DATE_FORMAT', () => {
    it('should be "YYYY-MM-DD"', () => {
      expect(DATE_FORMAT).toBe('YYYY-MM-DD');
    });
  });

  describe('GITHUB_OAUTH_URL', () => {
    it('should be "/api/v1/auth/github"', () => {
      expect(GITHUB_OAUTH_URL).toBe('/api/v1/auth/github');
    });
  });

  describe('TOASTR_TIMEOUT', () => {
    it('should be 4000', () => {
      expect(TOASTR_TIMEOUT).toBe(4000);
    });
  });
});
